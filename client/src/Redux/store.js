import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extensions";
import { productsReducer} from "./Products/productsSlice"
import { ordersReducer } from "./Orders/ordersSlice"
import {usersReducer } from "/Users/usersSlice"
// import { usersSlice} from "./Users/usersSlice"
// import { reviewsSlice} from "./Reviews/reviewsSlice"

const rootReducer = combineReducers({
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    // reviews: reviewsSlice
});


export default rootReducer;