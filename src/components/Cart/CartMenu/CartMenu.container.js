import React, { PureComponent } from "react";
import CartMenu from "./CartMenu.component";
import { connect } from "react-redux";
import { addProductToCart, decreaseQuantity, getTotals, setProductAttribute } from "../../../redux/Cart/Cart.reducer";

class CartMenuContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            notClicked: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    };

    handleClick(e) {
        this.setState(prevState => ({
            notClicked: !prevState.notClicked
        }));
    }

    handleIncrease = (productInCart) => {
        const { addProductToCart, getTotals } = this.props;
        addProductToCart(productInCart);
        getTotals();
    };

    handleDecrease = (productInCart) => {
        const { decreaseQuantity, getTotals } = this.props;
        decreaseQuantity(productInCart);
        getTotals();
    };

    componentWillUnmount() {
        this.setState({notClicked: true});
    }

    render() {
        const { notClicked } = this.state;
        if ( notClicked === true ) {
            return ( 
                <CartMenu
                    { ...this.state }
                    { ...this.props }
                    changeClickedState = { this.handleClick }
                    decreaseQuantity={ this.handleDecrease }
                    increaseQuantity ={ this.handleIncrease }
                    setAttribute= { this.handleSetAttribute }
                /> 
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        productsInCart: state.cart.productsInCart,
        cartTotalQuantity: state.cart.cartTotalQuantity,
        cartTotalPrice: state.cart.cartTotalPrice,
        currency: state.cart.currency,
    }
}

const mapDispatchToProps = { addProductToCart, decreaseQuantity, getTotals, setProductAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuContainer);