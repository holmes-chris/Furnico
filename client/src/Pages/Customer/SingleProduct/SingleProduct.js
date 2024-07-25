import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom';
import { addToCheckoutCart } from '../../../Redux/Users/cartsSlice.js';
import { toggleWishlist } from '../../../Redux/Users/wishlistSlice.js';
import styles from "./SingleProduct.module.css"
import axios from "axios";
import PageError from "../../General/PageError/PageError.js"
import Header from '../../../Components/Header/Header.js';
import MobileSearch from '../../../Components/Search/MobileSearch/MobileSearch.js';
import { FaHeart, FaPlus } from "react-icons/fa6";
import { FaRegHeart, FaArrowLeft } from "react-icons/fa";


function SingleProduct({ wishlist }) {
    const { id } = useParams();
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products);
    const product = products.find((item) => item.product_id === parseInt(id));

    useEffect(() => {
        const incrementClick = async() => {
            try {
                await axios.get(`http://localhost:8080/products/${id}`)
                .then((res) => console.log(res))
            } catch (err) {
                console.error(err)
            }
        }
        incrementClick();
    }, [])

    if (!product) {
        return <PageError />
    }



    const handleAddToCart = (productId, quantity) => {
        dispatch(addToCheckoutCart({ productId, quantity }));
        alert(`${product.name} added to cart.`)
      }

    const wishedItem = wishlist.includes(product.product_id)
  
    return (
        <div>
            <Link to="/" className={styles['home-bttn']}>
                <div className={styles['back-arrow']}>
                    <FaArrowLeft />
                </div>
                Back To Home
            </Link>
            <div className={styles['search-mobile']} tabIndex="0">
                <MobileSearch />
            </div>
            <div className={styles["product-detail"]}>
                <div className={styles["product-top"]}>
                    <Header className={styles["header"]}title={product.name}/>
                </div>
                <div className={styles["product-bottom"]}>
                    <div className={styles["product-left"]}>
                        <img className={styles["product-image"]}src={product.image} alt={product.name} />
                    </div>
                    <div className={styles["product-right"]}>
                        <h1 className={styles["product-name"]}>{product.name}</h1>
                        <h2 className={styles["product-price"]}>{`$${product.price}`}</h2>
                        <p className={styles["product-description"]}>{product.description}</p>
                        <button className={styles['wish-bttn']} onClick={() => dispatch(toggleWishlist(product.product_id))}>
                            {wishedItem ? <FaHeart className={styles['wish-icon']} /> : <FaRegHeart className={styles['wish-icon']}/>}
                        </button> 
                        <p className={styles["product-stock"]}><strong>{`(${product.stock})`}</strong> in stock</p>
                        <button className={styles["add-to-cart-bttn"]} onClick={() => handleAddToCart(product.product_id, 1)}>
                            <FaPlus className={styles['add-icon']}/>
                            <p className={styles['cart-text']}>Add To Cart</p>
                        </button>
                    </div>
                </div>
        </div>
        </div>

    )
}

export default SingleProduct