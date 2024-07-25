
import express from 'express';
const router = express.Router();

//import controllers

import productFunctions from '../controllers/productsController.js';
//import middleware

//api routes


//products routes
router.get('/', productFunctions.fetchProducts)
router.get('/:id', productFunctions.getSingleProduct)
router.put('/:id/update-stock', productFunctions.updateProductStock)

export default router