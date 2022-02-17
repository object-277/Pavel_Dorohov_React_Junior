import {
    createStore, combineReducers, applyMiddleware
} from 'redux';
import { logger } from 'redux-logger';
import { CartReducer } from '../redux/Cart';

const reducers = combineReducers({
    CartReducer
});

const middleWares = [logger];
const store = createStore(reducers, applyMiddleware(...middleWares));

export default store;