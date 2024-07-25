export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST'
export const FETCH_CHECKOUT_CART_SUCCESS = 'FETCH_CHECKOUT__CART_SUCCESS'
export const FETCH_CHECKOUT_CART_FAILURE = 'FETCH_CHECKOUT_CART_FAILURE'
export const ADD_TO_CHECKOUT_CART = 'ADD_TO_CHECKOUT_CART'
export const SUBTRACT_FROM_CHECKOUT_CART = 'SUBTRACT_FROM_CHECKOUT_CART'
export const REMOVE_FROM_CHECKOUT_CART = 'REMOVE_FROM_CHECKOUT_CART'
export const UPDATE_CHECKOUT_CART = 'UPDATE_CHECKOUT_CART'
export const CLEAR_CHECKOUT_CART = "CLEAR_CHECKOUT_CART"

export const FETCH_SHIPPING_CART_SUCCESS = 'FETCH_SHIPPING__CART_SUCCESS'
export const FETCH_SHIPPING_CART_FAILURE = 'FETCH_SHIPPING_CART_FAILURE'
export const ADD_TO_SHIPPING_CART = 'ADD_TO_SHIPPING_CART'
export const REMOVE_FROM_SHIPPING_CART = "REMOVE_FROM_SHIPPING_CART"
export const UPDATE_SHIPPING_CART = 'UPDATE_SHIPPING_CART'
export const UPDATE_SHIPPING_ORDER = 'UPDATE_SHIPPING_ORDER'
export const CLEAR_SHIPPING_CART = "CLEAR_SHIPPING_CART"



export const fetchCartRequest = () => {
    return {
        type: FETCH_CART_REQUEST
    }
}

//-------------------------CHECKOUT CART----------------------------

export const fetchCheckoutCartSuccess = (products) => {
    return {
        type: FETCH_CHECKOUT_CART_SUCCESS,
        payload: products
    }
}

export const fetchCheckoutCartFailure = (error) => {
    return {
        type: FETCH_CHECKOUT_CART_FAILURE,
        payload: error
    }
}

export const addToCheckoutCart = (item) => {
    return {
        type: ADD_TO_CHECKOUT_CART,
        payload: item
    }
}

export const subtractFromCheckoutCart = (id) => {
    return {
        type: SUBTRACT_FROM_CHECKOUT_CART,
        payload: id
    }
}

export const removeFromCheckoutCart = (id) => {
    return {
        type: REMOVE_FROM_CHECKOUT_CART,
        payload: id
    }
}

export const updateCheckoutCart = (cart) => {
    return {
        type: UPDATE_CHECKOUT_CART,
        payload: cart
    }
}

export const clearCheckoutCart = () => {
    return {
        type: CLEAR_CHECKOUT_CART
    }
}


//-------------------------SHIPPING CART----------------------------

export const fetchShippingCartSuccess = (products) => {
    return {
        type: FETCH_SHIPPING_CART_SUCCESS,
        payload: products
    }
}


export const fetchShippingCartFailure = (error) => {
    return {
        type: FETCH_SHIPPING_CART_FAILURE,
        payload: error
    }
}

export const addToShippingCart = (item) => {
    return {
        type: ADD_TO_SHIPPING_CART,
        payload: item
    }
}

export const removeFromShippingCart = (id) => {
    return {
        type: REMOVE_FROM_SHIPPING_CART,
        payload: id
    }
}

export const updateShippingCart = (cart) => {
    return {
        type: UPDATE_SHIPPING_CART,
        payload: cart
    }
}

export const clearShippingCart = () => {
    return {
        type: CLEAR_SHIPPING_CART,
    }
}





