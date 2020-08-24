import React from 'react';
import fakeData from '../../fakeData'
import { useState} from 'react'
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 =fakeData.slice(0,10)
    const [products, setProducts] = useState(first10);
    const [cart,setCart] =useState([]);

    const addBtnHandler = (product) =>{
        console.log(product);
        const newCart = [...cart,product];
        setCart(newCart)
    
    };
    return (
        <div className='shop-container'>
            <div className='product-section'>

            {products.map(product => <Product addBtnHandler={addBtnHandler}  product={product}></Product>)}
            </div>
            <div className="cart-section">
              <Cart cart={cart}></Cart>
            </div>
          
        </div>
    );
};

export default Shop;