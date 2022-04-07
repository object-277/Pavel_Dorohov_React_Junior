import { createSlice, current } from "@reduxjs/toolkit";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

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
        itemAttributes: localStorage.getItem("selectedAttributes") 
        ? JSON.parse(localStorage.getItem("selectedAttributes")) 
        : [],
        productToCart: localStorage.getItem("productSetToCart") 
        ? JSON.parse(localStorage.getItem("productSetToCart")) 
        : []
    },
    reducers: {
        setItemInCart: (state, action) => {
            if (state.productToCart.length === 0) {
                const itemIndex = state.itemsInCart.findIndex(
                    (product) => JSON.stringify(product) === JSON.stringify(action.payload));
                if(itemIndex >= 0) {
                    state.itemsInCart[itemIndex].cartQuantity += 1;
                } else {
                    const newProduct = { ...action.payload, cartQuantity: 1 };
                    state.itemsInCart.push(newProduct);
                }
            } else {
                const ifAlreadyInCart= state.itemsInCart.some((productInCart) => 
                JSON.stringify(productInCart.attributes) === JSON.stringify(action.payload.attributes) &&
                JSON.stringify(productInCart.id) === JSON.stringify(action.payload.id));
                const itemIndex = state.itemsInCart.findIndex(
                    (product) => JSON.stringify(product.attributes) === JSON.stringify(action.payload.attributes));
                    
                if(ifAlreadyInCart) {
                    state.itemsInCart[itemIndex].cartQuantity += 1;
                    state.productToCart = [];
                    localStorage.setItem("productSetToCart", "[]");
                } else {
                const newProduct = { ...action.payload, cartQuantity: 1 };
                state.itemsInCart.push(newProduct);
                state.productToCart = [];
                localStorage.setItem("productSetToCart", "[]");
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(state.itemsInCart));
        },
        removeItemInCart: (state, action) => {
            const stillInCart = state.itemsInCart.filter(
                (productInCart) => JSON.stringify(productInCart) !== JSON.stringify(action.payload)
            );
            state.itemsInCart = stillInCart;
            localStorage.setItem("cartItems", JSON.stringify(state.itemsInCart));
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.itemsInCart.findIndex(
                productInCart => JSON.stringify(productInCart) === JSON.stringify(action.payload)
            )
            if(state.itemsInCart[itemIndex].cartQuantity > 1) {
                state.itemsInCart[itemIndex].cartQuantity -= 1
            } else if(state.itemsInCart[itemIndex].cartQuantity === 1) {
                const stillInCart = state.itemsInCart.filter(
                    (productInCart) => JSON.stringify(productInCart) !== JSON.stringify(action.payload)
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
            const { itemsInCart, itemAttributes } = state;
            const attributeIndex = 
                itemsInCart.findIndex((productInCart) => (productInCart.id === action.payload.id)
                
            );
            const attributeIndex2 = itemsInCart[attributeIndex].attributes.findIndex((attribute) =>
            (attribute.id === action.payload.selectedAttribute)
            );

            if ( itemsInCart[attributeIndex].attributes[attributeIndex2].items.id === action.payload.itemIn.id) {
                 itemsInCart[attributeIndex].attributes[attributeIndex2].items = action.payload.allAttributeItems;
            } else if (itemsInCart[attributeIndex].attributes[attributeIndex2].id === action.payload.selectedAttribute &&
                        itemsInCart[attributeIndex].id === action.payload.id
                ) 
                {
                    itemsInCart[attributeIndex].attributes[attributeIndex2].items = action.payload.itemIn;
            } else {
                itemsInCart[attributeIndex].attributes[attributeIndex2].items = itemsInCart[attributeIndex].attributes[attributeIndex2].items.filter((productInCart) =>
            (productInCart.id === action.payload.itemIn.id));
            }
            localStorage.setItem("cartItems", JSON.stringify(itemsInCart));

            let ifAlreadyInState = itemAttributes.some((item) => JSON.stringify(item) === JSON.stringify(action.payload));
            let ifAlreadyInState2 = itemAttributes.some((item) => JSON.stringify(item.selectedAttribute) === JSON.stringify(action.payload.selectedAttribute));
            const needFindIndex = itemAttributes.findIndex((item) => (item.id === action.payload.id));
            if (ifAlreadyInState === true) {
                state.itemAttributes = itemAttributes.filter((item) => (item.itemIn.id !== action.payload.itemIn.id));
            } else if (itemAttributes[needFindIndex] !== undefined &&
                       itemAttributes[needFindIndex].id === action.payload.id && 
                       ifAlreadyInState2 === true) {
                itemAttributes[needFindIndex].itemIn = action.payload.itemIn;
            } else {
                itemAttributes.push(action.payload);
            }
            localStorage.setItem("selectedAttributes", JSON.stringify(itemAttributes));
        },
        setProductToCart: (state, action) => {
            const { productToCart } = state;
            const { itemIn } = action.payload;

            if (productToCart.length !== 0 && productToCart[0].productReadyToCart.id === action.payload.productReadyToCart.id) {
                    const attributeIndex = productToCart[0].productReadyToCart.allAttributes.findIndex((attribute) =>
                (attribute.id === action.payload.selectedAttribute));
    
                    if (productToCart[0].productReadyToCart.attributes[attributeIndex].items.id === action.payload.itemIn.id) {
                        productToCart[0].productReadyToCart.attributes[attributeIndex].items = action.payload.allAttributes[attributeIndex].items;
                        if (JSON.stringify(state.productToCart[0].productReadyToCart) === JSON.stringify(state.productToCart[0].product)) {
                            state.productToCart = [];
                        }
                    } else if (productToCart[0].productReadyToCart.attributes[attributeIndex].id === action.payload.selectedAttribute &&
                                productToCart[0].productReadyToCart.id === action.payload.productReadyToCart.id
                        ) 
                        {
                            productToCart[0].productReadyToCart.attributes[attributeIndex].items = itemIn;
                            productToCart[0].itemIn = itemIn;
                    } else {
                        productToCart[0].productReadyToCart.attributes[attributeIndex].items = productToCart[0].productReadyToCart.attributes[attributeIndex].items.filter((productInCart) =>
                    (productInCart.productReadyToCart.id === action.payload.itemIn.id));
                    }
                } else {
                    state.productToCart = productToCart.filter((product) => product.productReadyToCart.id === action.payload.productReadyToCart.id);
                    state.productToCart.push(action.payload);
                }
                localStorage.setItem("productSetToCart", JSON.stringify(state.productToCart));
        },
    }
});

export const { setItemInCart, 
               removeItemInCart, 
               decreaseQuantity, 
               getTotals, 
               setCategory, 
               setCurrency,
               setItemAttribute,
               setProductToCart,
            } = cartSlice.actions;

export default cartSlice.reducer;