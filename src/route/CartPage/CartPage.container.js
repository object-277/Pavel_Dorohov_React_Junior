import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartPage from "./CartPage.component";

class CartPageContainer extends PureComponent {
   
    render() {
        return(
            <CartPage 
                { ...this.state }
                { ...this.props }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsInCart: state.cart.itemsInCart
    }
}

export default connect(mapStateToProps)(CartPageContainer);