import React, { PureComponent } from "react";
import CartMenuContainer from "./CartMenu/CartMenu.container";
import CartIcon from "./Cart.svg";
import CartQuantityIcon from "./CartQuantity.svg";  

class Cart extends PureComponent {

  renderCartQuantity() {
    const { cartTotalQuantity } = this.props;
    let showQuantity = "";

    if (cartTotalQuantity > 0) {
      return showQuantity = <div className="cartIcon-ShowQuantity">
                              <img src={ CartQuantityIcon } alt="Cart Quantity" />
                              <p id="cartQuantityNumber">{ cartTotalQuantity }</p>
                            </div>
    }
  }
 
  render() {
    const { onClick, isClicked, cartTotalQuantity } = this.props;

    return (
        <div className="cartIcon" onClick={ onClick }>
            <img src={ CartIcon } alt="Shopping Cart" />
            { cartTotalQuantity > 0 && this.renderCartQuantity() }
            { isClicked && 
              <CartMenuContainer 
              { ...this.state } 
              { ...this.props }
              onClickOutside={ () => isClicked === false }
              /> 
            }
        </div>
    );
  } 

}

export default Cart;