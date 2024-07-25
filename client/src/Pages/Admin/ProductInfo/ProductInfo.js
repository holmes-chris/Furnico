import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import styles from "./ProductInfo.module.css"
import HeaderBox from '../../../Components/HeaderBox/HeaderBox.js'
import { SlGraph } from "react-icons/sl";
import { FaBox, FaArrowLeft } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";




function ProductInfo({products}) {
  const { id } = useParams();
  const [data, setData] = useState([])
  

  useEffect(() => {
    const getProduct = async() => {
      try {
        await axios.get(`http://localhost:8080/products/${id}`)
        .then((res) => setData(res.data))
      } catch(err) {
        console.error(err)
      }
    }

    getProduct()
  }, [])


  return (
    <div className={styles["product-page-container"]}>
      <Link to="/admin/products" className={styles["bttn-container"]}>
        <FaArrowLeft className={styles["bttn-icon"]}/>
        <p>Back</p>
      </Link>
      <div className={styles["header-container"]}>
        <HeaderBox icon={<SlGraph />} count={data.sales} color="#3B79F1" label="Total Sales" />
        <HeaderBox icon={<FaBox />} count={data.stock} color="#977352" label="In Stock" />
        <HeaderBox icon={<AiFillDollarCircle />} count={`$${(data.stock * data.cost_per_unit).toFixed(2)}`} color="#44917A" label="Stock Value" />
      </div>
      <div className={styles["product-header"]}>
        <img className={styles["product-image"]} src={data.image} alt="product-pic"/>
        <h3>{data.name}</h3>
        <h3>{data.product_id}</h3>
        <Link to={`/admin/products/transport-history/${data.product_id}`} className={styles["transport-bttn"]}>
          <p>Transportation History</p>
        </Link>
      </div>
      <div className={styles["product-details"]}>
        <p>Product ID: {data.product_id}</p>
        <p>Name: {data.name}</p>
        <p>Category: {data.category?.length > 0 ? data.category.map((word) => `${word}, `) : ""}</p>
        <p>Tags: {data.tags?.length > 0 ? data.tags.map((word) => `${word}, `): ""}</p>
        <p>Description: {data.description}</p>
        <p>Price: ${data.price}</p>
        <p>Cost Per Unit: ${data.cost_per_unit}</p>
        <p>Stock: {data.stock}</p>
        <p>Supplier: {data.supplier_name}</p>
        <p>Clicks: {data.clicks}</p>
        <p>Sales: {data.sales}</p>
      </div>
    </div>
  )
}

export default ProductInfo