import React, {useState, useEffect} from 'react'
import axios from "axios";
import styles from './Product.module.css'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import { addToCheckoutCart }  from "../../Redux/Users/cartsSlice.js"
import { toggleWishlist } from "../../Redux/Users/wishlistSlice.js"



function Product({product, addToCart, wishlist}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = (e) => {
    if (e.target.tagName !== "BUTTON" && !e.target.closest('button')) {
      navigate(`/products/${product.product_id}`);
    }  
  }

  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCheckoutCart({ productId, quantity }));
    alert(`${product.name} added to cart.`)
  }

  
  
  const wishedItem = wishlist.includes(product.product_id)

  return (
    <div>
        <div className={styles['product-container']}>
          <img className={styles["product-image"]} src={product.image} alt={`${product.name}`} onClick={handleProductClick}/>
          <div className={styles['product-details']} onClick={handleProductClick}>
            <h2>{product.name}</h2>
            <h2>{`$${product.price}`}</h2>
            <p>{product.description}</p>
            <div className={styles['product-bttns']}>
              <button className={styles['add-to-cart-bttn']} onClick={() => handleAddToCart(product.product_id, 1)}>
                <FaCartPlus className={styles['cart-icon']}/>
              </button>
              <button className={styles['wish-bttn']} onClick={() => dispatch(toggleWishlist(product.product_id))}>
                {wishedItem ? <FaHeart className={styles['wish-icon']} /> : <FaRegHeart className={styles['wish-icon']}/>}
            </button> 
            </div>
            <p className={styles['product-stock']} onClick={handleProductClick}><strong>({product.stock})</strong> in stock</p>
          </div>
        </div>
    </div>
  )
}

export default Product