import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom"
import styles from "./TransportHistory.module.css"
import { FaArrowLeft } from 'react-icons/fa';
import { convertDate } from '../../../Functions/convertDate.js';

function TransportHistory() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    

    useEffect(() => {
        const fetchHsitory = async() => {
            try {
                await axios.get(`http://localhost:8080/shipments/transport-history/${id}`)
                .then((res) => setData(res.data))
            } catch (error) {
                console.error(error)
            }
        }

        const fetchProduct = async() => {
            try {
                await axios.get(`http://localhost:8080/products/${id}`)
                .then((res) => setProduct(res.data))
            } catch (error) {
                console.error(error)
            }
        }

        fetchHsitory()
        fetchProduct()
    }, [])

    const headers = ["Shipment Date", "Shipment ID", "Product ID", "Product Name", "Supplier Name", "PCKG Height","PCKG Width", "PCKG Length", "Cost Per Unit", "Order Quantity", "Order Cost"];

    console.log(data)
 

  return (
    <div className={styles["history-container"]}>
        <Link to={`/admin/products/${id}`} className={styles["history-bttn"]}>
            <FaArrowLeft className={styles["bttn-icon"]}/>
            <p className={styles["bttn-text"]}>Back</p>
        </Link>
        <div className={styles["history-header"]}>
            <div className={styles["header-text"]}>
                <h1>Transport History</h1>
                <h3>{`${product.name} (${product.product_id})`}</h3>
            </div>
            <img src={product.image} alt="product-pic" />
        </div>
        <div className={styles["table-container"]}>
            <table>
                <thead>
                    {headers.map((header) => (
                            <th>{header}</th>
                    ))}
                </thead>
                <tbody>
                    {data.map((line) => (
                        <tr>
                            <td>{convertDate(line.shipmentDate)}</td>
                            <td>{line.shipmentId}</td>
                            <td>{line.productId}</td>
                            <td>{line.name}</td>
                            <td>{line.supplier_name}</td>
                            <td>{line.pckg_height}</td>
                            <td>{line.pckg_width}</td>
                            <td>{line.pckg_length}</td>
                            <td>${line.cost_per_unit}</td>
                            <td>{line.order_quantity}</td>
                            <td>${line.order_total_cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TransportHistory