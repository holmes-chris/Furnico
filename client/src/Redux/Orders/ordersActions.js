export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const CREATE_ORDER = 'CREATE_ORDER';
export const POST_RECENT_ORDER = 'POST_RECENT_ORDER'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER_FAILURE = 'CANCEL_ORDER_FAILURE';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_FAILURE = 'UPDATE_ORDER_STATUS_FAILURE';

export const fetchOrders = () => {
    return {
        type: FETCH_ORDERS
    }
}

export const fetchOrdersSuccess = (order) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: order
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: FETCH_ORDERS_FAILURE,
        payload: error
    }
}

export const createOrder = (order) => {
    return {
        type: CREATE_ORDER,
        payload: order
    }
}

export const postRecentOrder = (order) => {
    return {
        type: POST_RECENT_ORDER,
        payload: order
    }
}

export const createOrderSuccess = (order) => {
    return {
        type: CREATE_ORDER_SUCCESS,
        payload: order
    }
}

export const createOrderFailure = (cartId, error) => {
    return {
        type: CREATE_ORDER_FAILURE,
        payload: {
            cartId: cartId,
            error: error
        }
    }
}

export const cancelOrder = (orderId) => {
    return {
        type: CANCEL_ORDER,
        payload: orderId
    }
}

export const cancelOrderSuccess = (orderId) => {
    return {
        type: CANCEL_ORDER_SUCCESS,
        payload: orderId
    }
}

export const cancelOrderFailure = (orderId, error) => {
    return {
        type: CANCEL_ORDER_FAILURE,
        payload: {
            orderId: orderId,
            error: error
        }
    }
}

export const updateOrderStatus = () => {
    return {
        type: UPDATE_ORDER_STATUS,
    }
}

export const updateOrderStatusSuccess = (orderId, status) => {
    return {
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: {
            orderId: orderId,
            status: status
        }
    }
}

export const updateOrderStatusFailure = (orderId, error) => {
    return {
        type: UPDATE_ORDER_STATUS_FAILURE,
        payload: {
            orderId: orderId,
            error: error
        }
    }
}

// export const orderActions = {
//     FETCH_ORDERS: 'FETCH_ORDERS',
//     FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
//     FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_FAILURE',
//     CREATE_ORDER: 'CREATE_ORDER',
//     CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
//     CREATE_ORDER_FAILURE: 'CREATE_ORDER_FAILURE',
//     CANCEL_ORDER: 'CANCEL_ORDER',
//     CANCEL_ORDER_SUCCESS: 'CANCEL_ORDER_SUCCESS',
//     CANCEL_ORDER_FAILURE: 'CANCEL_ORDER_FAILURE',
//     UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
//     UPDATE_ORDER_STATUS_SUCCESS: 'UPDATE_ORDER_STATUS_SUCCESS',
//     UPDATE_ORDER_STATUS_FAILURE: 'UPDATE_ORDER_STATUS_FAILURE'
// }

