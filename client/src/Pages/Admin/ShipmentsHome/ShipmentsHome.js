import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "./ShipmentsHome.module.css";
import Table from '../../../Components/Table/Table.js';
import { convertDate } from '../../../Functions/convertDate.js';
import { removeSpaces } from '../../../Functions/removeSpaces.js';

function ShipmentsHome() {
  const [shipments, setShipments] = useState([])
  const [filteredData, setFilteredData] = useState([])
  
  //fetch all shipments from database
  useEffect(() => {
    const fetchShipments = async() => {
      try {
        await axios.get("http://localhost:8080/shipments")
        .then((res) => setShipments(res.data))
        console.log(shipments)
      } catch(err) {
        console.error(err)
      }
    }
    fetchShipments()
}, [])

console.log(shipments)

  useEffect(() => {
      //re-format the table data to match mockup (date,id,#of products,cost) ONLY
      const formattedData = shipments.map((item) => ({
        "Shipment Date": convertDate(item.shipmentDate),
        "Shipment ID": item.shipmentId,
        "Number of Products": item.products.reduce((sum, item) => Number(item.orderQuantity) + sum, 0),
        "Shipment Cost": "$" + item.shipmentCost.toFixed(2)
      }))
      setFilteredData(formattedData)
  }, [shipments])

  const handleSearch = (e) => {
    let input = removeSpaces(e.target.value.toUpperCase());
    if (!input) {
      setFilteredData(shipments.map((item) => ({
        "Shipment Date": convertDate(item.shipmentDate),
        "Shipment ID": item.shipmentId,
        "Number of Products": item.products.reduce((sum, item) => Number(item.orderQuantity) + sum, 0),
        "Shipment Cost": "$" + item.shipmentCost.toFixed(2)
      })))
    } else {
      let results = shipments.filter((item) => item["shipmentId"].toUpperCase().startsWith(input))
      setFilteredData(results.map((item) => ({
        "Shipment Date": convertDate(item.shipmentDate),
        "Shipment ID": item.shipmentId,
        "Number of Products": item.products.reduce((sum, item) => Number(item.orderQuantity) + sum, 0),
        "Shipment Cost": "$" + item.shipmentCost.toFixed(2)
      })))
    }
  }

  return (
    <div className={styles["shipments-home-container"]}>
        <div className={styles["shipments-header"]}>
            <h1 className={styles["header-text"]} >Shipments</h1>
        </div>
        <input className={styles["search"]} onChange={handleSearch} placeholder="Enter Shipment ID"/>
        <div className={styles["shipments-table"]}>
            <Table data={filteredData} path="shipments" />
        </div>
    </div>
  )
}

export default ShipmentsHome