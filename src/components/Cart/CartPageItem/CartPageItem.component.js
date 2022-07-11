import React, { PureComponent } from "react";
import CaretLeft from "./CaretLeft.svg";
import CaretRight from "./CaretRight.svg";
import IncreaseButton from "./plus-square.svg";
import DecreaseButton from "./minus-square.svg";
import "./CartPageItem.style.scss";
const COLOR = 'Color';

class CartPageItem extends PureComponent {

  getPrice() {
    const { currency } = this.props;
    const { prices } = this.props.productInCart;
    const index = prices.findIndex((price) => (price.currency.symbol === currency));

    return (
      <div className="CartPageItem-Price">
        <p className="CartPageItem-PriceCurrencySymbol">{prices[index].currency.symbol}</p>
        <p className="CartPageItem-PriceAmount">{prices[index].amount}</p>
      </div>
    );
  }

  getAttributeItemClass(attribute, index, item) {
    const { allAttributes, attributes } = this.props.productInCart;
    const isSelectedTrue = allAttributes !== attributes && attributes[index].items.id === item.id ? true : false;
    if (isSelectedTrue && attribute.id !== COLOR) {
      return "CartPageItem-Attribute-Item-Active";
    } else if (isSelectedTrue === false && attribute.id === COLOR) {
      return "CartPageItem-Attribute-Color";
    } else if (isSelectedTrue && attribute.id === COLOR) {
      return "CartPageItem-Attribute-Color-Active";
    } else {
      return "CartPageItem-Attribute-Item";
    }
  }

  componentDidMount() {
    this.getPrice();
  }

  renderAttributeItems(item, i, attribute, index) {
    const { value } = item;
    const { setAttribute } = this.props;
    const colorStyle = {
      background: value,
      width: '32px',
      height: '32px',
      margin: '0px',
      border: '1px solid #1D1F22',
      boxSizing: 'border-box'
    };

    return (
      <div className={this.getAttributeItemClass(attribute, index, item)} key={i}
        onClick={() => setAttribute(item)}
      >
        <p className="CartPageItem-Attribute-Item-ItemText"
          style={attribute.id === COLOR ? colorStyle : null}
        >
          {attribute.id !== COLOR && value}
        </p>
      </div>
    );
  }

  renderAttributes(attribute, index) {
    const { id, items } = attribute;
  
    return (
      <div className="CartPageItem-Attribute" key={index}>
        <div className="CartPageItem-Attribute-Name">
          {id}:
        </div>
        <div className={attribute.id === COLOR ? "CartPageItem-Attribute-Items-Color" : "CartPageItem-Attribute-Items"} 
             key={index}
        >
          {items.map((item, i) => this.renderAttributeItems(item, i, attribute, index))}
        </div>
      </div>
    );
  }

  render() {
    const { productInCart, increaseQuantity, decreaseQuantity, index, changeImgForwards, changeImgBackwards } = this.props;
    const { brand, name, gallery, cartQuantity, attributes, allAttributes } = productInCart;

    return (
      <>
        <div className="CartPageItem">
          <div className="CartPageItem-ItemInfoWrapper">
            <div id="CartPageItem-Brand">
              {brand}
            </div>
            <div id="CartPageItem-Name">
              {name}
            </div>
            {this.getPrice()}
            {attributes.length !== 0 &&
              <div className="CartPageItem-Attributes">
                {allAttributes.map((attribute, index) => this.renderAttributes(attribute, index))}
              </div>
            }
          </div>
          <div className="CartPageItem-BtnImgGroup">
            <div className="CartPageItem-QuantityWrapper">
              <button className="CartPageItem-IncreaseQuantity" onClick={() => increaseQuantity(productInCart)}>
                <img id="IncreaseQty" src={IncreaseButton} alt="Increase product quantity" />
              </button>
              <div className="CartPageItem-Quantity">
                {cartQuantity}
              </div>
              <button className="CartPageItem-DecreaseQuantity" onClick={() => decreaseQuantity(productInCart)}>
                <img id="DecreaseQty" src={DecreaseButton} alt="Decrease product quantity" />
              </button>
            </div>
            <div className="CartPageItem-Gallery">
              <img className="CartPageItem-Img" src={gallery[index]} alt="Product in your Bag" />
              {gallery.length > 1 &&
                <button className="CartPageItem-CaretLeftWrapper" onClick={() => changeImgBackwards()}>
                  <img id="CaretLeft" src={CaretLeft} alt="Previous" />
                </button>
              }
              {gallery.length > 1 &&
                <button className="CartPageItem-CaretRightWrapper" onClick={() => changeImgForwards()}>
                  <img id="CaretRight" src={CaretRight} alt="Next" />
                </button>
              }
            </div>
          </div>
        </div>
        <hr className="CartPageItem-Line" />
      </>
    );
  }
}

export default CartPageItem;