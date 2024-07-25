
import Products from "../models/ProductModel.js"

const fetchProducts = async (req,res) => {
        try {
            const products = await Products.find();
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ 
                error: 'Error getting products'
            })
            console.error(`Error getting products: ${err}`)
        }
        
}

const getSingleProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Products.findOne({product_id: productId});
        if (!product) {
            return res.status(404).json({
                error: `Product ${productId} not found`
            })
        }
  
        product.clicks += 1
        console.log(typeof product.sales)
        await product.save()
        
        res.status(200).json(product)
    } catch (err) {
        console.error(`Error getting product ${productId}: ${err}`)
        res.status(500).json({error: 'Error getting product' })
    }
}

const updateProductStock = async (req, res) => {
    const { productId, quantity } = req.body;

    if (quantity === undefined) {
        return res.status(400).json({ error: 'New quantity is required' });
    }

    try {
        const product = await Products.findOne({productId});
        if (!product) {
            return res.status(404).json({error: `Error updating product quantity`})
        }
        product.stock == quantity;
        await product.save()
        res.status(200).json({
            message: `Product ${productId} current stock is now ${quantity}`
        })
    } catch (err) {
        console.error(`Error updating product ${productId}: ${err}`)
        res.status(500).json({error: 'Error updating product' })
    }
}

export default {
    fetchProducts,
    getSingleProduct,
    updateProductStock
};

