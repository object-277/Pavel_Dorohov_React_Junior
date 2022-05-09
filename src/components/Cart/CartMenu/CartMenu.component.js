import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
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

  renderCartProductAttribute(product) {
    const { value } = product.attributes[0].items;
    return (
        <div className="CartMenu-Attribute" style={{ width: '24px'}} >
          { value } 
        </div> 
    );      
  }

  renderCartProductAttributes(attribute, index, product) {
    const { items } = attribute;

    return (
        <div className="CartMenu-Attribute" key= { index } >
          { items.map((item, j) => this.renderCartProductAttributeItems(item, j, product, index)) } 
        </div> 
    );      
  }

  renderCartProductAttributeItems(item, j, product, index) {
    const { attributes, allAttributes } = product;
    const { value } = item;
    const isSelectedTrue = allAttributes !== attributes && attributes[index].items.id === item.id ? true : false;
    const biggerWidth = {
      width: '50px'
    };
      if (isSelectedTrue) {
        return (
          <div className="CartMenu-SelectedAttribute" key={ j } style={ value.length > 2 ? biggerWidth : null } >
            { value }
          </div>
        );    
      } else {
          console.log(isSelectedTrue);
          console.log(index);
          console.log(j);
      }
  }

  renderCartProduct(product, i) {
    const { brand, name, gallery, cartQuantity, allAttributes } = product;
    const { increaseQuantity, decreaseQuantity } = this.props;

    return (
      <div className="CartMenu-Product" key={ i }>
        <div className="CartMenu-LeftSideWrapper">
          <div className="CartMenu-BrandName">
            <p>{ brand }</p>
            <p>{ name }</p>
          </div>
          { this.getPrice(product) }
          <div className="CartMenu-AttributeWrapper">
            { allAttributes.length > 1 ? allAttributes.map((attribute,index) => this.renderCartProductAttributes(attribute, index, product)) :
              this.renderCartProductAttribute(product)   
            }
          </div>
        </div>
        <div className="CartMenu-Quantity">
          <button className="CartMenu-IncreaseQuantity" onClick={() => increaseQuantity(product) }>+</button>
          <div className="CartMenu-QuantityNumber">
            { cartQuantity }
          </div>
          <button className="CartMenu-DecreaseQuantity" onClick={() => decreaseQuantity(product) }>-</button>
        </div>
        <div className="CartMenu-Img-Wrapper">
          <img className="CartMenu-Img" src={ gallery[0] } alt="Product in your Bag" />
        </div>
      </div>
    );
  }

  renderCartMenu() {
      const { productsInCart } = this.props;

      return (
        <div className="CartMenu-Wrapper">
          { productsInCart.length > 0 ? productsInCart.map((product, i) => this.renderCartProduct(product, i)) : <p>Your Bag is empty</p>}
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
          <Link to="/cart" onClick={ changeClickedState }>
            <button className="CartMenu-ViewBagBtn">
              view bag
            </button>
          </Link>
          <button className="CartMenu-CheckOutBtn">check out</button>
        </div>
    );
  } 
}

export default CartMenu;