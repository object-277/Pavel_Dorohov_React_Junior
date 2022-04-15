import React, { PureComponent } from "react";
import CartMenu from "./CartMenu.component";
import { connect } from "react-redux";
import { addProductToCart, decreaseQuantity, getTotals } from "../../../redux/Cart/Cart.reducer";

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

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
        this.props.getTotals();
    };
    
    handleIncrease = (productInCart) => {
        this.props.addProductToCart(productInCart);
        this.props.getTotals();
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
        currency: state.cart.currency
    }
}

const mapDispatchToProps = { addProductToCart, decreaseQuantity, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuContainer);