import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch, } from 'react-redux';
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

import MobileSearch from "../Search/MobileSearch/MobileSearch.js"
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";






function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const checkoutCart = useSelector((state) => state.carts.checkoutCart)
    console.log(checkoutCart)
    const dispatch = useDispatch()
  
    const cartTotal = checkoutCart.reduce((acc, item) => item.quantity + acc, 0);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const handleNavigate = () => {
      setIsOpen(false)
    }


  return (
    <nav className={styles['navbar-container']}>
      <div className={styles["nav-logo-container"]}>
        <Link onClick={() => handleNavigate()} to="/">
              <img className={styles['nav-logo-large']} src="https://furnico.s3.us-east-2.amazonaws.com/images/furnico-logo.png" alt="logo"/>
        </Link>
      </div>
        <div className={styles["search-bar"]}>
          <MobileSearch />
        </div>
        <div className={isOpen ? styles["nav-links-active"] : styles["nav-links"]}>
            {/* <Link className={styles["tutorial-link"]} onClick={() => handleNavigate()} to="/tutorial">Tutorial</Link> */}
            <div className={styles['admin-bttn']}>
                <Link onClick={() => handleNavigate()} to="/admin/dashboard" className={styles['admin-with-logo']}>
                  <div style={{display: 'flex', flexDirection: 'column', margin: "auto"}}>
                    <CgProfile className={styles['nav-icon']}/>
                    <p>Admin</p>
                  </div>
                </Link>                  
                <Link onClick={() => handleNavigate()} to="/admin/dashboard"><li className={styles["admin-no-logo"]}>Admin</li></Link>
            </div>
            <Link onClick={() => handleNavigate()} to="/wishlist">
              {isOpen ? <li>Wishlist</li> : <FaHeart className={styles['nav-icon']}/>}
            </Link>
            <Link onClick={() => handleNavigate()} to="/cart">
              {isOpen ? 
              <div className={styles['cart']}>
                <li>Cart</li>
                <p className={styles['numItems']}>{cartTotal}</p> 
              </div>
              : <div className={styles['cart']}>
                  <FaShoppingCart className={styles['nav-icon']}/>
                  <p className={styles['cart-count']}>{cartTotal}</p>
                </div>}
            </Link>
        </div>
        <div className={styles['mobile']} onClick={toggleMenu}>
              {cartTotal > 0 && !isOpen? (
                <p className={styles['cart-count-mobile']}>{cartTotal}</p>
              ): null}
              <button onClick={toggleMenu}className={styles['menu-bttn']}>
                <IoMenuOutline className={styles['nav-icon menu-icon']} />
              </button>
        </div>
    </nav>
  )
}

export default Navbar