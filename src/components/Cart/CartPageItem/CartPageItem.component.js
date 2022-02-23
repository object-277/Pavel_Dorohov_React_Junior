import React, { PureComponent } from "react";
import Minus from "./Minus.svg";
import Plus from "./Plus.svg";
import "./CartPageItem.style.scss";

class CartPageItem extends PureComponent {

    render() {
        const { item, increaseAmount, decreaseAmount } = this.props;
        const { brand, name, gallery, cartQuantity } = item;
    
        return (
          <div className="CartPageItem">
              <hr className="CartPageItem-Line"/>
              <div>
                <p>{ brand }</p>
                <p>{ name }</p>
              </div>
              <div className="CartPageItem-BtnImgGroup">
                <button className="CartPageItem-IncreaseQuantity" onClick={() => increaseAmount(item) }>
                  <div className="CartPageItem-IncreaseButtonWrapper">
                    <img id="Horizontal" src={ Minus } alt="Increase product quantity" />
                    <img id="Vertical" src={ Plus } alt="Increase product quantity" />
                  </div>
                </button>
                <div className="CartPageItem-Quantity">
                  { cartQuantity }
                </div>
                <button className="CartPageItem-DecreaseQuantity" onClick={() => decreaseAmount(item) }>
                  <img className="CartPageItem-ButtonImg" src={ Minus } alt="Decrease product quantity" />
                </button>
                <img className="CartPageItem-Img" src={ gallery[0] } alt="Product in your Bag" />
              </div>
          </div>
        );
    }
}

export default CartPageItem;