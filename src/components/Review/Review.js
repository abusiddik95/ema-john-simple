import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/use-auth';

const Review = () => {
    const [cart,setCart] = useState([]);
    const auth = useAuth();


    const removeProduct = (productKey)=> {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:4200/getProductByKey',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys) 
          })
        .then(res=> res.json())
        .then(data=>{
            const cartProducts = productKeys.map(key => {
            const product = data.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        
        })
        
    },[]);

    let thankyou;
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(product => 
                  <ReviewItem 
                  key= {product.key}
                  removeProduct ={removeProduct}
                  product={product}></ReviewItem>  )
            }
             
                {
                    !cart.length && 
                    <h1>Your cart is empty. <a href="/shop">Keep Shopping</a></h1>
                }
                 {
                 thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/Shipment"> 
                   { auth.user ? 
                    <button className="main-button">Proceed Shipment</button> :
                    <button className="main-button">LogIn to Proceed</button>
                    }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;