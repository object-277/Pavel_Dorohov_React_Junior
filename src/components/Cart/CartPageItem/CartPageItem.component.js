import React, { PureComponent } from "react";
import Minus from "./Minus.svg";
import Plus from "./Plus.svg";
import VectorLeft from "./VectorLeft.svg";
import VectorRight from "./VectorRight.svg";
import "./CartPageItem.style.scss";

class CartPageItem extends PureComponent {

  getPrice() {
    const { currency} = this.props; 
    const { prices } = this.props.itemInCart;
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
    const { allAttributes, attributes } = this.props.itemInCart;
    const selectedStyle = {
        background: '#1D1F22',
        color: '#FFF'
    };

    const isSelectedTrue = allAttributes !== attributes && attributes[index].items.id === item.id ? true : false;
       if (isSelectedTrue) {
                console.log(isSelectedTrue );
                } else {
                    console.log("lol");
                }
    const ifColorStyle = {
      background: value,
      width: '63px',
      height: '45px',
      border: '1px solid #1D1F22'
    };
      
    return (
        
        <div className="PDP-AttributeItem" key={ i } 
            onClick = {
            //isProductInCart === false ?
            () => setAttribute(item) 
            //() => handleSetAttribute(item) 
            } 
           style={ isSelectedTrue === true ? selectedStyle : null 
           } 
        >
            <p className="PDP-ItemText"
               style={ attribute.id === 'Color' ? ifColorStyle : null  }
            >
               { attribute.id !== 'Color' && value }
            </p>  
        </div>
    );
}

renderAttributes(attribute, index) {
    const { items } = attribute;

    return (
        <div className="CartPageItem-Attributes" key={ index }>
            <div className="PDP-AttributeItems">
               { items.map((item, i) => this.renderAttributeItems(item, i, attribute, index)) } 
            </div>
        </div>
    );    
}

  render() {
    const { itemInCart, increaseAmount, decreaseAmount, index, changeImgForwards, changeImgBackwards } = this.props;
    const { brand, name, gallery, prices, cartQuantity, allAttributes } = itemInCart;
    
    return (
      <div className="CartPageItem">
        <hr className="CartPageItem-Line"/>
        <div id="CartPageItem-Brand">
          { brand }
        </div>
        <div id="CartPageItem-Name">
          { name }
        </div>
        { this.getPrice() }
        { allAttributes.map((attribute, i) => this.renderAttributes(attribute, i)) }
        <div className="CartPageItem-BtnImgGroup">
          <button className="CartPageItem-IncreaseQuantity" onClick={() => increaseAmount(itemInCart) }>
              <div className="CartPageItem-IncreaseButtonWrapper">
                <img id="Horizontal" src={ Minus } alt="Increase product quantity" />
                <img id="Vertical" src={ Plus } alt="Increase product quantity" />
              </div>
          </button>
          <div className="CartPageItem-Quantity">
            { cartQuantity }
          </div>
          <button className="CartPageItem-DecreaseQuantity" onClick={() => decreaseAmount(itemInCart) }>
            <img className="CartPageItem-ButtonImg" src={ Minus } alt="Decrease product quantity" />
          </button>
          <div className="CartPageItem-Gallery">
            <img className="CartPageItem-Img" src={ gallery[index] } alt="Product in your Bag" />
            <img id="VectorLeft" src={ VectorLeft } alt="Previous" onClick={ (e) => changeImgBackwards(e) } />
            <img id="VectorRight" src={ VectorRight } alt="Next" onClick={ (e) => changeImgForwards(e) } />
          </div>
        </div>
      </div>
    );
    }
}

export default CartPageItem;