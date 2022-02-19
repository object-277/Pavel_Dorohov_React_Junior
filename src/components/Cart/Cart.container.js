import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Cart from "./Cart.component";

class CartContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
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
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsInCart: state.cart.itemsInCart
    }
}

export default connect(mapStateToProps)(CartContainer);