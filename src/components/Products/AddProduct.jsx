import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import toast from 'react-hot-toast';



const AddProduct = ({ setshowProductAdd, productData, setRefresh, setproductEditOption }) => {
    const url = process.env.REACT_APP_BASE_URL;
    const ImageUrl = process.env.REACT_APP_IMAGE_URL
    const token = localStorage.getItem("jwt");
    const [forCheckImageOnly, setforCheckImageOnly] = useState(false)
    const [ForEdit, setforEdit] = useState(false)
    const [ProductDetails, setProductDetails] = useState({
        name: "",
        price: 0,
        desc: "",
        img: "",
        available: 0
    });
    useEffect(() => {
        if (productData) {
            setProductDetails({ name: productData.name, price: productData.price, desc: productData.title, img: productData.img, available: productData.available })
            setforEdit(true)
        }
    }, [productData])


    const [img, setimg] = useState();

    const addProduct = async (e) => {
        e.preventDefault();
        let ImagePath = ""
        const formData = new FormData();              // create a formData to send to the backend attach with img 
        formData.append("img", ProductDetails.img)    // img which we want to upload in the backend

        if (forCheckImageOnly) {                      // this will check that the img path is temp or permanent
            // this api will send the img to node.js and upload in the backend and respond with path 
            await axios.post(url + "product/uploadProductImg", formData, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    // console.log("return", res.data);
                    ImagePath = res.data
                    setProductDetails((prev) => ({ ...prev, img: res.data }));
                    setforCheckImageOnly(false);
                })
                .catch((e) => toast.error("Something wrong happen"))
        }
        if (ForEdit) {
            // this api will edit the product
            // console.log("edit", ProductDetails);
            await axios.put(url + "product/updateProduct/" + productData._id, { "data": ProductDetails, "path": ImagePath }, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    toast.success("Product update successfully")
                    setproductEditOption(false)
                })
                .catch((e) => {
                    toast.error("some error happen while adding product")
                })
        }
        else {
            // this api will add the product
            await axios.post(url + "product/addProduct", { "data": ProductDetails, "path": ImagePath }, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    toast.success("Product add successfully")
                    setshowProductAdd(false)
                })
                .catch((e) => {
                    toast.error("some error happen while adding product")
                })
        }
        setRefresh(e => !e)
    }

    // this code is used to generate a img that is temperary
    const handleimg = (e) => {
        const image = e.target.files[0]
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                setimg(reader.result)
            }
            reader.readAsDataURL(image)
            setforCheckImageOnly(true)
        }
    }


    return (
        <>
            <div className='addProduct_container'>
                <span className='AddProduct_close_btn'><CloseIcon onClick={() => { ForEdit ? setproductEditOption(false) : setshowProductAdd(false) }} /></span>
                <div className='add_Product_details'>
                    <form className='add_product_form' onSubmit={(v) => addProduct(v)}>
                        <label className='uploadProduct_img'>
                            <svg className="MuiSvgIcon-root shareIcon" focusable="false" viewBox="0 0 24 24" color="tomato" aria-hidden="true"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></svg>
                            <span className="shareOptionText">Photo or Video</span>
                            <input className='addProduct_image' type='file' name="img" onChange={(e) => { setProductDetails((prev) => ({ ...prev, img: e.target.files[0] })); handleimg(e) }}></input>
                        </label>
                        <label>Product Name:</label>
                        <input name="name" type='text' onChange={(e) => { setProductDetails((prev) => ({ ...prev, name: e.target.value })) }} value={ProductDetails.name} required></input>
                        <label>Price:</label>
                        <input type='number' name='price' onChange={(e) => { setProductDetails((prev) => ({ ...prev, price: e.target.value })) }} value={ProductDetails.price} required></input>
                        <label>Product Available:</label>
                        <input type='number' name='price' onChange={(e) => { setProductDetails((prev) => ({ ...prev, available: e.target.value })) }} value={ProductDetails.available} required></input>
                        <label>Product Description:</label>
                        <textarea name="desc" onChange={(e) => { setProductDetails((prev) => ({ ...prev, desc: e.target.value })) }}></textarea>
                        <button className='addProduct_btn' type='submit'>{ForEdit ? "Edit Product" : "Add Product"}</button>
                    </form>
                </div>
                <div className='addProduct'>
                    <div className="m-3">
                        <div className="ProductItem flex flex-col w-64 border-2  rounded-lg p-2 relative">
                            <img className="rounded-md h-[60%] w-full overflow-hidden object-cover" src={ForEdit ? (forCheckImageOnly ? img : ImageUrl + ProductDetails.img) : img} alt="Product Img" name="img" />
                            <h2 className=" font-bold m-2" name="name">{ProductDetails.name}</h2>
                            <h6 className="m-2">₹{ProductDetails.price}/kg</h6>
                            <h6 className="m-2">{ProductDetails.available}Available</h6>
                            <div className="flex justify-evenly relative mb-2 ">
                                <p className="w-[75%] h-full leading-normal overflow-hidden" name="title">{ProductDetails.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct