import React, { PureComponent } from "react";
import CartMenu from "./CartMenu.component";
import { connect } from "react-redux";
import { setItemInCart, decreaseQuantity, getTotals } from "../../../redux/Cart/test.reducer";

class CartMenuContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleDecrease = this.handleDecrease.bind(this);
    };

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
        this.props.getTotals()
    };
    
    handleIncrease = (productInCart) => {
        this.props.setItemInCart(productInCart);
        this.props.getTotals()
    };

    render() {
        return (
            <CartMenu
                { ...this.state }
                { ...this.props }
                decreaseAmount={ this.handleDecrease }
                increaseAmount ={ this.handleIncrease }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsInCart: state.cart.itemsInCart,
        cartTotalQuantity: state.cart.cartTotalQuantity,
        cartTotalAmount: state.cart.cartTotalAmount
    }
}

const mapDispatchToProps = { setItemInCart, decreaseQuantity, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuContainer);