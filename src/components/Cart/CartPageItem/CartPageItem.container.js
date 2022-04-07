import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setItemInCart, decreaseQuantity, getTotals, setItemAttribute } from "../../../redux/Cart/Cart.reducer";
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
        const { itemInCart } = this.props;
        const { allAttributes } = this.props.itemInCart;
        const index2 = allAttributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = allAttributes[index2].items.findIndex((item) => (item === itemIn));
        console.log(index2);
        console.log(index3); 

        console.log(this.state);
        const { setItemAttribute } = this.props;
    
        const extract = (({ id, attributes}) => ({ id, attributes}))(itemInCart);
        const test = (({ id }) => ({ id }))(itemInCart);
        console.log(test);
       
           // extract.attributes[index2].items.filter((item) => item === itemIn);
           // console.log(extract);
       
        const attributeName = itemInCart.attributes[index2].id;
        const allAttributeItems = itemInCart.attributes[index2].items;
        const test2 = Object.assign({}, test, { selectedAttribute: attributeName, allAttributeItems, itemIn });
        console.log(test2);
       
       setItemAttribute(test2);
    }

    changeImgForwards() {
        const { gallery } = this.props.item;
        let i = this.state.index;
        if ( i === gallery.length - 1 ) {
            i = 0;
        } else {
            i = i + 1;
        }
        this.setState({ index: i })
    }

    changeImgBackwards() {
        const { gallery } = this.props.item;
        let i = this.state.index;
        if ( i === 0 ) {
            i = gallery.length - 1;
        } else {
            i = i - 1;
        }
        this.setState({ index: i })
    }

    handleIncrease = (productInCart) => {
        this.props.setItemInCart(productInCart);
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
        itemsInCart: state.cart.itemsInCart,
        currency: state.cart.currency,
        itemAttributes: state.cart.itemAttributes
    }
}

const mapDispatchToProps = { setItemInCart, decreaseQuantity, getTotals, setItemAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(CartPageItemContainer);