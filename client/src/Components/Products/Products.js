import React, {useState, useEffect} from 'react'
import Product from "../Product/Product.js"
import styles from "./Products.module.css"
import { IoIosFunnel } from "react-icons/io";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";



function Products({products, addToCart, wishlist}) {
  const [sort, setSort] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products.map((product) => product))
  }, [products])



  const sortProducts = () => {
    if (!sort) {
      setProductList(productList.sort((a, b) => a.price - b.price))
    } else {
      setProductList(productList.sort((a, b) => b.price - a.price))
    }
    setSort(!sort)
  }

  if (!products || products.length === 0) {
    return (<p>...loading</p>)
  }

  return (
    <div className={styles['products-container']}>
      <div className={styles['products-sub-header']}>
        <button className={styles["list-bttn"]} onClick={()=> sortProducts()}>
          {sort ? <FaSortAmountUp className={styles['list-icon']}/> : <FaSortAmountDown className={styles['list-icon']}/> }
          Sort
        </button>
        <h4>Results: <strong>{`(${products.length})`}</strong></h4>
      </div>
      <div className={styles['products']}>
        {productList ? productList.map((product,i) => (
          <Product className={styles["products"]} key={product.product_id} 
            product={product} addToCart={addToCart} wishlist={wishlist}
          />
        )) : <h3>No Products Found</h3>}
      </div>

    </div>
  )
}

export default Products