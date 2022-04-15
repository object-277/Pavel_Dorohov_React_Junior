import React, { PureComponent } from "react";
import { connect } from "react-redux";
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
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }));
    }

    render() {
        const { isClicked } = this.state;

        return ( 
            <CartIcon 
                { ...this.state }
                { ...this.props }
                isClicked={ isClicked } 
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
    }
}

export default connect(mapStateToProps)(CartIconContainer);