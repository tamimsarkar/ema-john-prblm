import React from 'react';
import './Cart.css'

const Cart = (props) => {
    console.log(props)
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total += product.price
    }
    let shipping = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        shipping += element.shipping
    }
   
    return (
        <div className="ordered-product">
            
                <h4>Order Summery</h4>
                
                <h5>Items Summary : {cart.length}</h5>
             
            
                <h5>Shipping Charge : {shipping.toFixed(2)} </h5>
                <h5>Total Price : {(total +shipping ).toFixed(2) }</h5>
             </div>
    );
};

export default Cart;