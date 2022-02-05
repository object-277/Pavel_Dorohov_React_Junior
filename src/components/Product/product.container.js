import React, { PureComponent } from "react";
import Product from "./product.component";
import { productsQuery } from "../../query/products.query";
import { executePost } from "../../util/Request.util";

class ProductContainer extends PureComponent {
    
    state = {

        product: []
    }

    componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        await executePost(productsQuery).then(({product}) => {
            this.setState({product});
            console.log({product});
        });
    }


    render() {
        return (
            <Product
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default ProductContainer;