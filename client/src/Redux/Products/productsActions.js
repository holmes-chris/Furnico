export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const ADD_PRODUCT_STOCK = 'ADD_PRODUCT_STOCK'
export const ADD_PRODUCT_STOCK_SUCCESS = 'ADD_PRODUCT_STOCK_SUCCESS'
export const ADD_PRODUCT_STOCK_FAILURE = 'ADD_PRODUCT_STOCK_FAILURE'

export const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    }
}

export const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
}

export const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error
    }
}

export const addProductStock = () => {
    return {
        type: ADD_PRODUCT_STOCK
    }
}

export const addProductStockSuccess = (productId, quantity) => {
    return {
        type: ADD_PRODUCT_STOCK_SUCCESS,
        payload: {
            productId: productId,
            quantity: quantity
        }
    }
}

export const addProductStockFailure = (error) => {
    return {
        type: ADD_PRODUCT_STOCK_FAILURE,
        payload: error
    }
}

