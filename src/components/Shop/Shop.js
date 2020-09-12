import React, { useEffect } from 'react';
import fakeData from '../../fakeData'
import { useState} from 'react'
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {Link} from 'react-router-dom'
import { addToDatabaseCart , getDatabaseCart} from '../../utilities/databaseManager';

const Shop = () => {
    const first10 =fakeData.slice(0,10)
    const [products, setProducts] = useState(first10);
    
    const [cart,setCart] =useState([]);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity =savedCart[existingKey]
            return product
        })
        setCart(previousCart)
    },[])

    const addBtnHandler = (product) =>{
        const toBeAddedkey = product.key
        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity +1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedkey)
            newCart =[...others,sameProduct]
        }
        else{
            product.quantity =1;
            newCart = [...cart,product]
        }
        // const count = sameProduct.length

        // const newCart = [...cart,product];
        setCart(newCart)
       
        addToDatabaseCart(product.key,count)
    
    };
    return (
        <div className='twin-container'>
            <div className='product-section'>

            {products.map(pd =>  <Product addTocart={true} key={pd.key} addBtnHandler={addBtnHandler}  product={pd}></Product>)}
            </div>
            <div className="cart-section">
              <Cart cart={cart}>
                  
               <Link to='review' className='main-button'>
               <button className='add-cart'> Checkout</button>
               </Link>
              </Cart>
            </div>
          
        </div>
    );
};

export default Shop;