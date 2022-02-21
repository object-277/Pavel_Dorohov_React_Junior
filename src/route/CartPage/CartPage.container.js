import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setItemInCart, decreaseQuantity } from "../../redux/Cart/test.reducer";
import CartPage from "./CartPage.component";

class CartPageContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    };

    handleIncrease = (productInCart) => {
        this.props.setItemInCart(productInCart);
    };

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
    };

    render() {
        return(
            <CartPage 
                { ...this.state }
                { ...this.props }
                increaseAmount={ this.handleIncrease }
                decreaseAmount={ this.handleDecrease }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsInCart: state.cart.itemsInCart
    }
}

const mapDispatchToProps = { setItemInCart, decreaseQuantity };

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);