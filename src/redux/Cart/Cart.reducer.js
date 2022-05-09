import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        productsInCart: localStorage.getItem("cartProducts") 
        ? JSON.parse(localStorage.getItem("cartProducts")) 
        : [],
        cartTotalQuantity: 0,
        cartTotalPrice: 0,
        selectedCategory: localStorage.getItem("category"),
        currency: localStorage.getItem("currency"),
        itemAttributes: localStorage.getItem("selectedAttributes") 
        ? JSON.parse(localStorage.getItem("selectedAttributes")) 
        : [],
        productToCart: localStorage.getItem("productSetToCart") 
        ? JSON.parse(localStorage.getItem("productSetToCart")) 
        : []
    },
    reducers: {
        addProductToCart: (state, action) => {
            if (state.productToCart.length === 0) {
                const productIndex = state.productsInCart.findIndex(
                    (product) => JSON.stringify(product) === JSON.stringify(action.payload));
                if(productIndex >= 0) {
                    state.productsInCart[productIndex].cartQuantity += 1;
                } else {
                    const newProduct = { ...action.payload, cartQuantity: 1 };
                    state.productsInCart.push(newProduct);
                }
            } else {
                const ifAlreadyInCart= state.productsInCart.some((productInCart) => 
                JSON.stringify(productInCart.attributes) === JSON.stringify(action.payload.attributes) &&
                JSON.stringify(productInCart.id) === JSON.stringify(action.payload.id));
                const productIndex = state.productsInCart.findIndex(
                    (product) => JSON.stringify(product.attributes) === JSON.stringify(action.payload.attributes));
                    
                if(ifAlreadyInCart) {
                    state.productsInCart[productIndex].cartQuantity += 1;
                    state.productToCart = [];
                    localStorage.setItem("productSetToCart", "[]");
                } else {
                const newProduct = { ...action.payload, cartQuantity: 1 };
                state.productsInCart.push(newProduct);
                state.productToCart = [];
                localStorage.setItem("productSetToCart", "[]");
                }
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.productsInCart));
        },
        removeProductFromCart: (state, action) => {
            const stillInCart = state.productsInCart.filter(
                (productInCart) => JSON.stringify(productInCart) !== JSON.stringify(action.payload)
            );
            state.productsInCart = stillInCart;
            localStorage.setItem("cartProducts", JSON.stringify(state.productsInCart));
        },
        decreaseQuantity: (state, action) => {
            const productIndex = state.productsInCart.findIndex(
                productInCart => JSON.stringify(productInCart) === JSON.stringify(action.payload)
            )
            if(state.productsInCart[productIndex].cartQuantity > 1) {
                state.productsInCart[productIndex].cartQuantity -= 1
            } else if(state.productsInCart[productIndex].cartQuantity === 1) {
                const stillInCart = state.productsInCart.filter(
                    (productInCart) => JSON.stringify(productInCart) !== JSON.stringify(action.payload)
                );
                state.productsInCart = stillInCart;
            }    
            localStorage.setItem("cartProducts", JSON.stringify(state.productsInCart));
        },
        getTotals: (state, action) => {
            let { total, quantity } = state.productsInCart.reduce((cartTotal, productInCart) => {
                const { prices,  cartQuantity } = productInCart;
                const { currency } = state;
                const index = prices.findIndex((price) => (price.currency.symbol === currency));
                const itemTotal = (prices[index].amount * cartQuantity);
                cartTotal.total += (itemTotal);
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, 
            {
                total: 0,
                quantity: 0
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalPrice = total.toFixed(2);
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
            localStorage.setItem("category", action.payload);
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
            localStorage.setItem("currency", action.payload);
        },
        setProductAttribute: (state, action) => {
            const { productsInCart, itemAttributes } = state;
            const attributeIndex = 
                productsInCart.findIndex((productInCart) => (productInCart.id === action.payload.id)
                
            );
            const attributeIndex2 = productsInCart[attributeIndex].attributes.findIndex((attribute) =>
            (attribute.id === action.payload.selectedAttribute)
            );

            if ( productsInCart[attributeIndex].attributes[attributeIndex2].items.id === action.payload.itemIn.id) {
                 productsInCart[attributeIndex].attributes[attributeIndex2].items = action.payload.allAttributeItems;
            } else if (productsInCart[attributeIndex].attributes[attributeIndex2].id === action.payload.selectedAttribute &&
                        productsInCart[attributeIndex].id === action.payload.id
                ) 
                {
                    productsInCart[attributeIndex].attributes[attributeIndex2].items = action.payload.itemIn;
            } else {
                productsInCart[attributeIndex].attributes[attributeIndex2].items = productsInCart[attributeIndex].attributes[attributeIndex2].items.filter((productInCart) =>
            (productInCart.id === action.payload.itemIn.id));
            }
            localStorage.setItem("cartProducts", JSON.stringify(productsInCart));

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
                    const attributeIndex = productToCart[0].allAttributes.findIndex((attribute) =>
                (attribute.id === action.payload.selectedAttribute));
    
                    if (productToCart[0].productReadyToCart.attributes[attributeIndex].items.id === action.payload.itemIn.id) {
                        productToCart[0].productReadyToCart.attributes[attributeIndex].items = action.payload.allAttributes[attributeIndex].items;
                        delete productToCart[0].productReadyToCart.allAttributes;
                        if (JSON.stringify(state.productToCart[0].productReadyToCart) === JSON.stringify(state.productToCart[0].product)) {
                            state.productToCart = [];
                            localStorage.setItem("productSetToCart", "[]");
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

export const { addProductToCart, 
               removeProductFromCart, 
               decreaseQuantity, 
               getTotals, 
               setCategory, 
               setCurrency,
               setProductAttribute,
               setProductToCart,
            } = cartSlice.actions;

export default cartSlice.reducer;