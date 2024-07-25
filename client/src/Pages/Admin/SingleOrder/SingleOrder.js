import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { convertDate } from '../../../Functions/convertDate.js'
import styles from "./SingleOrder.module.css"
import { FaArrowLeft } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

function SingleOrder({orders}) {
    const {id} = useParams()
    
    const dispatch = useDispatch()
    const [order, setOrder] = useState(null)
    console.log('mount: ',order)
    const [orderStatus, setOrderStatus] = useState(null)
    const statuses = ["Pending", "Completed"];

    useEffect(() => {
        const fetchSingleOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/orders/${id}`)
                setOrder(res.data)
                setOrderStatus(res.data.status)
            } catch (err) {
                console.error(err)
            }
        }
        fetchSingleOrder()
    }, [id])

    const toggleStatus = async (e) => {
        const selected = e.target.value
        console.log('selected: ', selected)
        // setOrderStatus(selected)
        const result = window.confirm("Are you sure you want to update the order status?");
        if (!result) {
            return console.log('canceled')
        } else {
            try {
                const res = await axios.put(`http://localhost:8080/orders/${id}/update-order-status`, { orderId: id, status: selected })
                console.log(res)
                setOrderStatus(selected)

                return res.data
            } catch (err) {
                console.error('Error updating status: ', err)
                throw err
            }
        }
    }


  return (
    <div className={styles["order-container"]}>
        <div className={styles["back-container"]}>
            <FaArrowLeft  className={styles["back-icon"]}/>
            <Link to={'/admin/orders'} className={styles["back-text"]}>Back</Link>
        </div>
        {order ? (
            <div>
                <div className={styles["order-header-container"]}>
                    <div className={styles["order-id-container"]}>
                        <h1 className={styles["order-id-text"]}>{`Order ID: ${order.orderId}`}</h1>
                    </div>
                    <div className={styles["status-container"]}>
                        <h3 className={styles["status-text"]}>Status:</h3>
                        <select className={orderStatus === "Completed" ? `${styles["status-bttn-container"]} ${styles["completed"]}` : styles["status-bttn-container"]} value={orderStatus} onChange={(e) => toggleStatus(e)}>
                            {statuses.map((status, i) => (
                                <option className={styles["option"]} value={status}>{status}</option>
                            ))}
                            <IoMdArrowDropdown className={styles["status-icon"]}/>
                        </select>
                    </div>
                </div>
                <div className={styles["contact-container"]}>
                    <div className={styles["contact"]}>
                        <p>Order ID: {order.orderId}</p>
                        <p>{`Name: ${order.contact.fName} ${order.contact.lName}`}</p>
                        <p>{`Date Ordered: ${convertDate(order.createdAt)}`}</p>
                        <p>{`Phone: ${order.contact.phone}`}</p>
                        <p>{`Email: ${order.contact.email}`}</p>
                    </div>
                </div>
                <div className={styles["order-list-container"]}>
                    <div className={styles["items-container"]}>
                        {order.products.map((product, i) => (
                            <div className={styles["items"]}>
                                <img className={styles["item-img"]} src={order.products[i].image} alt="product-pic"/>
                                <div className={styles["item-details"]}>
                                    <h3 className={styles["item-name"]}>{order.products[i].name}</h3>
                                    <h3 className={styles["item-price"]}>${order.products[i].price}</h3>
                                    <p className={styles["item-quantity"]}>{`QTY: ${order.products[i].quantity}`}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className={styles["order-total"]}>
                        <p><strong>{`Order Total: `}</strong>${order.amount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        ) : null}
    </div>
  )
}

export default SingleOrder