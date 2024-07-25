import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    cost_per_unit: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    sales: {
        type: Number,
        default: 0,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    supplier_name: {
        type: String,
        required: true,
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
    }   
    /*discountRate: {
        type: Number,
        default: 0,
    },*/
})

const Product = mongoose.model('Product', productSchema);
export default Product;

