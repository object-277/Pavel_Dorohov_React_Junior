import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsInCart: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [],
        cartTotalQuantity: 0,
        cartTotalAmount: [],
        Category: localStorage.getItem("category"),
        currency: localStorage.getItem("currency"),
        itemAttributes: []
    },
    reducers: {
        setItemInCart: (state, action) => {
            const itemIndex = state.itemsInCart.findIndex(
                (product) => product.id === action.payload.id
            ); 
            if(itemIndex >= 0) {
                state.itemsInCart[itemIndex].cartQuantity += 1;
            } else {
                const newProduct = { ...action.payload, cartQuantity: 1 };
                state.itemsInCart.push(newProduct);
            }
            
            localStorage.setItem("cartItems", JSON.stringify(state.itemsInCart));
        },
        removeItemInCart: (state, action) => {
            const stillInCart = state.itemsInCart.filter(
                (productInCart) => productInCart.id !== action.payload.id
            );
            state.itemsInCart = stillInCart;
            localStorage.setItem("cartItems", JSON.stringify(state.itemsInCart));
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.itemsInCart.findIndex(
                productInCart => productInCart.id === action.payload.id
            )
            if(state.itemsInCart[itemIndex].cartQuantity > 1) {
                state.itemsInCart[itemIndex].cartQuantity -= 1
            } else if(state.itemsInCart[itemIndex].cartQuantity === 1) {
                const stillInCart = state.itemsInCart.filter(
                    (productInCart) => productInCart.id !== action.payload.id
                );
                state.itemsInCart = stillInCart;
            }    
            localStorage.setItem("cartItems", JSON.stringify(state.itemsInCart));
        },
        getTotals: (state, action) => {
            let { total, quantity } = state.itemsInCart.reduce((cartTotal, productInCart) => {
                const { prices,  cartQuantity } = productInCart;
                const { currency } = state;
                const index = prices.findIndex((price) => (price.currency.symbol === currency));
                const itemTotal = parseFloat((prices[index].amount * cartQuantity).toFixed(2));
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, 
            {
                total: 0,
                quantity: 0
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        setCategory: (state, action) => {
            state.Category = action.payload;
            localStorage.setItem("category", action.payload);
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
            localStorage.setItem("currency", action.payload);
        },
        setItemAttribute: (state, action) => {
            
            const attributeIndex = 
                state.itemsInCart.findIndex((productInCart) => (productInCart.id === action.payload.id)
                
            );
            const attributeIndex2 = state.itemsInCart[attributeIndex].attributes.findIndex((attribute) =>
            (attribute.id === action.payload.selectedAttribute)
            );

            if (state.itemsInCart[attributeIndex].attributes[attributeIndex2].items.id === action.payload.itemIn.id) {
                state.itemsInCart[attributeIndex].attributes[attributeIndex2].items = action.payload.allAttributeItems;
            } else if (state.itemsInCart[attributeIndex].attributes[attributeIndex2].id === action.payload.selectedAttribute &&
                        state.itemsInCart[attributeIndex].id === action.payload.id
                ) 
                {
                    state.itemsInCart[attributeIndex].attributes[attributeIndex2].items = action.payload.itemIn;
            } else {
                state.itemsInCart[attributeIndex].attributes[attributeIndex2].items = state.itemsInCart[attributeIndex].attributes[attributeIndex2].items.filter((productInCart) =>
            (productInCart.id === action.payload.itemIn.id));
            }
            localStorage.setItem("cartItems", JSON.stringify(state.itemsInCart));

        }
    }
});

export const { setItemInCart, 
               removeItemInCart, 
               decreaseQuantity, 
               getTotals, 
               setCategory, 
               setCurrency,
               setItemAttribute 
            } = cartSlice.actions;

export default cartSlice.reducer;