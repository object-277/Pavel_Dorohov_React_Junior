import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Cart from "./Cart.component";

class CartContainer extends PureComponent {
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
            <Cart 
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
        itemsInCart: state.cart.itemsInCart,
        cartTotalQuantity: state.cart.cartTotalQuantity,
    }
}

export default connect(mapStateToProps)(CartContainer);