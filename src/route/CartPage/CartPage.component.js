import React, { PureComponent } from "react";
import CartPageItemContainer from "../../components/Cart/CartPageItem/CartPageItem.container";
import "./CartPage.style.scss";

class CartPage extends PureComponent {

    renderCartPageItems() {
        const { productsInCart } = this.props;

        return (
            <div>
                <hr className="CartPage-TopLine"/>
                { productsInCart.length > 0 ? productsInCart.map((product, i) => 
              <CartPageItemContainer productInCart={ product } key={ i }/> )
              : <p className="CartPage-Empty">Your Bag is empty</p> }
            </div>
        );
    }

      renderCartWrapper() {
          
          return (
            <div className="CartPage-Wrapper">
                { this.renderCartPageItems() }
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