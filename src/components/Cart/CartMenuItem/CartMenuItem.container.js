import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addProductToCart, decreaseQuantity, getTotals, setProductAttribute } from "../../../redux/Cart/Cart.reducer";
import CartMenuItem from "./CartMenuItem.component";

class CartMenuItemContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    };

    handleSetAttribute = (itemIn) => {
        const { productInCart, setProductAttribute, keyId } = this.props;
        const { allAttributes } = productInCart;
        const attributeIndex = allAttributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const productId = (({ id }) => ({ id }))(productInCart);
        const attributeName = productInCart.attributes[attributeIndex].id;
        const allAttributeItems = productInCart.attributes[attributeIndex].items;
        const attributeObject = Object.assign({}, productId, { selectedAttribute: attributeName, allAttributeItems, itemIn, keyId });

       setProductAttribute(attributeObject);
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

    render() {
        return(
            <CartMenuItem 
                { ...this.state }
                { ...this.props }
                increaseQuantity={ this.handleIncrease }
                decreaseQuantity={ this.handleDecrease }
                setAttribute={ this.handleSetAttribute }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        productsInCart: state.cart.productsInCart,
        currency: state.cart.currency,
    }
}

const mapDispatchToProps = { addProductToCart, decreaseQuantity, getTotals, setProductAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuItemContainer);