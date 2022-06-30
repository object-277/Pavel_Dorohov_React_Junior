import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartPage from "./CartPage.component";

class CartPageContainer extends PureComponent {

    render() {
        return (
            <CartPage
                {...this.state}
                {...this.props}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        productsInCart: state.cart.productsInCart,
        cartTotalQuantity: state.cart.cartTotalQuantity,
        cartTotalPrice: state.cart.cartTotalPrice,
        currency: state.cart.currency
    }
}

export default connect(mapStateToProps)(CartPageContainer);