import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   products: [],
   loading: false,
   error: null,

}

export const fetchallproducts = createAsyncThunk(
    'products/fetchallproducts',
    async() => {
        const response = await axios.get('https://dummyjson.com/products')
        return  response.data.products;
    }
)
export const fetchByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async(productType) => {
        const response = await axios.get(`https://dummyjson.com/products/category/${productType}`)
        return response.data.products;
    }
)
export const fetchByID = createAsyncThunk(
    'products/fetchByID',
    async(productType) => {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        return response.data.products;
    }
)


export const apiData = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchallproducts.pending, (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(fetchallproducts.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message;
        })
        .addCase(fetchallproducts.fulfilled, (state,action) => {
            state.loading = false,
            state.products = action.payload;
        }),
        builder
        .addCase(fetchByCategory.pending, (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(fetchByCategory.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message;
        })
        .addCase(fetchByCategory.fulfilled, (state, action) => {
            state.loading = false,
            state.products = action.payload;
        }),
        builder
        .addCase(fetchByID.pending, (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(fetchByID.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message;
        })
        .addCase(fetchByID.fulfilled, (state, action) => {
            state.loading = false,
            state.products = action.payload;
        })
    }
})


export default apiData.reducer
