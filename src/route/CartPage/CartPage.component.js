import React, { PureComponent } from "react";
import CartPageItemContainer from "../../components/Cart/CartPageItem/CartPageItem.container";
import "./CartPage.style.scss";

class CartPage extends PureComponent {

    renderCartPageItems() {
        const { productsInCart } = this.props;

        return (
            <>
                <hr className="CartPage-TopLine"/>
                { productsInCart.length > 0 ? productsInCart.map((product, i) => 
                <CartPageItemContainer productInCart={ product } key={ i } keyId={ i }/> )
                : <p className="CartPage-Empty">Your Bag is empty</p> }
            </>
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
        const { productsInCart, cartTotalPrice, cartTotalQuantity, currency } = this.props;
        const tax21 = ((cartTotalPrice / 100) * 21).toFixed(2);
        return(
            <div className="CartPage">
                 <h1 id="Title">Cart</h1>
                { this.renderCartWrapper() }
                { productsInCart.length > 0 &&
                    <div className="CartPage-Total-Wrapper">
                        <div className="CartPage-Total">
                            <div className="CartPage-Total-Content">
                                <p id="tax">Tax 21%:</p>
                                <p id="quantity">Quantity:</p>
                                <p id="total">Total:</p>
                            </div>
                            <div className="CartPage-Total-Numbers">
                                <p id="taxAmount">{ currency }{ tax21 }</p>
                                <p id="quantityNumber">{ cartTotalQuantity }</p>
                                <p id="totalPrice">{ currency }{ cartTotalPrice }</p>
                            </div>
                        </div>
                    <button className="CartPage-Total-OrderBtn">
                        <p id="btnLabel">Order</p>
                    </button>
                    </div>
                }
            </div>
        );
    }
}

export default CartPage;