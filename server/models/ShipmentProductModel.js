import mongoose from "mongoose";

const shipmentProductSchema = new mongoose.Schema({//individual product rows 
    shipmentId: {
        type: String, 
        required: true
    },
    shipmentDate: {
        type: Date, 
        default: Date.now()
    },
    productId: {
        type: Number, 
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    supplier_name: {
        type: String,
        required: true
    },
    pckg_height: {
        type: Number,
        required: true
    },
    pckg_width: {
        type: Number,
        required: true
    },
    pckg_length: {
        type: Number,
        required: true
    },
    cost_per_unit: {
        type: Number,
        required: true
    },
    order_quantity: {
        type: Number,
        required: true
    },
    order_total_cost: {
        type: Number,
        required: true
    }
})

const ShipmentProduct = mongoose.model('ShipmentProduct', shipmentProductSchema);
export default ShipmentProduct;