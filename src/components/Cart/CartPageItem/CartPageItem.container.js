import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setItemInCart, decreaseQuantity } from "../../../redux/Cart/test.reducer";
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
    };

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPageItemContainer);