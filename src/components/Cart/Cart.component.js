import React, { PureComponent } from "react";
import CartMenuContainer from "./CartMenu/CartMenu.container";
import CartIcon from "./Cart.svg"; 

class Cart extends PureComponent {
 
  render() {
    const { onClick, isClicked } = this.props;

    return (
        <div className="cartIcon">
            <img src={ CartIcon } alt="Shopping Cart" onClick={ onClick } />
            { isClicked && <CartMenuContainer { ...this.state } { ...this.props } />}
        </div>
    );
  } 

}

export default Cart;