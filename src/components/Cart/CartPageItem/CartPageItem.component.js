import React, { PureComponent } from "react";
import Minus from "./Minus.svg";
import Plus from "./Plus.svg";
import VectorLeft from "./VectorLeft.svg";
import VectorRight from "./VectorRight.svg";
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
        
        <div className="CartPageItem-AttributeItem" key={ i } 
             onClick = { () => setAttribute(item) } 
             style={ isSelectedTrue === true ? selectedStyle : null } 
        >
            <p className="CartPageItem-ItemText"
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
          
        <div className="CartPageItem-AttributeItems" key={ index }>
          { items.map((item, i) => this.renderAttributeItems(item, i, attribute, index)) } 
        </div>
         
      );    
  }

  render() {
    const { productInCart, increaseAmount, decreaseAmount, index, changeImgForwards, changeImgBackwards } = this.props;
    const { brand, name, gallery, cartQuantity, allAttributes } = productInCart;
    
    return (
      <div className="CartPageItem">
        <div id="CartPageItem-Brand">
          { brand }
        </div>
        <div id="CartPageItem-Name">
          { name }
        </div>
        { this.getPrice() }
        <div className="CartPageItem-Attributes">
          { allAttributes.map((attribute, index) => this.renderAttributes(attribute, index)) }
        </div>
        <div className="CartPageItem-BtnImgGroup">
          <button className="CartPageItem-IncreaseQuantity" onClick={() => increaseAmount(productInCart) }>
              <div className="CartPageItem-IncreaseButtonWrapper">
                <img id="Horizontal" src={ Minus } alt="Increase product quantity" />
                <img id="Vertical" src={ Plus } alt="Increase product quantity" />
              </div>
          </button>
          <div className="CartPageItem-Quantity">
            { cartQuantity }
          </div>
          <button className="CartPageItem-DecreaseQuantity" onClick={() => decreaseAmount(productInCart) }>
            <img className="CartPageItem-ButtonImg" src={ Minus } alt="Decrease product quantity" />
          </button>
          <div className="CartPageItem-Gallery">
            <img className="CartPageItem-Img" src={ gallery[index] } alt="Product in your Bag" />
            { gallery.length > 1 && <img id="VectorLeft" src={ VectorLeft } alt="Previous" onClick={ () => changeImgBackwards() } /> }
            { gallery.length > 1 && <img id="VectorRight" src={ VectorRight } alt="Next" onClick={ () => changeImgForwards() } /> }
          </div>
        </div>
        <hr className="CartPageItem-Line"/>
      </div>
    );
    }
}

export default CartPageItem;