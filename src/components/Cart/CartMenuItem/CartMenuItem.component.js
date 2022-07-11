import React, { PureComponent } from "react";
import IncreaseButton from "./plus.svg";
import DecreaseButton from "./minus.svg";
import "./CartMenuItem.style.scss";
const COLOR = 'Color';

class CartMenuItem extends PureComponent {

  getPrice(product) {
    const { currency } = this.props;
    const { prices } = product;
    const index = prices.findIndex((price) => (price.currency.symbol === currency));

    return (
      <div className="CartMenuItem-ProductPrice">
        {prices[index].currency.symbol}
        {prices[index].amount}
      </div>
    );
  }

  getAttributeItemClass(attribute, index, item) {
    const { allAttributes, attributes } = this.props.productInCart;
    let isSelectedTrue;
    if (typeof item === 'object') {
      isSelectedTrue = allAttributes !== attributes && attributes[index].items.id === item.id ? true : false;
    } else {
      isSelectedTrue = allAttributes !== attributes && attributes[index].items[0].id === item.id ? true : false;
    }
    if (isSelectedTrue && attribute.id !== COLOR) {
      return "CartMenuItem-Attribute-Item-Active";
    } else if (isSelectedTrue === false && attribute.id === COLOR) {
      return "CartMenuItem-Attribute-Color";
    } else if (isSelectedTrue && attribute.id === COLOR) {
      return "CartMenuItem-Attribute-Color-Active";
    } else {
      return "CartMenuItem-Attribute-Item";
    }
  }

  renderAttributeItems(item, i, attribute, index) {
    const { value } = item;
    const { setAttribute, keyId } = this.props; 
    const colorStyle = {
      background: value,
      width: '16px',
      height: '16px',
      boxSizing: 'border-box',
      border: '1px solid black',
      transition: '0.08s ease-in-out'
    };

    return (
      <div className={this.getAttributeItemClass(attribute, index, item)} key={i}
        onClick={() => setAttribute(item, keyId)}
      >
        <p className="CartMenuItem-Attribute-Item-ItemText"
          style={attribute.id === 'Color' ? colorStyle : null
          }
        >
          {attribute.id !== 'Color' && value}
        </p>
      </div>
    );
  }

  renderAttributes(attribute, index, product) {
    const { id, items } = attribute;

    return (
      <div className="CartMenuItem-Attribute" key={index}>
        <div className="CartMenuItem-Attribute-Name">
          {id}:
        </div>
        <div className={attribute.id === COLOR ? "CartMenuItem-Attribute-Items-Color" : "CartMenuItem-Attribute-Items"} 
             key={index}
        >
          {items.map((item, i) => this.renderAttributeItems(item, i, attribute, index, product))}
        </div>
      </div>
    );
  }

  render(i) {
    const { productInCart, increaseQuantity, decreaseQuantity } = this.props;
    const { brand, name, gallery, cartQuantity, attributes, allAttributes } = productInCart;

    return (
      <div className="CartMenuItem-Product" key={i}>
        <div className="CartMenuItem-LeftSideWrapper">
          <div className="CartMenuItem-BrandName">
            <p>{brand}</p>
            <p>{name}</p>
          </div>
          {this.getPrice(productInCart)}
          {attributes.length !== 0 &&
            <div className="CartMenuItem-AttributeWrapper">
              {allAttributes.map((attribute, index) => this.renderAttributes(attribute, index, productInCart))}
            </div>
          }
        </div>
        <div className="CartMenuItem-Quantity">
          <button className="CartMenuItem-IncreaseQuantity" onClick={() => increaseQuantity(productInCart)}>
            <img id="CartMenuItem-IncreaseQty" src={IncreaseButton} alt="Increase product quantity" />
          </button>
          <div className="CartMenuItem-QuantityNumber">
            {cartQuantity}
          </div>
          <button className="CartMenuItem-DecreaseQuantity" onClick={() => decreaseQuantity(productInCart)}>
            <img id="CartMenuItem-DecreaseQty" src={DecreaseButton} alt="Increase product quantity" />
          </button>
        </div>
        <div className="CartMenuItem-Img-Wrapper">
          <img className="CartMenuItem-Img" src={gallery[0]} alt="Product in your Bag" />
        </div>
      </div>
    );
  }
}

export default CartMenuItem;