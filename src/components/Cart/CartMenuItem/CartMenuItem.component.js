import React, { PureComponent } from "react";
import IncreaseButton from "./plus.svg";
import DecreaseButton from "./minus.svg";
import "./CartMenuItem.style.scss";

class CartMenuItem extends PureComponent {
  
    getPrice(product) {
        const { currency} = this.props; 
        const { prices } = product;
        const index = prices.findIndex((price) => (price.currency.symbol === currency));
        
        return (
            <div className="CartMenuItem-ProductPrice">
                { prices[index].currency.symbol }
                { prices[index].amount }
            </div>
        );         
      }

      renderAttributeItems(item, i, attribute, index, product) {
        const { value } = item;
        const { setAttribute } = this.props;
        const { allAttributes, attributes } = product;
        const { keyId } = this.props;
        const isSelectedTrue = allAttributes !== attributes && attributes[index].items.id === item.id ? true : false;

        const selectedStyle = {
          background: '#1D1F22',
          color: '#FFF'
        };
        const selectedColorStyle = {
          backgroundColor: value,
          backgroundClip: 'content-box',
          width: '20px',
          height: '20px',
          padding: '1px',
          border: '1px solid #5ECE7B',
          boxSizing: 'border-box',
          transition: '0.08s ease-in-out'
        };
          
          const colorStyle = {
              background: value,
              width: '16px',
              height: '16px',
              transition: '0.08s ease-in-out'
          };
  
          const whiteStyle = {
              background: value,
              width: '16px',
              height: '16px',
              padding: '0px',
              boxSizing: 'border-box',
              border: '1px solid #1D1F22'
          }

          const whiteSelectedStyle = {
            backgroundColor: value,
            backgroundClip: 'content-box',
            width: '20px',
            height: '20px',
            padding: '1px',
            border: '1px solid #5ECE7B',
            boxSizing: 'border-box',
            transition: '0.08s ease-in-out'
          }
          
        return (
            <div className={ (isSelectedTrue && attribute.id !== 'Color') ? "CartMenuItem-Attribute-Item-Active" : 
                            (attribute.id === 'Color' && isSelectedTrue === false) ? "CartMenuItem-Attribute-Color" :
                          (attribute.id === 'Color' && isSelectedTrue) ?
                            "CartMenuItem-Attribute-Color-Active" : "CartMenuItem-Attribute-Item" 
              } key={ i } 
                onClick = { () => setAttribute(item, keyId) } 
                style={ (isSelectedTrue && attribute.id !== 'Color') ? selectedStyle : 
                (isSelectedTrue && attribute.id === 'Color' && value !== '#FFFFFF') ? selectedColorStyle :
                (attribute.id === 'Color' && value !== '#FFFFFF') ? colorStyle : 
                    (attribute.id === 'Color' && value === '#FFFFFF' && isSelectedTrue === false) ? whiteStyle : 
                    (isSelectedTrue && value === '#FFFFFF' ) ? whiteSelectedStyle : null    
                }  
            >
                <p className="CartMenuItem-Attribute-Item-ItemText"
                  style={ attribute.id === 'Color' ? { display: 'none' } : null }
                >
                   { attribute.id !== 'Color' && value }
                </p>  
            </div>
        );
      }
    
      renderAttributes(attribute, index, product) {
        const { id, items } = attribute;
    
        return (
          <div className="CartMenuItem-Attribute" key={ index }>
            <div className="CartMenuItem-Attribute-Name">
                { id }:
            </div>  
            <div className="CartMenuItem-Attribute-Items" key={ index }>
              { items.map((item, i) => this.renderAttributeItems(item, i, attribute, index, product)) } 
            </div>
          </div> 
        );    
      }
    
      render(product, i) {
        const { productInCart, increaseQuantity, decreaseQuantity } = this.props;
        const { brand, name, gallery, cartQuantity, attributes, allAttributes } = productInCart;
    
        return (
          <div className="CartMenuItem-Product" key={ i }>
            <div className="CartMenuItem-LeftSideWrapper">
              <div className="CartMenuItem-BrandName">
                <p>{ brand }</p>
                <p>{ name }</p>
              </div>
              { this.getPrice(productInCart) }
              { attributes.length !== 0 && 
                <div className="CartMenuItem-AttributeWrapper">
                { allAttributes.map((attribute, index) => this.renderAttributes(attribute, index, productInCart))}  
              </div>
              }
            </div>
              <div className="CartMenuItem-Quantity">
                <button className="CartMenuItem-IncreaseQuantity" onClick={() => increaseQuantity(productInCart) }>
                  <img id="CartMenuItem-IncreaseQty" src={ IncreaseButton } alt="Increase product quantity" />   
                </button>
                <div className="CartMenuItem-QuantityNumber">
                  { cartQuantity }
                </div>
                <button className="CartMenuItem-DecreaseQuantity" onClick={() => decreaseQuantity(productInCart) }>
                  <img id="CartMenuItem-DecreaseQty" src={ DecreaseButton } alt="Increase product quantity" />      
                </button>
              </div>
              <div className="CartMenuItem-Img-Wrapper">
                <img className="CartMenuItem-Img" src={ gallery[0] } alt="Product in your Bag" />
              </div>
          </div>
        );
      }
}

export default CartMenuItem;