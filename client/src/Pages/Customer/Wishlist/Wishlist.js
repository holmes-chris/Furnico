import React, {useEffect } from 'react'
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import styles from "./Wishlist.module.css";
import Header from '../../../Components/Header/Header.js';
import { removeFromWishlist } from '../../../Redux/Users/wishlistSlice.js';
import { addToCheckoutCart } from '../../../Redux/Users/cartsSlice.js';
import { FaArrowLeft } from "react-icons/fa";
import MobileSearch from '../../../Components/Search/MobileSearch/MobileSearch.js';

function Wishlist({ wishlist, products}) {
    const dispatch = useDispatch();
    const productArray = products.map((product) => product);
    const wishedItems = productArray.filter((item) => wishlist.includes(item.product_id))

    const handleAddToCart = (productId, quantity) => {
        const product = wishedItems.filter((item) => item.product_id === productId);
        dispatch(addToCheckoutCart({ productId, quantity }));
        alert(`${product[0].name} added to cart.`)
    }
    
  return (
    <div className={styles["wishlist-container"]}>
        <div className={styles["mobile-search"]}>
            <MobileSearch />
        </div>
        <div className={styles["wishlist-header"]}>
            <Link to="/" className={styles['home-bttn']}>
                <div className={styles['back-arrow']}>
                    <FaArrowLeft />
                </div>
                Back To Home
            </Link>
            <div className={styles['header-text']}>
                <Header title="Your Wishlist" /> 
            </div>
        </div>
        {wishedItems.length === 0 ? (
            <div className={styles['wishlist-empty']}>Wishlist empty</div>
        ):        
        <div className={styles['wishlist']}>
        {wishedItems.map((item) => (
            <div className={styles['product-container']}>
                <div className={styles['image-container']}>
                    <img src={item.image} alt="product-pic" className={styles["product-image"]}/>
                </div>
                <div className={styles['details-container']}>
                    <h1 className={styles["product-name"]}>{item.name}</h1>
                    <h1 className={styles["price-left"]}>{`$${item.price}`}</h1>
                    <p className={styles["product-description"]}> {item.description}</p>
                    <button className={styles["add-to-cart-bttn"]}onClick={() => handleAddToCart(item.product_id, 1)}>Add To Cart</button>
                    <button className={styles["remove-bttn"]} onClick={() => dispatch(removeFromWishlist(item.product_id))}>Remove From Wishlist</button>
                </div>
                <div className={styles['price-right-container']}>
                    <h1 className={styles['price-right']}>{`$${item.price}`}</h1>
                </div>
            </div>
        ))}
        </div>}
    </div>
  )
}

export default Wishlist