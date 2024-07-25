import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link, useNavigate, Router, Route, Routes } from "react-router-dom"
import { useDispatch } from "react-redux"
import styles from "./Contact.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import {createOrderSuccess, postRecentOrder } from "../../../Redux/Orders/ordersSlice.js"
import { clearCheckoutCart } from '../../../Redux/Users/cartsSlice.js';

function Contact({orderCart}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (orderCart.length === 0 ) {
        navigate("/")
    }
    const {products} = orderCart
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')

    if (orderCart.length === 0) {
        navigate('/')
    }

    const handlefNameChange = (e) => {
        setfName(e.target.value)
    }

    const handlelNameChange = (e) => {
        setlName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const placeOrder = async (orderCart) => {
        if (fName.length === 0 || lName.length === 0) {
            return alert("Must fill out First and Last Name.")
        }

        let order = {
            orderId: orderCart.orderId,
            products: orderCart.products,
            amount: orderCart.amount.toFixed(2),
            contact: {
                fName: fName,
                lName: lName,
                email: email,
                phone: phone
            },
            status: "Pending"
        }
        
        try {
            await axios.post("http://localhost:8080/orders/create-order", order)
            .then((res) => {
                dispatch(postRecentOrder(order))
                dispatch(createOrderSuccess(res.data))
            })
        } catch (e) {
            console.error(e)
        }
        
        //clear cart ------------------------
        dispatch(clearCheckoutCart())
        
        navigate(`/confirmation/${order.orderId}`)
        
    }

  return (
    <div className={styles["contact-container"]}>
        <div className={styles["header-container"]}>
            <Link to="/cart" className={styles["cart-bttn"]}>
                <FaArrowLeft className={styles["cart-arrow"]}/>
                <h4 className={styles["cart-bttn-link"]} to="/cart">Back To Cart</h4>
            </Link>
            <h1 className={styles["mobile-summary-header"]}>Order Summary</h1>
        </div>
        <div className={styles["content-container"]}>
            <div className={styles["content-left"]}>
                <div className={styles["item-container"]}>
                    {products ? products.map((item) => (
                        <div className={styles["cart-item"]}>
                            <div className={styles["item-left"]}>
                                <img className={styles["item-image"]} src={item.image} alt="item-pic"/>
                            </div>
                            <div className={styles["item-right"]}>
                                <h2 className={styles["item-name"]}>{item.name}</h2>
                                <h2 className={styles["item-price"]}>{`$${item.price}`}</h2>
                                <p className={styles["item-quantity"]}>{`QTY: ${item.quantity}`}</p>
                            </div>
                        </div>
                        
                    )): null}
                </div>
                <form className={styles["contact-info-container"]}>
                    <h1 className={styles["contact-header"]}>Contact Information</h1>
                    <div className={styles["name-container"]}>
                        <input className={styles["fName-input"]} required type="text" placeholder='First Name'
                            value={fName}
                            onChange={handlefNameChange}
                        />
                        <input className={styles["lName-input"]} required type="text" placeholder='Last Name'
                            value={lName}
                            onChange={handlelNameChange}
                        />
                    </div>
                    <div className={styles["email-container"]}>
                        <input className={styles["email-input"]} required type="email" placeholder='Email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className={styles["phone-container"]}>
                        <input className={styles["phone-input"]} required type="phone" placeholder='Phone (xxx) xxx-xxx'
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div className={styles["notify-container"]}>
                        <input className={styles["checkbox"]} type="checkbox"/>
                        <p className={styles["notify-text"]}>Send text updates for my order (not implemented yet)</p>
                    </div>
                </form>
            </div>
            <div className={styles["content-right"]}>
                <div className={styles["order-header-container"]}>
                    <h1 className={styles["contact-header"]}>Order Summary</h1>
                </div>
                <div className={styles["subtotal-container"]}>
                    <h3 className={styles["subtotal-text"]}>Subtotal</h3>
                    <h3 className={styles["subtotal"]}>{`$40.99`}</h3>
                </div>
                <div className={styles["total-container"]}>
                    <h3 className={styles["total-text"]}>Total</h3>
                    <h3 className={styles["total"]}>{`$40.99`}</h3>
                </div>
                <button className={styles["order-bttn-container"]} type="submit" onClick={() => placeOrder(orderCart)}>
                    <div className={styles["order-bttn"]}>
                        <IoBagCheckOutline className={styles["order-icon"]}/>
                        <p className={styles["order-bttn-text"]}>Place (fake) Order</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Contact