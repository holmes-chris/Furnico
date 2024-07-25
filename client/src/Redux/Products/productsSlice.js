//import { productActions } from "./productsActions.js"
// import {
//     FETCH_PRODUCTS_REQUEST,
//     FETCH_PRODUCTS_SUCCESS,
//     FETCH_PRODUCTS_FAILURE,
//   } from './productsActions';
import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchProductsRequest: (state) => {
            state.loading = true;
            state.error = null
        },
        fetchProductsSuccess: (state, action) => {
            state.products = action.payload
            state.loading = false;
            state.error = null;
            
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
