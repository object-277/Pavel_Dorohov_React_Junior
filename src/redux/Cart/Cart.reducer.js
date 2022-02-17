import { ADD_ITEM } from '.';
import { productsQuery } from '../../query/products.query';
import { addItemToCart } from './Cart.utils';

export const initialState = {
    cart: []
};

export const CartReducer = (state = initialState, action) => {
    const { product } = action;
    
    switch (action.type) {
        
        case ADD_ITEM:
            return {cart: [...state.cart, product] };
            
        default:
            return state;
    }
};

export default CartReducer;