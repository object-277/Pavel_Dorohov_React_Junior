import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import CartMenuItemContainer from "../CartMenuItem/CartMenuItem.container";
import IncreaseButton from "./plus.svg";
import DecreaseButton from "./minus.svg";
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

 /* renderCartProductAttribute(product) {
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
    //const isSelectedTrue = allAttributes !== attributes && attributes[index].items.id === item.id ? true : false;
    const { setAttribute } = this.props;
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
        
      <div className="CartPageItem-AttributeItem" key={ j } 
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
    const ifColorStyle = {
      background: value,
      width: '63px',
      height: '45px',
      border: '1px solid #1D1F22'
    };
      
    return (
        <div className="CartMenu-AttributeItem" key={ i } 
             onClick = { () => setAttribute(item) } 
             style={ isSelectedTrue === true ? selectedStyle : null } 
        >
            <p className="CartMenu-ItemText"
               style={ attribute.id === 'Color' ? ifColorStyle : null  }
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
            { allAttributes.map((attribute, index) => this.renderAttributes(attribute, index, product)) }  
          </div>
        </div>
          <div className="CartMenu-Quantity">
            <button className="CartMenu-IncreaseQuantity" onClick={() => increaseQuantity(product) }>
              <img id="CartMenu-IncreaseQty" src={ IncreaseButton } alt="Increase product quantity" />   
            </button>
            <div className="CartMenu-QuantityNumber">
              { cartQuantity }
            </div>
            <button className="CartMenu-DecreaseQuantity" onClick={() => decreaseQuantity(product) }>
              <img id="CartMenu-DecreaseQty" src={ DecreaseButton } alt="Increase product quantity" />      
            </button>
          </div>
          <div className="CartMenu-Img-Wrapper">
            <img className="CartMenu-Img" src={ gallery[0] } alt="Product in your Bag" />
          </div>
      </div>
    );
  }*/

  renderCartMenu() {
      const { productsInCart } = this.props;

      return (
        <div className="CartMenu-Products-Wrapper">
          { productsInCart.length > 0 ? productsInCart.map((product, i) => 
          <CartMenuItemContainer productInCart={ product } key={ i } /> ) 
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

  /*renderCartPageItems() {
    const { productsInCart } = this.props;

    return (
        <div>
            <hr className="CartPage-TopLine"/>
            { productsInCart.length > 0 ? productsInCart.map((product, i) => 
          <CartPageItemContainer productInCart={ product } key={ i }/> )
          : <p className="CartPage-Empty">Your Bag is empty</p> }
        </div>
    );
  }*/

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