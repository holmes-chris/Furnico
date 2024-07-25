import Shipment from "../models/ShipmentModel.js";
import Product from "../models/ProductModel.js";
import ShipmentProduct from "../models/ShipmentProductModel.js";
import { addProductStock } from "../functions/updateStock.js"


//get all instances of the shipment schema
const fetchShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.status(200).json(shipments);
    } catch (err) {
        res.status(500).json({ 
            error: "Error fetching shipments" 
        });
        
    }
}

const createShipment = async (req, res) => {
    try {
        const shipmentData = req.body

        const shipmentCost = shipmentData.reduce((acc, line) =>
            acc + Number(line.order_total_cost), 0)

        const shipmentProductDocs = await ShipmentProduct.insertMany(shipmentData);
        const productData = shipmentProductDocs.map(line => ({ productId: line.productId, orderQuantity: line.order_quantity}))
        const shipmentId = shipmentProductDocs[0].shipmentId//grabbing shipmentId from order generated at checkout
        
        //creating shipment
        const shipment = new Shipment({
            shipmentId,
            shipmentDate: new Date(),
            products: productData,
            shipmentCost: shipmentCost.toFixed(2)
        });

        //update product schema stock
        for (let product of shipmentProductDocs) {
            await addProductStock(product.productId, product.order_quantity)
        }

        await shipment.save();
        res.status(200).json({
            message: "Shipment successfully uploaded!"
        }) 

    } catch(err) {
        console.error(`Error creating shipment ${err}`);
        res.status(500).json({
            error: "Error creating shipment."
        })
    }
}



const fetchSingleShipment = async (req, res) => {
    const shipmentId = req.params.id;
    try {
        const shipment = await ShipmentProduct.find({shipmentId});
        if (!shipment) {
            return res.status(404).json({
                error: "Shipment not found"
            });
        } 
        res.status(200).json(shipment);
    }   catch (err) {
        res.status(500).json({ 
            error: "Error fetching shipment" 
        });
}}

const deleteSingleShipment = async(req, res) => {
    const shipmentId = req.params.id; 
    try {
        const shipment = await Shipment.findByIdAndDelete(shipmentId);

        if (!shipment) {
            return res.status(404).json({
                error: "Shipment not found"
            })
        }
        res.status(200).json({ 
            message: `Shipment ${shipmentId} deleted`
        })
    } catch (err) {
        res.status(500).json({ 
            error: "Error fetching shipment"
        })
    }
}

export const fetchTransportHistory = async(req, res) => {
    const productId = req.params.id;
    console.log(productId)
    try {
        const product = await ShipmentProduct.find({ productId: productId})
        if (!product.length === 0) {
            res.status(404).json({
                error: "Product does not exist"
            })
        }

        res.status(200).json(product)
    } catch(err) {
        console.error(`Error fetching history for product ${productId}: ${err}`)
        res.status(500).json({
            error: `Error fetching history for product ${productId}: ${err}`
        })
    }
}

export default {
    fetchShipments,
    fetchSingleShipment,
    createShipment,
    deleteSingleShipment,
    fetchTransportHistory
}