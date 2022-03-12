import React, { PureComponent } from "react";
import CartMenu from "./CartMenu.component";
import { connect } from "react-redux";
import { setItemInCart, decreaseQuantity, getTotals } from "../../../redux/Cart/Cart.reducer";

class CartMenuContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            notClicked: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
        //this.handleClickOutside = this.handleClickOutside.bind(this);
    };

    handleClick(e) {
        this.setState(prevState => ({
            notClicked: !prevState.notClicked
        }));
    }
    
    /*handleClickOutside = (event) => {
        const { current } = this.ref;
        if (current && !current.contains(event.target)) {
            this.props.onClickOutside() && this.props.onClickOutside();
        }
    };*/

    handleDecrease = (productInCart) => {
        this.props.decreaseQuantity(productInCart);
        this.props.getTotals();
    };
    
    handleIncrease = (productInCart) => {
        this.props.setItemInCart(productInCart);
        this.props.getTotals();
    };

    /*componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }*/

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
                    decreaseAmount={ this.handleDecrease }
                    increaseAmount ={ this.handleIncrease }
                /> 
            );
        } else {
            return null;
        }
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