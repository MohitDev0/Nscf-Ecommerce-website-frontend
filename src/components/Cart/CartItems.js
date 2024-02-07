import React from 'react';
import "./cartItems.css";
import CardItem from './CardItem.js';
import { useSelector } from 'react-redux';

const CartItems = () => {
  const userCardItems = useSelector(state => state.user.userCardItems);
  // console.log(userCardItems);
  return (
    <div className='cartitems_Container page-center'>
      Your Cart ( dash Items)
      <div className='cartItems_Wrapper'>
        {userCardItems.length !== 0 &&
          userCardItems.map((userCart_items, index) => {
            return (
              <div key={index}>
                <CardItem userCart_items={userCart_items} />
              </div>
            )
          })
        }
        {userCardItems.length === 0 &&
          <div className='no_item_in_cart_container'>
            <h1 className='no_item_in_cart'>
              No Items Added Yet !! <br></br>
              Please add some Items <br></br>
              Thank You....!!
            </h1>
          </div>
        }
      </div>
    </div>
  )
}

export default CartItems