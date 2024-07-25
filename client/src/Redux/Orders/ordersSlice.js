import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice ({
    name: 'orders',
    initialState: {
        orders: [],
        recentOrder: null,
        loading: false,
        error: null
    },
    reducers: {
        fetchOrders: (state) => {
            state.loading = true;
            state.error = null
        },
        fetchOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload
            state.error = false;
        },
        fetchOrdersFailure: (state, action) => {
            state.loading = true;
            state.error = action.payload
        },
        createOrder: (state) => {
            state.loading = true;
            state.error = null;
        },
        postRecentOrder: (state, action) => {
            state.loading = false;
            state.error = false;
            state.recentOrder = action.payload
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.error = null
            state.orders.push(action.payload)
        },
        updateOrderStatus: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateOrderStatusSuccess: (state, action) => {
            const { orderId, status } = action.payload;
            const updatedOrders = state.orders.map((order) => {
                if (order.orderId === orderId) {
                    return {...order, status}
                }
                return order
            })
            
            return {
                ...state,
                orders: updatedOrders,
                loading: false,
                error: null
            }
        },
        updateOrderStatusFailure: (state, action) => {
            state.loading = false;
            state.error = {
                orderId: action.payload.orderId,
                error: action.payload.error
            }
        }
    }
})

export const {
    fetchOrders,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    createOrder,
    postRecentOrder,
    createOrderSuccess,
    createOrderFailure,
    cancelOrder,
    cancelOrderSuccess,
    cancelOrderFailure,
    updateOrder,
    updateOrderSuccess,
    updateOrderFailure
} = ordersSlice.actions

export default ordersSlice.reducer;