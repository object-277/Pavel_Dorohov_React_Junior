import React, { PureComponent } from "react";
import CartPageItemContainer from "../../components/Cart/CartPageItem/CartPageItem.container";
import "./CartPage.style.scss";

class CartPage extends PureComponent {

      renderCartWrapper() {
          const { itemsInCart } = this.props;
    
          return (
            <div className="CartPage-Wrapper">
              { itemsInCart.length > 0 ? itemsInCart.map((item, i) => <CartPageItemContainer itemInCart={ item } key={ i }/> ) 
              : <p className="CartPage-Empty">Your Bag is empty</p>}
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