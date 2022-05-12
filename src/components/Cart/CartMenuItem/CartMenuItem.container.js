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
        const { productInCart } = this.props;
        const { allAttributes } = this.props.productInCart;
        const index2 = allAttributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = allAttributes[index2].items.findIndex((item) => (item === itemIn));
        console.log(index2);
        console.log(index3); 

        console.log(this.state);
        const { setProductAttribute } = this.props;
    
        const test = (({ id }) => ({ id }))(productInCart);
        console.log(test);
       
        const attributeName = productInCart.attributes[index2].id;
        const allAttributeItems = productInCart.attributes[index2].items;
        const test2 = Object.assign({}, test, { selectedAttribute: attributeName, allAttributeItems, itemIn });
        console.log(test2);
       
       setProductAttribute(test2);
    }    

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
        this.props.getTotals();
    };
    
    handleIncrease = (productInCart) => {
        this.props.addProductToCart(productInCart);
        this.props.getTotals();
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
        itemAttributes: state.cart.itemAttributes
    }
}

const mapDispatchToProps = { addProductToCart, decreaseQuantity, getTotals, setProductAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuItemContainer);