import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchWishlistRequest: (state) => {
            state.loading = true;
            state.error = null
        },
        fetchWishlistSuccess: (state, action) => {
            state.products = action.payload
            state.loading = false;
            state.error = null;
            
        },
        fetchWishlistFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        toggleWishlist: (state, action) => {
            state.loading = false;
            state.error = false;
            if (state.wishlist.includes(action.payload)) {
                state.wishlist = state.wishlist.filter((id) => id !== action.payload)
            } else {
                state.wishlist.push(action.payload)
            }
        },
        removeFromWishlist: (state, action) => {
            state.loading = false;
            state.error = false;
            state.wishlist = state.wishlist.filter((id) => id !== action.payload)
        }
    }
})

export const {
    fetchWishlistRequest,
    fetchWishlistSuccess,
    fetchWishlistFailure,
    toggleWishlist,
    removeFromWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
