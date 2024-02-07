import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { Increment_count } from "../../container/Action"


const CardItem = ({ userCart_items }) => {
    const Dispatch = useDispatch()
    const url = process.env.REACT_APP_IMAGE_URL;
    const api = process.env.REACT_APP_BASE_URL;
    const [productDetails, setProductDetails] = useState("");
    useEffect(() => {
        const productData = async () => {
            await axios.get(api + "product/productId/" + userCart_items.productId)
                .then((res) => {
                    setProductDetails(res.data)
                })
                .catch(() => {
                    toast.error("Problem occur in Fetching Product");
                })
        }
        productData()
    }, [api, userCart_items.productId])

    const IncDecCount = (value, direct) => {

        let sendObj;
        if (direct && value >= 0 && productDetails.available >= value) {
            sendObj = {
                productId: userCart_items.productId,
                productCount: parseInt(value)
            }
        }
        else if (userCart_items.productCount + parseInt(value) > 0 && productDetails.available >= userCart_items.productCount + parseInt(value)) {
            sendObj = {
                productId: userCart_items.productId,
                productCount: userCart_items.productCount + parseInt(value)
            }
        }
        else {
            sendObj = {
                productId: userCart_items.productId,
                productCount: 0
            }
        }
        Dispatch(Increment_count(sendObj))

    }
    return (
        <div>
            {productDetails &&
                <div className='cartProduct'>
                    <h4 className='cartItem_title'>{productDetails.title}</h4>
                    <hr></hr>
                    <div className='cartItemDetail_container'>
                        <img src={url + productDetails.img} className='cartItemImage' alt='cartItem' />
                        <div className='cartItemDetail_wrapper'>
                            <div className='cartItem_details' >
                                <h3 className='cartItem_name'>{productDetails.name}</h3>
                                <h5 className='cartItem_available'>{productDetails.available} peices available</h5>
                                <h5 className='cartItem_price'>{productDetails.price} Rs/kg</h5>
                            </div>
                            <div className='cartItems_quantity_container'>
                                <p className='cartItem_quantity'>Quantity : {userCart_items.productCount}</p>
                                <div className='cardItems_increase'>
                                    <RemoveIcon onClick={(() => IncDecCount(-1, false))} />
                                    <input onChange={((e) => { IncDecCount(parseInt(e.target.value), true) })} type="number" value={userCart_items.productCount >= 0 ? userCart_items.productCount : 0}></input>
                                    <AddIcon onClick={(() => IncDecCount(1, false))} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default CardItem