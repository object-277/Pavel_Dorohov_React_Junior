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
        const { productInCart } = this.props;
        const { allAttributes } = this.props.productInCart;
        const index2 = allAttributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = allAttributes[index2].items.findIndex((item) => (item === itemIn));
        console.log(index2);
        console.log(index3); 

        console.log(this.state);
        const { setProductAttribute } = this.props;
    
        const extract = (({ id, attributes}) => ({ id, attributes}))(productInCart);
        const test = (({ id }) => ({ id }))(productInCart);
        console.log(test);
       
           // extract.attributes[index2].items.filter((item) => item === itemIn);
           // console.log(extract);
       
        const attributeName = productInCart.attributes[index2].id;
        const allAttributeItems = productInCart.attributes[index2].items;
        const test2 = Object.assign({}, test, { selectedAttribute: attributeName, allAttributeItems, itemIn });
        console.log(test2);
       
       setProductAttribute(test2);
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
        this.props.addProductToCart(productInCart);
        this.props.getTotals();
    };

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
        this.props.getTotals();
    };

    render() {
        return(
            <CartPageItem 
                { ...this.state }
                { ...this.props }
                changeImgForwards = { this.changeImgForwards }
                changeImgBackwards = { this.changeImgBackwards }
                increaseAmount={ this.handleIncrease }
                decreaseAmount={ this.handleDecrease }
                setAttribute= { this.handleSetAttribute }
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPageItemContainer);