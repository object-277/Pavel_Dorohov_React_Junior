import React, { PureComponent } from "react";
import "./CartPage.style.scss";

class CartPage extends PureComponent {

    renderCartItem(item, i) {
        const { brand, name, gallery, cartQuantity } = item;
        const { increaseAmount, decreaseAmount } = this.props;
    
        return (
          <div className="CartPage-Item" key={ i }>
              <hr className="CartPage-Line"/>
              <div>
                <p>{ brand }</p>
                <p>{ name }</p>
              </div>
              <div className="CartPage-BtnImgGroup">
                <button className="CartPage-IncreaseQuantity" onClick={() => increaseAmount(item) }>+</button>
                <div className="CartPage-Quantity">
                  { cartQuantity }
                </div>
                <button className="CartPage-DecreaseQuantity" onClick={() => decreaseAmount(item) }>-</button>
                <img className="CartPage-Img" src={ gallery[0] } alt="Product in your Bag" />
              </div>
          </div>
        );
      }
    
      renderCartWrapper() {
          const { itemsInCart } = this.props;
    
          return (
            <div className="CartPage-Wrapper">
              { itemsInCart.length > 0 ? itemsInCart.map((item, i) => this.renderCartItem(item, i)) : <p className="CartPage-Empty">Your Bag is empty</p>}
            </div> 
        );
    }

    render() {
        return(
            <div className="CartPage">
                 <h1 id="Title">Cart</h1>
                { this.renderCartWrapper() }
            </div>
        );
    }
}

export default CartPage;