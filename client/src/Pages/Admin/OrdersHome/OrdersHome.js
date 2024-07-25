import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersSuccess, fetchOrders, fetchOrdersFailure } from '../../../Redux/Orders/ordersSlice.js';
import styles from "./OrdersHome.module.css"
import { convertDate } from "../../../Functions/convertDate.js"
import { removeSpaces } from '../../../Functions/removeSpaces.js';
import HeaderBox from '../../../Components/HeaderBox/HeaderBox.js';
import { FaReceipt } from "react-icons/fa";
import Table from '../../../Components/Table/Table.js';


function OrdersHome({orders}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.orders.loading)
  const error = useSelector(state => state.orders.error);

  const formattedOrders = orders.map((order) => {
    const fName = order.contact?.fName ? order.contact.fName.charAt(0).toUpperCase() : "";
    const lName = order.contact?.lName || "";
    return {
      "Order Date": convertDate(order.createdAt),
      "Order ID": order.orderId,
      "Name": `${fName}. ${lName}`,
      "Amount": "$" + order.amount,
      "Status": order.status
    }
  })


  useEffect(() => {
    if (orders.length > 0) {
      setFilteredOrders(formattedOrders);
    }
  }, [orders]);


  const [filteredOrders, setFilteredOrders] = useState(formattedOrders)
  
  const totalOrders = orders.length;
  const completedOrders = orders.filter((order) => order.status === 'Completed').length
  const pendingOrders = orders.filter((order) => order.status === 'Pending').length


  useEffect(() => {
    dispatch(fetchOrders())
    const getOrders = async () => {
      try {
        await axios.get("http://localhost:8080/orders")
        .then((res) => dispatch(fetchOrdersSuccess(res.data)));
      } catch (error) {
        dispatch(fetchOrdersFailure(error))
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <div>Error fetching orders: ${error}</div>
  }
  
  const handleSearch = (e) => {
    const userInput =  removeSpaces(e.target.value.toUpperCase())
    if (!userInput) {
      setFilteredOrders(formattedOrders)
    } else {
      setFilteredOrders(formattedOrders.filter((order) => order["Order ID"].toUpperCase().startsWith(userInput)))
    }
  }
    

  return (
    <div className={styles["orders-page-container"]}>
      <div className={styles["header-container"]}>
        <HeaderBox icon={<FaReceipt />} count={totalOrders} color="#B6C6F0" label="Total Orders"/>
        <HeaderBox icon={<FaReceipt />} count={completedOrders} color= "#66BB78" label="Completed Orders"/>
        <HeaderBox icon={<FaReceipt />} count={pendingOrders} color="#FFE68D" label="Pending Orders"/>
      </div>
      <div className={styles["order-search-container"]}>
        <input className={styles["order-input-box"]} type="text" placeholder="Search Order ID" onChange={handleSearch}/>
      </div>
      <Table data={filteredOrders} path="orders" />
    </div>
  )
}

export default OrdersHome