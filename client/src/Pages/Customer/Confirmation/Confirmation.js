import React, {useEffect} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import styles from "./Confirmation.module.css"
import { postRecentOrder } from '../../../Redux/Orders/ordersSlice.js'
import { FaFlagCheckered } from "react-icons/fa";



function Confirmation() {
    const { id } = useParams()
    console.log(id)
    const order = useSelector((state) => state.orders.recentOrder)
    const dispatch = useDispatch();
    
    console.log(order)

    useEffect(() => {
        const fetchOrder = async() => {
            try {
                const res = await axios.get(`http://localhost:8080/orders/${id}`)
                dispatch(postRecentOrder(res.data))
                console.log('res: ', res)
            } catch (e) {
                console.error(e)
            }
        }
        fetchOrder()
    }, [id, dispatch])
    console.log(order)

    

  return (
    <div className={styles["confirmation-container"]}>
        {order ? (    
        <div>
            <h1 className={styles["header-title"]}>Order Confirmation</h1>
            <h1 className={styles["message"]}>{`Thank you for your order, ${order.contact.fName}`}</h1>
            <p className={styles["sub-message"]}>A confirmation has been sent toy your email and/or phone (not implemented) </p>
            <p className={styles["order-id"]}><strong>{`Order ID: ${order.orderId}`}</strong></p>
            <div className={styles["track-bttn-container"]}>
                <Link to={`/track-order`} className={styles["track-bttn"]}>
                    <FaFlagCheckered className={styles["track-icon"]}/>
                    <p className={styles["track-text"]}>Track Your Order</p>
                </Link>
            </div>
        </div>
        ) : null}
    </div>
  )
}

export default Confirmation