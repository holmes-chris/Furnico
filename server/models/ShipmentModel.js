import mongoose, { Schema } from "mongoose";
import shipmentProductModel from "./ShipmentProductModel.js"

const shipmentSchema = new mongoose.Schema({
    shipmentId: {
        type: String, 
        ref: 'Shipment', 
        required: true
    },
    shipmentDate: {
        type: Date, 
        default: Date.now()
    },
    products: [{
        productId: {
            type: Number, 
            required: true
        },
        orderQuantity: {
            type: Number,
            required: true
        },
    }],
    shipmentCost: {
        type: Number, 
        required: true
    }
})


const Shipment = mongoose.model('Shipment', shipmentSchema);
export default Shipment;