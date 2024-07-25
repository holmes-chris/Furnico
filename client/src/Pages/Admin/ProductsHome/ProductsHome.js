import React, {useState, useEffect} from 'react'
import styles from "./ProductsHome.module.css"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { addToShippingCart } from '../../../Redux/Users/cartsSlice.js';
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6"

function ProductsHome({products, shippingCart, loading}) {
    const dispatch = useDispatch()
    const [productList, setProductList] = useState(products)
    const [sort, setSort] = useState(false)
    
    useEffect(() => {
        setProductList(products)
    }, [products])
    console.log(products)
    
    const sortProducts = () => {
        const sortedProducts = [...productList].sort((a,b) => {
            return sort ? b.price - a.price : a.price - b.price
        })
        setProductList(sortedProducts)
        setSort(!sort)
    }

    if (loading) {
        return (<p>loading...</p>)
    }

    const handleSearch = (e) => {
        const input = e.target.value.toLowerCase();
        if (input.length === 0) {
            return setProductList(products)
        }
        const filteredProducts = products.filter((product, i) => product.name.toLowerCase().startsWith(input))
        setProductList(filteredProducts)
    }

    const showModal = (productId) => {
        const orderQuantity = parseInt(prompt("Please enter order quantity:"));
        console.log(orderQuantity)
        if (isNaN(orderQuantity)) {
            return
        } else {
            addToCart(productId, orderQuantity)
        }
    }

    const addToCart = (productId, orderQuantity) => {
        if (isNaN(orderQuantity) || orderQuantity <= 0) {
            return alert('Quantity must be greater than zero.')
        } 
        const orderedProduct = products.find((product) => product.product_id === productId) //get single object in array
        dispatch(addToShippingCart({productId, orderQuantity}))
        alert(`(${orderQuantity}) ${orderedProduct.name} added to cart.`)
        console.log('sCart: ', shippingCart)
    }


  return (
    <div className={styles["home-container"]}>
        <div className={styles["search-container"]}>
            <input className={styles["search-input"]} type="text" placeholder="Search Products" onChange={(e) => handleSearch(e)} />
            <button className={styles["sort-bttn"]} onClick={()=> sortProducts()}>
            {sort ? <FaSortAmountUp className={styles['sort-icon']}/> : <FaSortAmountDown className={styles['sort-icon']}/> }
                <p>Sort</p>
            </button>
        </div>
        <div className={styles["products-container"]}>
            {productList ? productList.map((product) => (
                <div className={styles["product-container"]}>
                    <Link to={`/admin/products/${product.product_id}`} className={styles["product-info"]}>
                        <div className={styles["product-image-container"]} >
                            <img className={styles["product-image"]}src={product.image} alt="product-pic"/>
                        </div>
                        <div className={styles["product-details-container"]}>
                            <h1 className={styles["product-name"]}>{product.name}</h1>
                            <h1 className={styles["product-price"]}>${product.price}</h1>
                            <p className={styles["product-description"]}>{product.description}</p>
                            <p className={styles["product-stock"]}><strong>({product.stock})</strong> in stock</p>
                        </div>
                    </Link>
                    <button className={styles["product-bttn"]} onClick={() => showModal(product.product_id)} >
                        <FaPlus className={styles["bttn-icon"]} />
                        <p className={styles["bttn-text"]}>Restock</p>
                    </button>
                </div>
            )): <h3>No products found</h3>}
        </div>
    </div>
  )
}

export default ProductsHome