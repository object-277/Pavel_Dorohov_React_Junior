import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "./Cart/test.reducer";

export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

store.dispatch(getTotals());
