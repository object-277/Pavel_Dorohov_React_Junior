export const addItemToCart = (cart,cartItemToAdd) => {
    const alreadyInCart = cart.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (alreadyInCart) {
        return cart.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cart, { ...cartItemToAdd, quantity: 1 }];
}