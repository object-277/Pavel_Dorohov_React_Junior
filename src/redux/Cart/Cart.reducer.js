import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
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
        addProductToCart: (state, action) => {
            const { name, attributes, id } = action.payload;
            /* if there's no product with selected options that is ready to be added to Cart (PDP),
               e.g. adding product using green Add to Cart Button on Product Card or
               increase/decrease quantity buttons */ 
            if (state.productToCart.length === 0) {                                           
                const productIndex = state.productsInCart.findIndex(                         
                    (product) => JSON.stringify(product) === JSON.stringify(action.payload));
                if(productIndex >= 0) {
                    state.productsInCart[productIndex].cartQuantity += 1;
                   
                } else {
                    const newProduct = { ...action.payload, cartQuantity: 1 };
                    state.productsInCart.push(newProduct);
                    toast.success(`${name} added to cart`, {
                        position: "bottom-right"
                    });
                }
            } else {                      
                // adding product from PDP, with selected attributes
                const ifAlreadyInCart= state.productsInCart.some((productInCart) => 
                JSON.stringify(productInCart.attributes) === JSON.stringify(attributes) &&
                JSON.stringify(productInCart.id) === JSON.stringify(id));
                const productIndex = state.productsInCart.findIndex(
                    (product) => JSON.stringify(product.attributes) === JSON.stringify(attributes));
                    
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
                toast.success(`${name} added to cart`, {
                    position: "bottom-right"
                });
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
        getTotals: (state) => {
            const { total, quantity } = state.productsInCart.reduce((cartTotal, productInCart) => {
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
        setCurrency: (state, action) => {
            state.currency = action.payload;
            localStorage.setItem("currency", action.payload);
        },
        setProductAttribute: (state, action) => {
            const { productsInCart } = state;
            const { keyId, itemIn, id, allAttributeItems, selectedAttribute } = action.payload;
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
                    ) 
            {
                productsInCart[productIndex].attributes[attributeIndex].items = itemIn;
            } else {
                productsInCart[productIndex].attributes[attributeIndex].items = productsInCart[productIndex].attributes[attributeIndex].items.filter((productInCart) =>
            (productInCart.id === itemIn.id));
            }
            localStorage.setItem("cartProducts", JSON.stringify(productsInCart));
        },
        setProductToCart: (state, action) => {   // productToCart is product with selected attributes. productReadyToCart will be added to Cart from PDP  
            const { productToCart } = state;
            const { itemIn, productReadyToCart, selectedAttribute, product } = action.payload;
            if (productToCart.length !== 0 && productToCart[0].productReadyToCart.id === productReadyToCart.id) {
                const attributeIndex = product.attributes.findIndex((attribute) =>
                (attribute.id === selectedAttribute));
                    if (productToCart[0].productReadyToCart.attributes[attributeIndex].items.id === itemIn.id) {  
                        // if client clicks on the already selected attribute  
                        productToCart[0].productReadyToCart.attributes[attributeIndex].items = product.attributes[attributeIndex].items;
                        delete productToCart[0].productReadyToCart.allAttributes;
                        if (JSON.stringify(state.productToCart[0].productReadyToCart) === JSON.stringify(state.productToCart[0].product)) {
                            // if user deselects all product attributes, then productSetToCart in the localStorage is cleared 
                            state.productToCart = [];
                            localStorage.setItem("productSetToCart", "[]");
                        }
                    } else if (productToCart[0].productReadyToCart.attributes[attributeIndex].id === selectedAttribute &&
                                productToCart[0].productReadyToCart.id === productReadyToCart.id
                        ) // if client clicks on different item in attribute
                        {
                            productToCart[0].productReadyToCart.attributes[attributeIndex].items = itemIn;
                            productToCart[0].itemIn = itemIn;
                    } else {
                        productToCart[0].productReadyToCart.attributes[attributeIndex].items = 
                        productToCart[0].productReadyToCart.attributes[attributeIndex].items.filter((productInCart) =>
                        (productInCart.productReadyToCart.id === itemIn.id));
                    }
                } else {
                    /* if client goes to different product's page and selects that product's attributes, but previous 
                        product still is in the localStorage, then previous product is filtered from localStorage array  */
                    state.productToCart.push(action.payload);
                    state.productToCart = productToCart.filter((product) => product.productReadyToCart.id === productReadyToCart.id);
                }
                localStorage.setItem("productSetToCart", JSON.stringify(state.productToCart));
        },
    }
});

export const { addProductToCart, 
               removeProductFromCart, 
               decreaseQuantity, 
               getTotals,  
               setCurrency,
               setProductAttribute,
               setProductToCart,
            } = cartSlice.actions;

export default cartSlice.reducer;