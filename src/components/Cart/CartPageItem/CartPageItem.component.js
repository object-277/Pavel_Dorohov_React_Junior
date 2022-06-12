import React, { PureComponent } from "react";
import CaretLeft from "./CaretLeft.svg";
import CaretRight from "./CaretRight.svg";
import IncreaseButton from "./plus-square.svg";
import DecreaseButton from "./minus-square.svg";
import "./CartPageItem.style.scss";

class CartPageItem extends PureComponent {

  getPrice() {
    const { currency} = this.props; 
    const { prices } = this.props.productInCart;
    const index = prices.findIndex((price) => (price.currency.symbol === currency));

    return (
        <div className="CartPageItem-Price">
            <p className="CartPageItem-PriceCurrencySymbol">{ prices[index].currency.symbol }</p>
            <p className="CartPageItem-PriceAmount">{ prices[index].amount }</p>
        </div>
    );         
  }

  componentDidMount() {
    this.getPrice();
  }

  renderAttributeItems(item, i, attribute, index) {
    const { value } = item;
    const { setAttribute } = this.props;
    const { allAttributes, attributes } = this.props.productInCart;
    const isSelectedTrue = allAttributes !== attributes && attributes[index].items.id === item.id ? true : false;
       
    const selectedStyle = {
      background: '#1D1F22',
      color: '#FFF',

    };
    const selectedColorStyle = {
      backgroundColor: value,
      backgroundClip: 'content-box',
      width: '36px',
      height: '36px',
      padding: '1px',
      border: '1px solid #5ECE7B',
      boxSizing: 'border-box',
      transition: '0.08s ease-in-out'
  };

  const colorStyle = {
      background: value,
      width: '32px',
      height: '32px',
      margin: '1px',
      boxSizing: 'border-box',
      transition: '0.08s ease-in-out'
  };

  const whiteStyle = {
      background: value,
      width: '32px',
      height: '32px',
      margin: '1px',
      boxSizing: 'border-box',
      border: '1px solid #1D1F22',
      transition: '0.08s ease-in-out'
  }

  const whiteSelectedStyle = {
    backgroundColor: value,
    backgroundClip: 'content-box',
    width: '36px',
    height: '36px',
    padding: '1px',
    border: '1px solid #5ECE7B',
    boxSizing: 'border-box',
    transition: '0.08s ease-in-out'
  }
      
    return (
      <div className={ (isSelectedTrue && attribute.id !== 'Color') ? "CartPageItem-Attribute-Item-Active" : 
                       (attribute.id === 'Color' && isSelectedTrue === false) ? "CartPageItem-Attribute-Color" :
                      (attribute.id === 'Color' && isSelectedTrue) ?
                       "CartPageItem-Attribute-Color-Active" : "CartPageItem-Attribute-Item"       
            } key={ i } 
          onClick = {
          () => setAttribute(item) 
          } 
          style={ (isSelectedTrue && attribute.id !== 'Color') ? selectedStyle : 
                (isSelectedTrue && attribute.id === 'Color' && value !== '#FFFFFF') ? selectedColorStyle :
                (attribute.id === 'Color' && value !== '#FFFFFF') ? colorStyle : 
                    (attribute.id === 'Color' && value === '#FFFFFF' && isSelectedTrue === false) ? whiteStyle : 
                    (isSelectedTrue && value === '#FFFFFF' ) ? whiteSelectedStyle : null   
          } 
      >
          <p className="CartPageItem-Attribute-Item-ItemText"
            style={ attribute.id === 'Color' ? { display: 'none' } : null 
            }
          >
        { attribute.id !== 'Color' && value }
          </p>   
      </div>
    );
  }

  renderAttributes(attribute, index) {
      const { id, items } = attribute;
      const ifColorStyle = {
        height: '36px',
      };

      return (
        <div className="CartPageItem-Attribute" key={ index }>
          <div className="CartPageItem-Attribute-Name">
              { id }:
          </div>  
          <div className="CartPageItem-Attribute-Items" key={ index }
               style={ attribute.id === 'Color' ? ifColorStyle : null }
          >
            { items.map((item, i) => this.renderAttributeItems(item, i, attribute, index)) } 
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
            { brand }
          </div>
          <div id="CartPageItem-Name">
            { name }
          </div>
          { this.getPrice() }
          { attributes.length !== 0 && 
            <div className="CartPageItem-Attributes">
              { allAttributes.map((attribute, index) => this.renderAttributes(attribute, index)) }
            </div> 
          } 
        </div>
        <div className="CartPageItem-BtnImgGroup">
          <div className="CartPageItem-QuantityWrapper">
            <button className="CartPageItem-IncreaseQuantity" onClick={() => increaseQuantity(productInCart) }>
                <img id="IncreaseQty" src={ IncreaseButton } alt="Increase product quantity" /> 
            </button>
            <div className="CartPageItem-Quantity">
              { cartQuantity }
            </div>
            <button className="CartPageItem-DecreaseQuantity" onClick={() => decreaseQuantity(productInCart) }>
              <img id="DecreaseQty" src={ DecreaseButton } alt="Decrease product quantity" />
            </button>
          </div>
          <div className="CartPageItem-Gallery">
            <img className="CartPageItem-Img" src={ gallery[index] } alt="Product in your Bag" />
            { gallery.length > 1 && 
              <button className="CartPageItem-CaretLeftWrapper" onClick={ () => changeImgBackwards() }>
                <img id="CaretLeft" src={ CaretLeft } alt="Previous" /> 
              </button>
            }
            { gallery.length > 1 && 
              <button className="CartPageItem-CaretRightWrapper" onClick={ () => changeImgForwards() }>
                <img id="CaretRight" src={ CaretRight } alt="Next" />
              </button> 
            }
          </div>
        </div>
      </div>
      <hr className="CartPageItem-Line"/>
      </>
    );
    }
}

export default CartPageItem;