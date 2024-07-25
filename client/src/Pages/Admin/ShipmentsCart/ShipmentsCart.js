import React from 'react'
import styles from "./ShipmentsCart.module.css"
import CartTable from '../../../Components/Table/CartTable.js'

function ShipmentsCart({shippingCart, products}) {
    console.log(shippingCart)
  return (
    <div className={styles["cart-container"]}>
        <div className={styles["cart-header-container"]}>
            <h1>Shipping Cart</h1>
            <p>{`(${shippingCart.length}) product(s)`}</p>
        </div>
        <div className={styles["cart-table-container"]}>
            <CartTable cart={shippingCart} products={products} />
        </div>
    </div>
  )
}

export default ShipmentsCart