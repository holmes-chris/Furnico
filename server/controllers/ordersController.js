import Order from "../models/OrderModel.js"
import Product from "../models/ProductModel.js";

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({
            error: `Error getting order: ${err}`
        })
        console.error(`Error getting orders: ${err}`)
    }
}

const getSingleOrder = async (req, res) => {
    const orderId = req.params.id
    
    try {
        const order = await Order.findOne({orderId});

        if (!order) {
            return res.status(404).json({
                error: `Order ${orderId} does not exist.`
            })
        }
        res.status(200).json(order)
        
    } catch (err) {
        res.status(500).json({
            error: `Error getting order ${orderId}: ${err}`
        })
        console.error(`Error getting order ${orderId}: ${err}`)
    }
}


const createOrder = async (req, res) => {
    try {
        console.log('reqBody: ', req.body)
        const orderData = req.body;
        console.log('ORDERDATA: ', orderData)
        const { products } = orderData
        
        //remove ordered products from product stock
        //add sale for each product
        for (const { productId, quantity } of products) {
            await Product.findOneAndUpdate(
                { product_id: productId},
                { $inc: {stock: -quantity, sales: quantity } },
                { new: true }
            )
        }

        const order = new Order(orderData)
        
        await order.save()
        res.status(200).json({
            message: `Order created successfully!`,
            order
        })
    } catch (err) {
        res.status(500).json({
            error: `Error creating order: ${err}`
        })
        console.error(`Error creating order: ${err}`)
    }
}

const updateOrderStatus = async (req, res) => {
    console.log('new: ',req.body)
    try {
        const { orderId, status } = req.body
        console.log(req.body)
        const order = await Order.findOneAndUpdate(
            {orderId},
            {status},
            {new: true} 
        )

        if (!order) {
            return res.status(404).json({
                message: `Order ${orderId} not found.`
            })
        }

        res.status(200).json({
            message: `Order ${orderId} status updated successfully!, ${order.status}`
        })
        
    } catch (err) {
        res.status(500).json({
            error: `Error updating order status: ${err}`
        })
        console.error(`Error updating order status: ${err}`)
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.id
    try {
        const order = await Order.findByIdAndDelete(orderId)

        if (!order) {
            return `Order ${orderId} not found.`
        }
        res.status(200).json({
            message: `Order ${orderId} successfully deleted`
        })
    } catch (err) {
        res.status(500).json({
            error: `Error deleting order ${orderId}: ${err}`
        })
        console.error(`Error deleting order ${orderId}: ${err}`)
    }
}

export default {
    getOrders,
    getSingleOrder,
    createOrder,
    updateOrderStatus,
    deleteOrder
}

