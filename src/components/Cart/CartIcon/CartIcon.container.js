import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setCartMenu } from "../../../redux/Cart/Cart.reducer";
import CartIcon from "./CartIcon.component";

class CartIconContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isClicked: false
        };
        this.cartMenuUnmounts = this.cartMenuUnmounts.bind(this);
        this.handleClick = this.handleClick.bind(this);
        }

    cartMenuUnmounts() {
       this.setState({isClicked: false});
    }   

   handleClick(e) {
        e.preventDefault();
        const { setCartMenu } = this.props;
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }), () => setCartMenu(this.state.isClicked));
       // setBackdrop();
    }

    render() {

        return ( 
            <CartIcon 
                { ...this.state }
                { ...this.props }
                onClick={ this.handleClick }
                cartMenuUnmounts = { this.cartMenuUnmounts }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        productsInCart: state.cart.productsInCart,
        cartTotalQuantity: state.cart.cartTotalQuantity,
        cartMenuActive: state.cart.cartMenuActive
    }
}

const mapDispatchToProps = { setCartMenu };

export default connect(mapStateToProps, mapDispatchToProps)(CartIconContainer);