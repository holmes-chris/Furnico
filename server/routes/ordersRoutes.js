
import express from 'express';
const router = express.Router();

//import controllers

import orderFunctions from '../controllers/ordersController.js';
//import middleware

//api routes


//order routes
router.get('/', orderFunctions.getOrders)
router.get('/:id', orderFunctions.getSingleOrder)
router.post('/create-order', orderFunctions.createOrder)
router.put('/:id/update-order-status', orderFunctions.updateOrderStatus)
router.delete('/:id', orderFunctions.deleteOrder)

export default router