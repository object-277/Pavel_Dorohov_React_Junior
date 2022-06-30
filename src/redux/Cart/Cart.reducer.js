import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: localStorage.getItem("products")
            ? JSON.parse(localStorage.getItem("products"))
            : [],
        productsInCart: localStorage.getItem("cartProducts")
            ? JSON.parse(localStorage.getItem("cartProducts"))
            : [],
        cartTotalQuantity: 0,
        cartTotalPrice: 0,
        currency: localStorage.getItem("currency")
            ? localStorage.getItem("currency")
            : '$',
        productToCart: localStorage.getItem("productSetToCart")
            ? JSON.parse(localStorage.getItem("productSetToCart"))
            : []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        addProductToCart: (state, action) => {
            /* if there's no product with selected options that is ready to be added to Cart (PDP),
               e.g. adding product using green Add to Cart Button on Product Card or
               increase/decrease quantity buttons */
            const { attributes, id } = action.payload;
            const ifAlreadyInCart = state.productsInCart.some((productInCart) =>
                JSON.stringify(productInCart.attributes) === JSON.stringify(attributes) &&
                JSON.stringify(productInCart.id) === JSON.stringify(id));
            if (state.productToCart.length === 0) {
                if (ifAlreadyInCart) {
                    const productIndex = state.productsInCart.findIndex(
                        (product) => JSON.stringify(product.attributes) === JSON.stringify(attributes));
                    state.productsInCart[productIndex].cartQuantity += 1;
                } else {
                    const { attributes } = action.payload;
                    let productIndex;
                    if (attributes.length === 0) {
                        productIndex = state.productsInCart.findIndex(
                            (product) => product.id === action.payload.id)
                    } else {
                        productIndex = state.productsInCart.findIndex(
                            (product) => JSON.stringify(product) === JSON.stringify(action.payload));
                    }
                    if (productIndex >= 0) {
                        state.productsInCart[productIndex].cartQuantity += 1;
                    } else {
                        const newProduct = { ...action.payload, cartQuantity: 1 };
                        state.productsInCart.push(newProduct);
                    }
                }
            } else {
                const { attributes } = action.payload;
                // adding product from PDP, with selected attributes
                const productIndex = state.productsInCart.findIndex(
                    (product) => JSON.stringify(product.attributes) === JSON.stringify(attributes));
                if (ifAlreadyInCart) {
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
            if (state.productsInCart[productIndex].cartQuantity > 1) {
                state.productsInCart[productIndex].cartQuantity -= 1
            } else if (state.productsInCart[productIndex].cartQuantity === 1) {
                const stillInCart = state.productsInCart.filter(
                    (productInCart) => JSON.stringify(productInCart) !== JSON.stringify(action.payload)
                );
                state.productsInCart = stillInCart;
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.productsInCart));
        },
        getTotals: (state) => {
            const { total, quantity } = state.productsInCart.reduce((cartTotal, productInCart) => {
                const { prices, cartQuantity } = productInCart;
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
        setCurrency: (state, action) => {
            state.currency = action.payload;
            localStorage.setItem("currency", action.payload);
        },
        setProductAttribute: (state, action) => {
            const { productsInCart } = state;
            const { keyId, itemIn, id, selectedAttribute } = action.payload;
            let productIndex = {};
            if (keyId !== null) {       // keyId is used to determine the right product in productsInCart array  
                productIndex = keyId;
            } else {
                productIndex = productsInCart.findIndex((productInCart) => (productInCart.id === id)
                );
            }
            const attributeIndex = productsInCart[productIndex].attributes.findIndex((attribute) =>
                (attribute.id === selectedAttribute)
            );
            if (productsInCart[productIndex].attributes[attributeIndex].id === selectedAttribute &&
                productsInCart[productIndex].id === id
            ) {
                productsInCart[productIndex].attributes[attributeIndex].items = itemIn;
            } else {
                productsInCart[productIndex].attributes[attributeIndex].items = productsInCart[productIndex].attributes[attributeIndex].items.filter((productInCart) =>
                    (productInCart.id === itemIn.id));
            }
            localStorage.setItem("cartProducts", JSON.stringify(productsInCart));
        },
        setProductToCart: (state, action) => {   // productToCart is product with selected attributes. productReadyToCart will be added to Cart from PDP  
            const { productToCart } = state;
            const { itemIn, attributeIndex } = action.payload;
            const product = action.payload.product;
            if (productToCart.id === product.id) {
                if (productToCart.length !== 0) {
                    const { productToCart } = state;
                    if (productToCart.attributes[attributeIndex].items.id === itemIn.id) {
                        productToCart.attributes[attributeIndex].items = product.allAttributes[attributeIndex].items;
                    } else if (productToCart.attributes[attributeIndex].items !== itemIn) {
                        productToCart.attributes[attributeIndex].items = itemIn;
                    } else {
                        productToCart.attributes[attributeIndex].items = productToCart.attributes[attributeIndex].items.filter((item) => item.id === itemIn.id);
                    }
                } else {
                    state.productToCart = product;
                }
            } else {
                state.productToCart = product;
            }
            localStorage.setItem("productSetToCart", JSON.stringify(state.productToCart));
        }
    }
});

export const { addProductToCart,
    removeProductFromCart,
    decreaseQuantity,
    getTotals,
    setCurrency,
    setProductAttribute,
    setProductToCart,
    setProducts
} = cartSlice.actions;

export default cartSlice.reducer;