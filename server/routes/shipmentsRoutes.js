import express from "express";
const router = express.Router();
import shipmentFunctions from "../controllers/shipmentsController.js"
//import shipment controllers

//import shipment routes
router.get("/", shipmentFunctions.fetchShipments)
router.get("/:id", shipmentFunctions.fetchSingleShipment)
router.post("/create-shipment", shipmentFunctions.createShipment)
router.get("/:id", shipmentFunctions.deleteSingleShipment)
router.get("/transport-history/:id", shipmentFunctions.fetchTransportHistory)

export default router