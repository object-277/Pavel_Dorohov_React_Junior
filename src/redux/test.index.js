import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/test.reducer";

export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

