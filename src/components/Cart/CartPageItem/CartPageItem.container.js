import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addProductToCart, decreaseQuantity, getTotals, setProductAttribute } from "../../../redux/Cart/Cart.reducer";
import CartPageItem from "./CartPageItem.component";

class CartPageItemContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
        this.changeImgForwards = this.changeImgForwards.bind(this);
        this.changeImgBackwards = this.changeImgBackwards.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    };

    handleSetAttribute = (itemIn) => {
        const { productInCart, setProductAttribute, keyId } = this.props;   // keyId is used to determine the right product in productsInCart array  
        const { allAttributes } = productInCart;
        const attributeIndex = allAttributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
    
        const productId = (({ id }) => ({ id }))(productInCart);
        const attributeName = productInCart.attributes[attributeIndex].id;
        const allAttributeItems = productInCart.attributes[attributeIndex].items;
        const attributeObject = Object.assign({}, productId, { selectedAttribute: attributeName, allAttributeItems, itemIn, keyId });
       
       setProductAttribute(attributeObject);
    }

    changeImgForwards() {
        const { gallery } = this.props.productInCart
        let i = this.state.index;
        if ( i === gallery.length - 1 ) {
            i = 0;
        } else {
            i = i + 1;
        }
        this.setState({ index: i })
    }

    changeImgBackwards() {
        const { gallery } = this.props.productInCart;
        let i = this.state.index;
        if ( i === 0 ) {
            i = gallery.length - 1;
        } else {
            i = i - 1;
        }
        this.setState({ index: i })
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
            <CartPageItem 
                { ...this.state }
                { ...this.props }
                changeImgForwards = { this.changeImgForwards }
                changeImgBackwards = { this.changeImgBackwards }
                increaseQuantity={ this.handleIncrease }
                decreaseQuantity={ this.handleDecrease }
                setAttribute= { this.handleSetAttribute }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        productsInCart: state.cart.productsInCart,
        currency: state.cart.currency
        //itemAttributes: state.cart.itemAttributes
    }
}

const mapDispatchToProps = { addProductToCart, decreaseQuantity, getTotals, setProductAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(CartPageItemContainer);