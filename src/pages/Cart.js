import React from 'react';
import Topbar from '../components/topbar/Topbar';
// import { useSelector } from 'react-redux';
import CartItems from '../components/Cart/CartItems';

const Cart = () => {
    // const userCardItems = useSelector(state => state.user.userCardItems)
    return (
        <>
            <Topbar />
            <CartItems />
        </>
    )
}

export default Cart