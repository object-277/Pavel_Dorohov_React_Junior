import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "./Cart/Cart.reducer";

export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

store.dispatch(getTotals());