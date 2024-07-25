import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import styles from "./SingleShipment.module.css"
import axios from 'axios';
import { convertDate } from '../../../Functions/convertDate.js';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";


function SingleShipment() {
    const { id } = useParams()
    const [shipment, setShipment] = useState([])
    
    

    const headers = ["Shipment Date", "Shipment ID", "Product ID", "Product Name", "Supplier Name", "PCKG Height","PCKG Width", "PCKG Length", "Cost Per Unit", "Order Quantity", "Order Cost"];

    const formattedData = shipment.map((item) => (
        {
            "Shipment Date" : convertDate(item.shipmentDate),
            "Shipment ID": item.shipmentId,
            "Product ID": item.productId,
            "Product Name": item.name,
            "Supplier Name": item.supplier_name,
            "PCKG Height": item.pckg_height,
            "PCKG Length": item.pckg_length,
            "PCKG Width": item.pckg_width,
            "Cost Per Unit": "$" + item.cost_per_unit,
            "Order Quantity": item.order_quantity,
            "Order Cost": "$" + item.order_total_cost.toFixed(2)
        }
    ))
    console.log(formattedData);
    
    useEffect(() => {
        const fetchSingleShipment = async() => {
            try {
                await axios.get(`http://localhost:8080/shipments/${id}`)
                .then((res) => setShipment(res.data))
            } catch (err) {
                console.error(err)
            }
        };
        fetchSingleShipment()
    }, [])

    const numOfItems = shipment.reduce((acc, line) => line.order_quantity + acc, 0)
    const shipmentCost = shipment.reduce((acc, line) => line.order_total_cost + acc, 0)

  return (
    <div className={styles["shipment-container"]}>
        <div className={styles["shipment-header"]}>
            <Link to="/admin/shipments" className={styles["back-bttn"]}>
                <FaArrowLeft className={styles["back-icon"]}/>
                <p className={styles["back-text"]}>Back</p>
            </Link>
            <div className={styles["header-details"]}>
                <h1>Shipment 12345</h1>
                <h3>{`${numOfItems} items`}</h3>
                <h3>{`$${shipmentCost.toFixed(2)}`}</h3>
            </div>
        </div>
        <div className={styles["table-container"]}>
            <table className={styles["shipment-table"]}>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {formattedData.map((line,i) => (
                    <tr>
                        {headers.map((header) => (
                            <td>{line[header]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default SingleShipment