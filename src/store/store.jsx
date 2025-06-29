import { configureStore } from "@reduxjs/toolkit";
import  apiData  from './apidata/apiData'
import  productSlice  from "./cart/productSlice";


export const store = configureStore({
    reducer: {
        products : apiData,
        product : productSlice
    },
})