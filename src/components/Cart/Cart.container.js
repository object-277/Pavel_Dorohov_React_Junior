import React, { PureComponent } from "react";
import { CartIcon } from "./Cart.svg"; 

class Cart extends PureComponent {
 
  render() {

    return (
        <div>
            <img src={ CartIcon } alt="Shopping Cart" />
        </div>
    );
  } 

}

export default Cart;