import React, { PureComponent } from "react";
import ProductCard from "./ProductCard.component";

class ProductCardContainer extends PureComponent {

    state = {
        price: []
    }

    componentDidMount() {
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

    render(){

        return(
            <ProductCard
                { ...this.props }
                { ...this.state }
            />
        );
    }
    

}

export default ProductCardContainer;