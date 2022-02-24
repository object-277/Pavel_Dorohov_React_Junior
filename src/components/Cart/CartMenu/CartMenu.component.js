import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./CartMenu.style.scss";

class CartMenu extends PureComponent {

  renderCartItem(item, i) {
    const { brand, name, gallery, cartQuantity } = item;
    const { increaseAmount, decreaseAmount } = this.props;

    return (
      <div className="CartMenu-Item" key={ i }>
        <div className="CartMenu-BrandName">
          <p>{ brand }</p>
          <p>{ name }</p>
        </div>
        <div className="CartMenu-Quantity">
          <button className="CartMenu-IncreaseQuantity" onClick={() => increaseAmount(item) }>+</button>
          <div className="CartMenu-QuantityNumber">
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

  renderTotal() {
    const { cartTotalQuantity } = this.props;
    let itemsTotal = "";
    if ( cartTotalQuantity > 1 ) {
      itemsTotal = <span> { cartTotalQuantity + " items" } </span>;
    } else {
        itemsTotal = <span> { cartTotalQuantity + " item" } </span>;
    }
    return itemsTotal;
  }

  render() {
    const { cartTotalQuantity } = this.props;
   
    return (
        <div className="CartMenu">
            <p className="CartMenu-Header">My Bag, 
              { cartTotalQuantity > 0 && this.renderTotal() }
            </p>
            { this.renderCartMenu() } 
          <Link to="/cart">
            <button className="CartMenu-ViewBagBtn">
              <p>VIEW BAG</p>
            </button>
          </Link>
          <button className="CartMenu-CheckOutBtn">CHECK OUT</button>
        </div>
    );
  } 
}

export default CartMenu;