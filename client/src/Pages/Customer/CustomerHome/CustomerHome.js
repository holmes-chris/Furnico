import React from 'react';
import Products from "../../../Components/Products/Products.js"
import Header from "../../../Components/Header/Header.js"
import MobileSearch from "../../../Components/Search/MobileSearch/MobileSearch.js"
import styles from "./CustomerHome.module.css"

function CustomerHome({wishlist, products}) {
  return (
    <div className={styles["home-container"]}>
        <div className={styles['search-mobile']}>
          <MobileSearch />
        </div>
        <Header title="All Products"/>
        <Products wishlist={wishlist} products={products}/>
    </div>
  )
}

export default CustomerHome