import React, { PureComponent } from "react";
import CartMenuContainer from "../CartMenu/CartMenu.container";
import cartIcon from "./Cart.svg";
import CartQuantityIcon from "./CartQuantity.svg";
import './CartIcon.style.scss';

class CartIcon extends PureComponent {

  renderCartQuantity() {
    const { cartTotalQuantity } = this.props;

    if (cartTotalQuantity > 0) {
      return (
        <div className="cartIcon-ShowQuantity">
          <img src={CartQuantityIcon} alt="Cart Quantity" />
          <p id="cartQuantityNumber">{cartTotalQuantity}</p>
        </div>
      );
    }
  }

  render() {
    const { onClick, isClicked, cartTotalQuantity } = this.props;
    const plpHeight = document.getElementById("root") !== null ? (document.getElementById("root").clientHeight - 80) : null;
  
    return (
      <>
        <div className="cartIcon" onClick={onClick}>
          <img src={cartIcon} alt="Shopping Cart" />
          {cartTotalQuantity > 0 && this.renderCartQuantity()}
        </div>
        {isClicked &&
          <>
            <div className="CartMenu-BackgroundOverlay" style={{height: (plpHeight)}} onClick={onClick}>
            </div>
            <CartMenuContainer
              {...this.state}
              cartMenuUnmounts={this.props.cartMenuUnmounts}
            />
          </>
        }
      </>
    );
  }
}

export default CartIcon;