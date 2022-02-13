import CartActionTypes from "./cart.types";

export const addItem = product => ({
    type: CartActionTypes.ADD_ITEM,
    payload: product
});