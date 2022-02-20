import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./CartMenu.style.scss";

class CartMenu extends PureComponent {

  renderCartItem(item, i) {
    const { brand, name, gallery, cartQuantity } = item;
    const { increaseAmount, decreaseAmount } = this.props;

    return (
      <div className="CartMenu-Item" key={ i }>
        <div>
          <p>{ brand }</p>
          <p>{ name }</p>
        </div>
        <div>
          <button className="CartMenu-IncreaseQuantity" onClick={() => increaseAmount(item) }>+</button>
          <div className="CartMenu-Quantity">
            { cartQuantity }
          </div>
          <button className="CartMenu-DecreaseQuantity" onClick={() => decreaseAmount(item) }>-</button>
        </div>
        <img className="CartMenu-Img" src={ gallery[0] } alt="Product in your Bag" />
      </div>
    );
  }

  renderCartMenu() {
      const { itemsInCart } = this.props;

      return (
        <div className="CartMenu-Wrapper">
          { itemsInCart.length > 0 ? itemsInCart.map((item, i) => this.renderCartItem(item, i)) : <p>Your Bag is empty</p>}
        </div> 
    );
}

  render() {

    return (
        <div className="CartMenu">
          <p>My Bag</p>
          { this.renderCartMenu() }
          <Link to="/cart">
            <button>VIEW BAG</button>
          </Link>
          <button>CHECK OUT</button>
        </div>
    );
  } 
}

export default CartMenu;