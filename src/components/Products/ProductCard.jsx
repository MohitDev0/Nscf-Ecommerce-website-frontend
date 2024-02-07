import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import axios from 'axios';
import "./Product.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Add_product_to_cart } from "../../container/Action";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProduct from "./AddProduct";
import toast from 'react-hot-toast';

const ProductCard = ({ item, setRefresh ,currentUser}) => {
    const url = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("jwt");
    const [ProductOption, setProductOption] = useState(false)
    const [productEditOption, setproductEditOption] = useState(false)

    const Imageurl = process.env.REACT_APP_IMAGE_URL
    const dispatch = useDispatch();
    const [additem, setAdditem] = useState({
        close: false,
        productDetails: {
            productId: [],
            productCount: 0,
            productPackageWeight: "1kg",
            productTotalAmount: 0
        }
    });

    const [itemscount, setitemsCount] = useState(0);
    const [activeWeight, setActiveWeight] = useState(2);
    const [sendPermission, setSendPermission] = useState(false)
    const weight = ["250g", "1/2kg", "1kg"];
    let divideBy;
    if (activeWeight === 0) {
        divideBy = 4;
    }
    else if (activeWeight === 1) {
        divideBy = 2;
    } else {
        divideBy = 1;
    }

    const setCartValue = () => {
        setAdditem((prevState) => ({
            ...prevState,
            close: !prevState.close,
            productDetails: {
                productId: item._id,
                productCount: prevState.productDetails.productCount + itemscount,
                productPackageWeight: weight[activeWeight],
                productTotalAmount: prevState.productDetails.productTotalAmount + (parseInt(item.price) * parseInt(itemscount)) / divideBy
            }
        }));
        setSendPermission(true)

    }
    useEffect(() => {
        if (sendPermission) {
            dispatch(Add_product_to_cart(additem.productDetails))
        }
        setSendPermission(false)
    }, [additem, dispatch, sendPermission])

    const ProductDeleteOption = async (id) => {
        await axios.delete(url + "product/deleteProduct/" + id, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                toast.success("Product Deleted successfully");
                setRefresh(e => !e)
            })
            .catch((e) => {
                toast.error("Something error happen")
            })
    }

    return (
        <div className="m-3" >
            <div className='ProductItem flex flex-col w-64 border-2  rounded-lg p-2 relative' >
                <img className='rounded-md h-[60%] w-full overflow-hidden object-cover' src={Imageurl + item.img} alt={`${item.name} Product Img Error`} name="img" defaultValue={item.url} />
                {currentUser && (currentUser.isAdmin &&
                <div className='product_more_options'>
                    <span className='product_more_option_btn'><MoreVertIcon onClick={() => setProductOption((e) => !e)} /></span>
                    {ProductOption && (
                        <div className='product_options'>
                            <div className='product_edit_btn' onClick={() => { setproductEditOption(true) }}><EditIcon />Edit</div>
                            <div className='product_delete_btn' onClick={() => { ProductDeleteOption(item._id) }}><DeleteIcon />Delete</div>
                        </div>
                    )}
                </div>
                )}
                <h2 className=' font-bold m-2' name="name" defaultValue={item.name}>{item.name}</h2>
                <h6 className='m-2'>&#8377;{item.price}/kg</h6>
                <div className='flex justify-evenly relative mb-2 '>
                    <p className='w-[75%] h-full leading-normal overflow-hidden' name="title" defaultValue={item.title}>{item.title}kjnasof jnaln foia w nefoiwnfo i iiiiiiiiii iiiiiiflkan mlfnaeo wnfawen fjwnej kiiiiei</p>
                    <button className='float-right' onClick={() => setAdditem((prevState) => ({
                        ...prevState,
                        close: !prevState.close
                    }))}>
                        <ShoppingCartOutlinedIcon className='cursor-pointer bg-green-300 border rounded-md p-2 !text-4xl ' />
                    </button>
                    {additem.close &&
                        <div className='AddItem'>
                            <div className='subcart relative h-full grid grid-cols-3 grid-rows-3'>
                                <div className='subcartTop justify-around grid col-span-3 row-span-2 grid-cols-3 grid-rows-3 gap-2'>
                                    <h3 className='col-start-1 col-end-3 row-start-1 row-end-2'>Total Price : </h3>
                                    <div className='subcartTotal float-right col-start-3'>
                                        <p className='ml-3'>{item.price}</p>
                                        <p>x {itemscount}</p>
                                        <hr className='border-0 h-[1px] bg-black '  ></hr>
                                        <p>&#8377; {(parseInt(item.price) * parseInt(itemscount)) / divideBy}</p>
                                    </div>
                                    <div className='subcartCenter grid row-start-2 col-start-1 row-end-4 col-end-3 grid-cols-2 grid-rows-2 gap-1'>
                                        {weight.map((w, index) => {
                                            return (
                                                <button onClick={() => setActiveWeight(index)} key={index} className={`border rounded row-span-1 col-span-1 ${activeWeight === index && "bg-gray-300 "}`}>{w}</button>
                                            );
                                        })}
                                    </div>

                                </div>
                                <div className='subcartBottom w-full absolute bottom-0 flex items-center justify-evenly row-start-3 row-span-1 col-span-3'>
                                    <RemoveIcon className='cursor-pointer' onClick={() => { itemscount > 0 && setitemsCount(c => c - 1) }} />
                                    <label htmlFor='count' className='w-[5%]'>
                                        <input type="number" className='ProductCardinput w-[20px] outline-none' id='count' value={itemscount > 0 && itemscount} placeholder="0" onChange={(e) => setitemsCount(parseInt(e.target.value))} />
                                    </label>
                                    <AddIcon className='cursor-pointer' onClick={() => setitemsCount(c => +c + 1)} />
                                    <button className='float-right cursor-pointer bg-green-300 border rounded-md p-2 ' onClick={() => {
                                        setCartValue();
                                    }}>
                                        Add Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
            {productEditOption && <AddProduct productData={item} setRefresh={setRefresh} setproductEditOption={setproductEditOption} />}
        </div>

    )
}

export default ProductCard