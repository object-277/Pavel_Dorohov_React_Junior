import React, { PureComponent } from "react";
import CartMenu from "./CartMenu.component";
import { connect } from "react-redux";
import { setItemInCart, decreaseQuantity, getTotals } from "../../../redux/Cart/test.reducer";

class CartMenuContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleDecrease = this.handleDecrease.bind(this);
        this.ref = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    };
    
    handleClickOutside = (event) => {
        const { current } = this.ref;
        if (current && !current.contains(event.target)) {
            this.props.onClickOutside() && this.props.onClickOutside();
        }
    };

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
        this.props.getTotals()
    };
    
    handleIncrease = (productInCart) => {
        this.props.setItemInCart(productInCart);
        this.props.getTotals()
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    render() {
        return (
            <CartMenu
                { ...this.state }
                { ...this.props }
                decreaseAmount={ this.handleDecrease }
                increaseAmount ={ this.handleIncrease }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsInCart: state.cart.itemsInCart,
        cartTotalQuantity: state.cart.cartTotalQuantity,
        cartTotalAmount: state.cart.cartTotalAmount
    }
}

const mapDispatchToProps = { setItemInCart, decreaseQuantity, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuContainer);