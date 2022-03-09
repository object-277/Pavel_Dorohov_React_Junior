import React, { PureComponent } from "react";
import ProductPrice from "./ProductPrice.component";

class ProductPriceContainer extends PureComponent {

    state = {
        price: [this.props.product.prices[0]]
    }
    
    componentDidMount() {
        this.getPrice();
    }

    componentDidUpdate() {
        this.getPrice();
    }

    getPrice() {
        const { prices } = this.props.product;

        switch (document.getElementById("Currency-Label").innerText) {
            case "£":
                this.setState({price: prices[1]})
                break;
            case "A$":
                this.setState({price: prices[2]})
                break;
            case "¥":
                this.setState({price: prices[3]})
                break;
            case "₽":
                this.setState({price: prices[4]})
                break;
            default:
                this.setState({price: prices[0]})
        }
    }

    render() {
        const { price } = this.state;

        if ( price.currency !== undefined ) {
            return (
                <ProductPrice 
                    price={ price }
                />
            );
        } else {
            return null;
        }
    }
}

export default ProductPriceContainer; 