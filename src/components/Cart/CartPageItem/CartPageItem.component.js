import React, { PureComponent } from "react";
import Minus from "./Minus.svg";
import Plus from "./Plus.svg";
import VectorLeft from "./VectorLeft.svg";
import VectorRight from "./VectorRight.svg";
import "./CartPageItem.style.scss";

class CartPageItem extends PureComponent {

    render() {
        const { item, increaseAmount, decreaseAmount, index, changeImgForwards, changeImgBackwards } = this.props;
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