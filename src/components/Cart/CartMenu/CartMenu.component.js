import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import CartMenuItemContainer from "../CartMenuItem/CartMenuItem.container";
import "./CartMenu.style.scss";

class CartMenu extends PureComponent {

  getPrice(product) {
    const { currency} = this.props; 
    const { prices } = product;
    const index = prices.findIndex((price) => (price.currency.symbol === currency));
    
    return (
        <div className="CartMenu-ProductPrice">
            { prices[index].currency.symbol }
            { prices[index].amount }
        </div>
    );         
  }

  componentWillUnmount() {
    this.props.cartMenuUnmounts();
  }

  renderCartMenu() {
      const { productsInCart } = this.props;

      return (
        <div className="CartMenu-Products-Wrapper">
          { productsInCart.length > 0 ? productsInCart.map((product, i) => 
          <CartMenuItemContainer productInCart={ product } key={ i } keyId={ i }/> ) 
          : <p>Your Bag is empty</p> }
        </div> 
    );
  }

  renderTotal() {
    const { cartTotalQuantity } = this.props;
    let productsTotal = "";
    if ( cartTotalQuantity > 1 ) {
      productsTotal = <span id="CartMenu-Header-Quantity"> { cartTotalQuantity + " items" } </span>;
    } else {
        productsTotal = <span id="CartMenu-Header-Quantity"> { cartTotalQuantity + " item" } </span>;
    }
    return productsTotal;
  }

  render() {
    const { cartTotalQuantity, cartTotalPrice, currency, changeClickedState } = this.props;
   
    return (
        <div className="CartMenu-Wrapper">
          <div className="CartMenu">
            <p className="CartMenu-Header">My Bag, 
              { cartTotalQuantity > 0 && this.renderTotal() }
            </p>
            { this.renderCartMenu() } 
            <div className="CartMenu-TotalPriceWrapper">
              <div className="CartMenu-TotalLabel">
                Total
              </div>
              <div className="CartMenu-TotalPrice">
                { currency }
                { cartTotalPrice }
              </div>
            </div>
            <div className="CartMenu-ButtonsWrapper">
              <Link id="CartMenu-ViewBag-Link" to="/cart" onClick={ changeClickedState }>
                <button className="CartMenu-ViewBagBtn">
                  view bag
                </button>
              </Link>
              <button className="CartMenu-CheckOutBtn">check out</button>
            </div>
          </div>
        </div>
    );
  } 
}

export default CartMenu;