import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from "redux"

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"
import productsReducer from "./Redux/Products/productsSlice.js"
import ordersReducer from "./Redux/Orders/ordersSlice.js"
import cartsReducer from "./Redux/Users/cartsSlice.js"
import wishlistReducer from "./Redux/Users/wishlistSlice.js"
import {BrowserRouter} from "react-router-dom"
// import usersReducer from "./Redux/Users/usersSlice.js"

const rootReducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
  carts: cartsReducer,
  wishlist: wishlistReducer
  // users: usersReducer
  // users: usersSlice,
  // reviews: reviewsSlice
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>


);
