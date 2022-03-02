import React, { PureComponent } from "react";
import ProductPrice from "./ProductPrice.component";

class ProductPriceContainer extends PureComponent {

    state = {
        price: []
    }
    
    /*componentDidMount() {
        this.getPrice();
    }*/

    componentDidUpdate() {
        this.getPrice();
    }

    getPrice() {
        const { prices } = this.props.product;

        switch (document.getElementById("Currency-Label").innerText) {
            case "£":
                this.setState({price: prices[1].amount})
                console.log(this.state.price);
                break;
                
            default:
                this.setState({price: prices[0].amount})
        }
    }

    render() {
        return (
            <ProductPrice />
        );
    }
}

export default ProductPriceContainer; 