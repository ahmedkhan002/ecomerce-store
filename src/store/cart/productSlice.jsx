import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    wishlistItems: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addtocart: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity += 1; // increase quantity if already in cart
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 }); // add new with quantity
            }
        },
        removefromcart: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1; // reduce quantity
                } else {
                    state.cartItems = state.cartItems.filter(i => i.id !== action.payload); // remove item
                }
            }
        },
        addtowishlist: (state, action) => {
            const exists = state.wishlistItems.find(i => i.id === action.payload.id);
            if (!exists) {
                state.wishlistItems.push(action.payload);
            }
        },
        removefromwishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(i => i.id !== action.payload);
        },
        increaseitemquantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) {
                if (item.quantity >= 1) {
                    item.quantity += 1; 
                } else {
                    state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
                }
            }
        },
        removeitemcompletely: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
    },
});

export const { addtocart, removefromcart, addtowishlist, removefromwishlist, increaseitemquantity, removeitemcompletely } = productSlice.actions;
export default productSlice.reducer;
