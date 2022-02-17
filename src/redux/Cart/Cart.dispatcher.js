import { addItem } from './Cart.actions';

export class CartDispatcher {
    
    addItem(dispatch, product) {
    const { cart } = product;
    dispatch(addItem(cart));
    }
}

export default new CartDispatcher();