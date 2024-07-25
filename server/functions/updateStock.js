import Product  from '../models/ProductModel.js'; // Ensure correct import path

export const addProductStock = async (productId, quantity) => {
    try {
        console.log(`Attempting to find product with ID: ${productId}`);
        const product = await Product.findOneAndUpdate(
            { product_id: productId },
            { $inc: { stock: quantity } },
            { new: true }
        );

        if (!product) {
            throw new Error(`Product ${productId} could not be found.`);
        }

        console.log(`Found product: ${product.name}, current stock: ${product.stock}, adding quantity: ${quantity}`);
        await product.save();
        console.log(`Updated stock for product: ${product.name}, new stock: ${product.stock}`);
    } catch (err) {
        console.error(`Error updating product stock: ${err}`);
    }
};


export const removeProductStock = async (productId, quantity) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { product_id: productId },
            { $inc: { stock: -quantity } },
            { new: true }
        );
        if (!updatedProduct) {
            //throw error and signal to the higher function
            throw new Error(`Product with ID ${productId} not found.`);
        }

        if (updatedProduct.stock < 0) {
            throw new Error(`Insufficient stock for product with ID ${productId}.`);
        }

        return updatedProduct
    } catch (err) {
        console.error(`Error updating product stock ${err}`)
        throw err
    }
}