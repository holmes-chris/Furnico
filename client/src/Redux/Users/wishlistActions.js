export const FETCH_WISHLIST_REQUEST = 'FETCH_WISHLIST_REQUEST'
export const FETCH_WISHLIST_SUCCESS = 'FETCH_WISHLIST_SUCCESS'
export const FETCH_WISHLIST_FAILURE = 'FETCH_WISHLIST_FAILURE'
export const TOGGLE_WISHLIST = 'TOGGLE_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'

export const fetchWishlistRequest = () => {
    return {
        type: FETCH_WISHLIST_REQUEST
    }
}

export const fetchWishlistSuccess = (products) => {
    return {
        type: FETCH_WISHLIST_SUCCESS,
        payload: products
    }
}

export const fetchWishlistFailure = (error) => {
    return {
        type: FETCH_WISHLIST_FAILURE,
        payload: error
    }
}

export const toggleWishlist = (id) => {
    return {
        type: TOGGLE_WISHLIST,
        payload: id
    }
}

export const removeFromWishlist = (id) => {
    return {
        type: REMOVE_FROM_WISHLIST,
        payload: id
    }
}



