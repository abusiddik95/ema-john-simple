import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart ,processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,SetOrderPlaced] = useState([]);
    const handlePlaceOrder =()=>{
        setCart([]);
        SetOrderPlaced(true);
        processOrder();
    }
    

    const removeProduct = (productKey)=> {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        console.log(cartProducts);
    },[]);

    let thankyou;
     if(orderPlaced){
         thankyou = <img src={happyImage} alt=""/>
     }
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
                 thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;