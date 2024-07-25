import styles from './App.module.css';
import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Layout from './Pages/Layout/Layout.js';
import axios from "axios";
import CustomerHome from "./Pages/Customer/CustomerHome/CustomerHome.js"
import SingleProduct from './Pages/Customer/SingleProduct/SingleProduct.js';
import Wishlist from './Pages/Customer/Wishlist/Wishlist.js';
import Cart from './Pages/Customer/Cart/Cart.js'
import Contact from './Pages/Customer/Contact/Contact.js'
import Confirmation from './Pages/Customer/Confirmation/Confirmation.js'
import TrackOrder from './Pages/Customer/TrackOrder/TrackOrder.js';
import Dashboard from './Pages/Admin/Dashboard/Dashboard.js';
import OrdersHome from './Pages/Admin/OrdersHome/OrdersHome.js';
import SingleOrder from './Pages/Admin/SingleOrder/SingleOrder.js';
import ProductsHome from './Pages/Admin/ProductsHome/ProductsHome.js'
import ProductInfo from './Pages/Admin/ProductInfo/ProductInfo.js';
import TransportHistory from './Pages/Admin/TransportHistory/TransportHistory.js';
import ShipmentsHome from './Pages/Admin/ShipmentsHome/ShipmentsHome.js';
import SingleShipment from './Pages/Admin/SingleShipment/SingleShipment.js';
import ShipmentsCart from './Pages/Admin/ShipmentsCart/ShipmentsCart.js';
import PageError from './Pages/General/PageError/PageError.js';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure }  from "./Redux/Products/productsSlice.js"


// import ShippingForm from './Forms/ShippingForm.js';





function App() {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);
  const products = useSelector(state => state.products.products);
  const orders = useSelector(state => state.orders.orders);
  const recentOrder = useSelector(state => state.orders.recentOrder)
  const wishlist = useSelector(state => state.wishlist.wishlist)
  const checkoutCart = useSelector(state => state.carts.checkoutCart)
  const shippingCart = useSelector(state => state.carts.shippingCart)
  const orderCart = useSelector(state => state.carts.checkoutOrder)
  const product = products.map((item) => item)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)


  

  useEffect(() => {
    
    const fetchProducts = async() => {
      dispatch(fetchProductsRequest())
      try {
        await axios.get("http://localhost:8080/products")
        .then((res) => {
          dispatch(fetchProductsSuccess(res.data))
        })
      } catch (err) {
        console.log(err) 
        dispatch(fetchProductsFailure(err))
      }
    }
    
    fetchProducts()
  }, [dispatch])

  console.log(products)

  return (
      <Layout>
        <Routes>
          <Route path="*" element={<PageError />} /> 
          <Route path="/" element={<CustomerHome wishlist={wishlist} products={products}/>} />
          <Route path="/products/:id" element={<SingleProduct wishlist={wishlist} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} products={products} />} />
          <Route path="/cart" element={<Cart checkoutCart={checkoutCart} products={products}  />} />
          <Route path="/contact" element={<Contact orderCart={orderCart} />} />
          <Route path="/confirmation/:id" element={<Confirmation recentOrder={recentOrder} />} />
          <Route path="/track-order" element={<TrackOrder orders={orders} />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<OrdersHome orders={orders} />} />
          <Route path="/admin/products" element={<ProductsHome products={products} shippingCart={shippingCart} loading={loading} />} />
          <Route path="/admin/products/:id" element={<ProductInfo products={products} />} />
          <Route path="/admin/products/transport-history/:id" element={<TransportHistory />} />
          <Route path="/admin/shipments" element={<ShipmentsHome />} />
          <Route path="/admin/shipments/:id" element={<SingleShipment />} />
          <Route path="/admin/shipments/cart" element={<ShipmentsCart shippingCart={shippingCart} products={products} />} />
          <Route path="/admin/orders/:id" element={<SingleOrder orders={orders} />} />
        </Routes>
      </Layout>
  );
}

export default App;