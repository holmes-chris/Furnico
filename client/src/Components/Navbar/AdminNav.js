import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import styles from "./AdminNav.module.css"
import { FaShoppingBag, FaTruckMoving } from "react-icons/fa";
import {Link, useLocation} from "react-router-dom"
import { IoMenuOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { FaReceipt, FaCouch } from 'react-icons/fa6';




function AdminNav() {
    const location = useLocation()
    const shippingCart = useSelector((state) => state.carts.shippingCart)
    const [path, setPath] = useState("")
    let cartTotal = shippingCart.reduce((acc, item) => item.orderQuantity + acc, 0)
    if (shippingCart.length === 0) {
        cartTotal = 0
    }
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(null)

    const toggleNav = () => {
        setIsOpen(!isOpen)
    }

    const handleNavigate = () => {
        setIsOpen(false)
    }

    const handleHighlight = (link) => {
        setActiveLink(link)
    }

    useEffect(() => {
        const pathname = location.pathname
        const startIndex = 7;
        const endSlash = pathname.indexOf('/', 7)
        const substring = endSlash === -1 ? pathname.substring(startIndex) : pathname.substring(startIndex, endSlash)

        setPath(substring.toUpperCase())
    }, [location])

  return (
    <nav className={styles["nav-container"]}>
        <div className={styles["top-nav-container"]}>
            <div onClick={() => toggleNav()} className={styles["nav-mobile-container"]}>
                <IoMenuOutline className={styles["nav-mobile-icon"]} />
            </div>
            {isOpen ? (            
            <div className={styles["mobile-links-container"]}>
                <Link onClick={() => handleNavigate()} to="/admin/dashboard">Dashboard</Link>
                <Link onClick={() => handleNavigate()} to="/admin/orders">Orders</Link>
                <Link onClick={() => handleNavigate()} to="/admin/products">Products</Link>
                <Link onClick={() => handleNavigate()} to="/admin/shipments">Shipments</Link>
                <Link onClick={() => handleNavigate()} className={styles["shipments-container"]}>
                    <Link to="/">Shop</Link>
                </Link>
            </div>) : null}
            <div className={styles["main-logo-container"]}>
                <img className={styles["main-logo"]} src="https://furnico.s3.us-east-2.amazonaws.com/images/furnico-logo.png" alt="nav-main-logo"/>
            </div>
            <div className={styles["center-nav"]}>
                <h1 className={styles["mobile-nav-admin"]}>ADMIN</h1>
                <img className={styles["mobile-logo"]} src="https://furnico.s3.us-east-2.amazonaws.com/images/furnicoLogo-2.png" alt="mobile-logo" />
                <div className={styles["nav-page-label"]}>
                    <h1 className={styles["page-label"]}>{path}</h1>
                </div>
            </div>
            <div className={styles["nav-top-links"]}>
                <Link to="/" className={styles["shop-link-container"]}>
                    <FaShoppingBag className={styles["shop-link"]}/>
                    <p className={styles["shop-link-text"]}>Shop</p>
                </Link>
                <Link to="/admin/shipments/cart" onClick={() => handleNavigate()} className={styles["cart-link-container"]}>
                    <FaTruckMoving className={styles["cart-link"]} />
                    <p className={styles["cart-count"]}>{cartTotal}</p>
                </Link>
            </div> 
        </div>
        <div className={styles["side-panel-container"]}>
            <Link to="/admin/dashboard" className={styles["panel-logo-container"]}>
                <img className={styles["panel-logo"]} 
                    src="https://furnico.s3.us-east-2.amazonaws.com/images/furnicoLogo-2.png" 
                    alt="nav-logo"
                />
                <h3 className={styles["panel-logo-label"]}>ADMIN</h3>
            </Link>
            <Link to="/admin/dashboard" className={`${styles["dash-link-container"]} ${location.pathname.includes("/dashboard") ? styles["active"] : ''}`}
                onClick={() => handleHighlight('dash')}>
                <RxDashboard className={styles["dash-icon"]}/>
                <h2 className={styles["dash-link"]}>Dashboard</h2>
            </Link>
            <Link to="/admin/orders" className={`${styles["order-link-container"]} ${location.pathname.includes("/admin/orders") ? styles["active"] : ''}`}
                onClick={() => handleHighlight('orders')}>
                <FaReceipt className={styles["order-icon"]}/>
                <h2 className={styles["order-link"]}>Orders</h2>
            </Link>
            <Link to="/admin/products" className={`${styles["products-link-container"]} ${location.pathname.includes("/admin/products") ? styles["active"] : ''}`}
                onClick={() => handleHighlight('products')}>
                <FaCouch className={styles["products-icon"]}/>
                <h2 className={styles["products-link"]}>Products</h2>
            </Link>
            <Link to="/admin/shipments" className={`${styles["shipments-link-container"]} ${location.pathname.includes("/admin/shipments") ? styles["active"] : ''}`}
                onClick={() => handleHighlight('shipments')}>
                <FaTruckMoving className={styles["shipments-icon"]}/>
                <h2 className={styles["shipments-link"]}>Shipments</h2>
            </Link>
        </div>
    </nav>
  )
}

export default AdminNav