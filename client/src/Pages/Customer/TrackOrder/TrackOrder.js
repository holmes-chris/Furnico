import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { convertDate } from "../../../Functions/convertDate.js"
import styles from "./TrackOrder.module.css"
import { postRecentOrder } from '../../../Redux/Orders/ordersSlice.js'
import { IoIosSend } from "react-icons/io";
import { MdOutlineRadioButtonChecked } from "react-icons/md";



function TrackOrder({orders}) {
    const dispatch = useDispatch();
    const [error, setError] = useState(null)
    const [filled, setFilled] = useState(null)
    const [order, setOrder] = useState(null)
    const [isTyping, setIsTyping] = useState(false)
    const [inputId, setInputId] = useState('')

    const handleInput = (e) => {
        let input = e.target.value;
        setError(null)
        setInputId(input)
        if (input.length > 0) {
            setIsTyping(true)
        } else {
            setIsTyping(false)
        }
    }



    const findOrder = async () => {
        if (inputId.length === 0) {
            return alert('Please enter an order ID')
        }
        try {
            const res = await axios.get(`http://localhost:8080/orders/${inputId}`)
            dispatch(postRecentOrder(res.data))
            setOrder(res.data)
            const convertedDate = convertDate(res.data.createdAt)
            setOrder({
                ...res.data,
                createdAt: convertedDate
            })
        } catch (e) {
            setError(e.response.data.error)
        }
        setIsTyping(false)
        setInputId('')
    }

    useEffect(() => {
        if (order && order.status === 'Pending') {
            setFilled(true);
        } else {
            setFilled(false);
        }
    }, [order]);

  return (
    <div className={styles["order-container"]}>
        <div className={styles["header-container"]}>
            <h1 className={styles["header-text"]}>Track Your Order</h1>
        </div>
        <div className={styles["input-container"]}>
            <input className={isTyping ? `${styles["order-input-typing"]}` : styles["order-input"]} placeholder='Enter Your order ID'
                value={inputId}
                onChange={handleInput}
            />
            <Link className={styles["send-icon-container"]} onClick={() => findOrder()}>
                <IoIosSend className={styles["send-icon"]}/>
            </Link>
        </div>
        <div className={styles["results-container"]}>
            {order ? (
                <div className={styles["order-details-container"]}>
                    <div className={styles["order-details-top"]}>
                        <p className={styles["order-name"]}>{`Name: ${order.contact.fName} ${order.contact.lName}`}</p>
                        <p className={styles["order-date"]}>{`Date Placed: ${order.createdAt}`}</p>
                        <p className={styles["order-id"]}>{`Order ID: : ${order.orderId}`}</p>
                    </div>
                    <div className={styles["order-details-bottom"]}>
                        <div className={styles["details-left-container"]}>
                            <MdOutlineRadioButtonChecked className={styles["status-left-icon"]}/>
                            <p className={styles["status-left-text"]}>Processing</p>
                        </div>
                        <div className={styles["details-middle-container"]}>
                            <div className={styles["status-divider"]}></div>
                        </div>
                        <div className={styles["details-right-container"]}>
                            <MdOutlineRadioButtonChecked className={!filled ? `${styles["status-right-icon"]} ${styles["fill"]}` : styles["status-right-icon"]}/>
                            <p className={styles["status-right-text"]}>On The Way!</p>
                        </div>
                    </div>
                </div>
            ) : 
            <div className={styles["error-container"]}>
                <p className={styles["error-text"]}>{error}</p>
            </div>
            }
        </div>
    </div>
  )
}

export default TrackOrder