import React, { PureComponent } from "react";
import CartMenu from "./CartMenu.component";
import { connect } from "react-redux";
import { decreaseQuantity } from "../../../redux/Cart/test.reducer";

class CartMenuContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
    };
    
    render() {
        return (
            <CartMenu
                { ...this.state }
                { ...this.props }
                removeItem={ this.handleClick } 
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsInCart: state.cart.itemsInCart
    }
}

const mapDispatchToProps = { decreaseQuantity };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuContainer);