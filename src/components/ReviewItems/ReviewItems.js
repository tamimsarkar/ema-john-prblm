import React from 'react';
import './ReviewItems.css'

const ReviewItems = (props) => {

    const {img,name,quantity,key,price} =props.product;
    return (
        <div style={{padding : '10px',borderBottom : '1px solid lightgray',marginBottom:'5px',marginLeft:'10px'}} className='review-item'>
            <img src={img} alt=""/>
            <h3 className='product-name'>{name}</h3>
            <p>Quantity : <strong>{quantity}</strong></p>
            <p><strong>Price : ${price}</strong></p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItems;