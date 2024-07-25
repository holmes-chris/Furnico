//import modules

import productsRoutes from './routes/productsRoutes.js'
import ordersRoutes from './routes/ordersRoutes.js'
import shipmentsRoutes from './routes/shipmentsRoutes.js'

import express from "express"
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv";
dotenv.config()


//app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//db
const mongo_uri = 'mongodb+srv://testuser1:testing12123@furnico.pdgga6h.mongodb.net/?retryWrites=true&w=majority&appName=Furnico'

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected')
})
.catch(err => console.log('database connection error:', err))

//middleware
app.use(morgan("dev"))
app.use(cors({origin: true , credentials: true}))


//routes

app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)
app.use("/shipments", shipmentsRoutes)

//port
const port = 8080;

//listener

const server = app.listen(port, () => console.log(`Server is running on ${port}`));

