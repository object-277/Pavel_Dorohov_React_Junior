import React, { PureComponent } from "react";
import IncreaseButton from "./plus.svg";
import DecreaseButton from "./minus.svg";

class CartMenuItem extends PureComponent {
  
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

      renderAttributeItems(item, i, attribute, index, product) {
        const { value } = item;
        const { setAttribute } = this.props;
        const { allAttributes, attributes } = product;
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
            const selectedColorStyle = {
              width: '20px',
              minWidth: 'auto',
              height: '20px',
              border: '1px solid #5ECE7B',
          };
  
          const ifColorItemStyle = {
              width: '16px',
              minWidth: 'auto',
              height: '16px',
              border: 'none',
              visibility: 'none'
          };     
          
          const ifColorStyle = {
              background: value,
              width: '16px',
              height: '16px',
          };
  
          const ifWhiteStyle = {
              background: value,
              width: '16px',
              height: '16px',
              boxSizing: 'border-box',
              border: '1px solid #1D1F22'
          }
          
        return (
            <div className="CartMenu-AttributeItem" key={ i } 
                onClick = { () => setAttribute(item) } 
                style={ (isSelectedTrue === true && attribute.id !== 'Color') ? selectedStyle : 
                       (isSelectedTrue === true && attribute.id === 'Color') ? selectedColorStyle : 
                        attribute.id === 'Color' ? ifColorItemStyle : null
                        
                }  
            >
                <p className="CartMenu-ItemText"
                  style={ (attribute.id === 'Color' && value !== '#FFFFFF') ? ifColorStyle : 
                   (attribute.id === 'Color' && value === '#FFFFFF') ? ifWhiteStyle : null
                  }
                >
                   { attribute.id !== 'Color' && value }
                </p>  
            </div>
        );
      }
    
      renderAttributes(attribute, index, product) {
        const { id, items } = attribute;
    
        return (
          <div className="CartMenu-Attribute" key={ index }>
            <div className="CartMenu-Attribute-Name">
                { id }:
            </div>  
            <div className="CartMenu-AttributeItems" key={ index }>
              { items.map((item, i) => this.renderAttributeItems(item, i, attribute, index, product)) } 
            </div>
          </div> 
        );    
      }
    
      render(product, i) {
        const { productInCart, increaseQuantity, decreaseQuantity } = this.props;
        const { brand, name, gallery, cartQuantity, allAttributes } = productInCart;
    
        return (
          <div className="CartMenu-Product" key={ i }>
            <div className="CartMenu-LeftSideWrapper">
              <div className="CartMenu-BrandName">
                <p>{ brand }</p>
                <p>{ name }</p>
              </div>
              { this.getPrice(productInCart) }
              <div className="CartMenu-AttributeWrapper">
                { allAttributes.map((attribute, index) => this.renderAttributes(attribute, index, productInCart)) }  
              </div>
            </div>
              <div className="CartMenu-Quantity">
                <button className="CartMenu-IncreaseQuantity" onClick={() => increaseQuantity(productInCart) }>
                  <img id="CartMenu-IncreaseQty" src={ IncreaseButton } alt="Increase product quantity" />   
                </button>
                <div className="CartMenu-QuantityNumber">
                  { cartQuantity }
                </div>
                <button className="CartMenu-DecreaseQuantity" onClick={() => decreaseQuantity(productInCart) }>
                  <img id="CartMenu-DecreaseQty" src={ DecreaseButton } alt="Increase product quantity" />      
                </button>
              </div>
              <div className="CartMenu-Img-Wrapper">
                <img className="CartMenu-Img" src={ gallery[0] } alt="Product in your Bag" />
              </div>
          </div>
        );
      }
}

export default CartMenuItem;