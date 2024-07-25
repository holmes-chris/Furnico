import mongoose from 'mongoose';


export const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    amount: {
        type: Number, required: true,
    },
    contact: {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        phone: {
            type: String,
        },
        
    },
    status: {
        type: String,
        default: "Pending"
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Orders', orderSchema);
export default Order;

