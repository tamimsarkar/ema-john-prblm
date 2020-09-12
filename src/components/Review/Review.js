import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';
const Review = () => {
    const [cart,setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory();
    const handleProceedtoCheckout = () =>{
        history.push('/shipment')
    
    }
    const removeProduct =(productKey) =>{
        const newCart = cart.filter(pd => pd.key != productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    

    useEffect(() =>{

        //cart
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)

        const cartProducts = productKeys.map(key => {
            const product =fakeData.find(pd => pd.key === key);
            product.quantity =savedCart[key];
            return product
        })
        setCart(cartProducts)
    },[])

    let thankYou; 
    if(orderPlaced){
        thankYou = <img src={happyImage} />
    }
    return (
        <div className='twin-container'>
        <div className='product-section'>
        {
            cart.map(pd => <ReviewItems removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItems>)
        }
        {
            thankYou
        }
        </div>
        <div className='cart-section'>
            <Cart cart={cart}>
                <button onClick={handleProceedtoCheckout} className='main-button'>Proceed to Checkout</button>
            </Cart>
        </div>

        </div>
    );
};

export default Review;