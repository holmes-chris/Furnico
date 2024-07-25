import products from "../../client/src/Data/productData.js"
import Product from "..//models/ProductModel.js"


const seedProducts = async () => {
    try {
    // Insert the products into the database
    await Product.insertMany(products);

    console.log('Products seeded successfully');
    } catch (error) {
    console.error('Error seeding products:', error);
    }
};

seedProducts();

export default seedProducts
    