import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css'

const Product = (props) => {
    
    const { name, img, seller, price, stock } = props.product;
    return (
        <div className='product-com'>
            <div className='[product-image'>
                <img src={img} alt="" />
            </div>
            <div className='product-info'>
                <h4>{name}</h4>
                <p><small>Seller - {seller}</small></p>
                <h5>Price - ${price}</h5>
                <p><small>Only {stock} left in stock - order now.</small></p>
                <button onClick={() => props.addBtnHandler(props.product)} className="add-cart"> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;