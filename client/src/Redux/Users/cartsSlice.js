//fetchCheckoutCart
//fetchShippingCart
import { createSlice } from '@reduxjs/toolkit'

export const cartsSlice = createSlice({
    name: 'cart',
    initialState: {
        checkoutCart: [],
        checkoutOrder: [],
        shippingCart: [],
        shippingOrder: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchCartRequest: (state) => {
            state.loading = true;
            state.error = null
        },
        //------------------------CHECKOUT CART------------------------
        fetchCheckoutCartSuccess: (state, action) => {
            state.checkoutCart = action.payload
            console.log('fetched this: ', state.checkoutCart)
            state.loading = false;
            state.error = null;
            
        },
        fetchCheckoutCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },     
        
        addToCheckoutCart: (state, action) => {
            state.error = false;
            state.loading = false;
            const existingItem = state.checkoutCart.find((item) => item.productId === action.payload.productId)
            if (existingItem) {
                existingItem.quantity += action.payload.quantity
            } else {
                state.checkoutCart.push({...action.payload})
            }
        },

        subtractFromCheckoutCart: (state, action) => {
            state.error = false;
            state.loading = false;
            const index = state.checkoutCart.findIndex((item) => item.product_id === action.payload.product_id);
            if (index !== -1) {
                if (state.checkoutCart[index].quantity > 0) {
                    state.checkoutCart[index].quantity -= 1;
                } else {
                    state.checkoutCart.splice(index, 1);
                }
            }

        },
        removeFromCheckoutCart: (state, action) => {
            state.error = false;
            state.loading = false;
            const index = state.checkoutCart.findIndex((item) => item.product_id === action.payload.product_id);
            state.checkoutCart.splice(index, 1);
        },
        updateOrderCart: (state, action) => {
            state.error = false;
            state.loading = false;
            state.checkoutOrder = action.payload;
        },
        clearCheckoutCart: (state, action) => {
            state.error = false;
            state.loading = false;
            state.checkoutCart = []
        },


        //------------------------SHIPPING CART------------------------
        fetchShippingCartSuccess: (state, action) => {
            state.shippingCart = action.payload
            state.loading = false;
            state.error = null;
            
        },
        fetchShippingCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        addToShippingCart: (state, action) => {
            state.error = false;
            state.loading = false;
            const existingItem = state.shippingCart.find((item) => item.productId === action.payload.productId)
            if (existingItem) {
                existingItem.orderQuantity += action.payload.orderQuantity
            } else {
                state.shippingCart.push({...action.payload})
                console.log('payload: ', action.payload)
            }
        },
        removeFromShippingCart: (state, action) => {
            state.error = false;
            state.loading = false;
            console.log('pay:', action.payload)
            const index = state.shippingCart.findIndex((item) => item.productId === action.payload);
            if (index !== -1) {
                state.shippingCart.splice(index, 1);
            }

        },
        updateShippingCart: (state, action) => {
            const { productId, quantity } = action.payload;
            const product = state.shippingCart.find((item) => item.productId === productId);
            if (product) {
              product.orderQuantity = quantity;
            }
        },
        updateShippingOrder: (state, action) => {
            state.error = false;
            state.loading = false;
            state.shippingOrder = action.payload

        },
        clearShippingCart: (state, action) => {
            state.error = false;
            state.loading = false;
            state.shippingCart = []

        },

    }
})

export const {
    fetchCartRequest,
    fetchCheckoutCartSuccess,
    fetchCheckoutCartFailure,
    addToCheckoutCart,
    subtractFromCheckoutCart,
    removeFromCheckoutCart,
    updateOrderCart,
    clearCheckoutCart,
//-------------------------------
    fetchShippingCartSuccess,
    fetchShippingCartFailure,
    addToShippingCart,
    removeFromShippingCart,
    updateShippingCart,
    updateShippingOrder,
    clearShippingCart
} = cartsSlice.actions;

export default cartsSlice.reducer
