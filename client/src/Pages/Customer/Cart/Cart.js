import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import styles from "./Cart.module.css"
import { FaArrowLeft, FaRegTrashAlt } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { updateOrderCart, removeFromCheckoutCart, addToCheckoutCart, subtractFromCheckoutCart } from '../../../Redux/Users/cartsSlice.js';


function Cart({checkoutCart, products}) {
  const dispatch = useDispatch();
  
  const [subtotal, setSubtotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() => {
    const checkoutIds = checkoutCart.map((item) => item.productId);
    const filteredProducts = products.filter((item) => checkoutIds.includes(item.product_id));
    const itemsWithQuantities = filteredProducts.map((product) => {
      const cartItem = checkoutCart.find((item) => item.productId === product.product_id);
      return {...product, quantity: cartItem.quantity}
    })

    setCartProducts(itemsWithQuantities)
  }, [checkoutCart, products]) 

  useEffect(() => {
    const addedTotals = cartProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    setSubtotal(addedTotals)
  }, [cartProducts])


  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCheckoutCart({ productId, quantity }));
  }

  const handleSubtractFromCart = (productId, quantity) => {
    const product = cartProducts.find((item) => item.product_id === productId)
    if (product.quantity !== 1) {
      dispatch(subtractFromCheckoutCart({ productId, quantity }));
    } else {
      const userConfirm = window.confirm(`Are you sure you want to remove ${product.name} from your shopping bag? `)
      if (userConfirm) {
        dispatch(removeFromCheckoutCart(productId))
      }
    }
  }

  const finalizeCart = () => {
    const lineItems = cartProducts.map((item) => {
      return { productId: item.product_id, name: item.name, quantity: item.quantity, image: item.image, price: item.price}
    })

    const generateId = () => {
      return 'ORD-' + Math.random().toString(36).substring(2,9)
    }

    const order = {
      orderId: generateId(),
      products: lineItems,
      amount: subtotal,
      contact: {},
      status: null
    }
    dispatch(updateOrderCart(order))


  }
  console.log('cp: ', cartProducts)

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["cart-header"]}>
        <Link to="/" className={styles["home-bttn"]}>
          <FaArrowLeft className={styles["home-arrow"]}/>
          <h4 className={styles["home-bttn-link"]}>Back To Home</h4>
        </Link>
        <div className={styles["header-title-container"]}>
          <h1 className={styles["header-title"]}>Your Shopping Bag</h1>
        </div>
      </div>
      {cartProducts.length === 0 ? (
        <div className={styles["cart-empty-container"]}>
          <h2 className={styles["cart-empty-text"]}>Cart Empty...😲</h2>
        </div>
      ): null}
      <div className={styles["cart-content"]}>
        <div className={styles["cart-left"]}>
          {cartProducts.map((item) => (
            <div className={styles["cart-item"]}>
              <div className={styles["cart-item-left"]}>
                <img className={styles["item-image"]} src={item.image} alt="item-pic"/>
              </div>
              <div className={styles["cart-item-middle"]}>
                <div className={styles["item-name"]}>{item.name}</div>
                <p className={styles["item-description"]}>{item.description}</p>
                <p>{`${item.price}/piece`}</p>
                <div className={styles["action-container"]}>
                  <p className={styles["quantity-label"]}>Quantity:</p>
                  <button onClick={() => handleSubtractFromCart(item.product_id, 1)}className={styles["decrement-bttn"]}>-</button>
                  <p className={styles["quantity"]}>{item.quantity}</p>
                  <button onClick={() => handleAddToCart(item.product_id, 1)} className={styles["increment-bttn"]}>+</button>
                  <button className={styles["trash-bttn"]} onClick={() => dispatch(removeFromCheckoutCart(item.product_id))}><FaRegTrashAlt /></button>
              </div>
            </div>
            <div className={styles["cart-item-right"]}>
                <h2 className={styles["item-price"]}>{(item.price * item.quantity).toFixed(2)}</h2>
            </div>
          </div>
          ))}
        </div>
        {cartProducts.length !== 0 ? (
          <div className={styles["cart-right"]}>
            <div className={styles["summary-header"]}>
              <h1 className={styles["summary-text"]}>Order Summary</h1>
            </div>
            <div className={styles["subtotal-container"]}>
              <h3 className={styles["subtotal-text"]}>Subtotal</h3>
              <h3 className={styles["subtotal-amount"]}>{subtotal.toFixed(2)}</h3>
            </div>
            <div className={styles["total-container"]}>
              <h3 className={styles["total-text"]}><strong>Total</strong></h3>
              <h3 className={styles["total-amount"]}><strong>{subtotal.toFixed(2)}</strong></h3>
            </div>
            <Link to="/contact" onClick={() => finalizeCart()} className={styles["checkout-bttn"]}>
              <IoBagCheckOutline className={styles["checkout-icon"]}/>
              <p className={styles["checkout-bttn-text"]}>Checkout</p>
            </Link>
          </div>
        ): null}
      </div>
    </div>
  )
}

export default Cart