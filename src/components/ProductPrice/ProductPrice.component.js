import React, { PureComponent } from "react";
import "./ProductPrice.style.scss";

class ProductPrice extends PureComponent {

    render() {
        const { amount } = this.props.price;
        const { symbol } = this.props.price.currency;
 
        return (
            <div className="ProductPrice">
                <p className="ProductPrice-CurrencySymbol">{ symbol }</p>
                <p className="ProductPrice-Amount">{ amount }</p>
            </div>
        );         
    }
}

export default ProductPrice; 