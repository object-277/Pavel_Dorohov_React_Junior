import React, { PureComponent } from "react";
import Products from "./Products.component";
import { executePost } from "../../util/Request.util";
import { productsQuery } from "../../query/products.query";

class ProductsContainer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {};
    }

    componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        await executePost(productsQuery).then(({products}) => {
            this.setState(products);
            console.log(products);
        });
    }

    render(){
        return(
            <Products
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default ProductsContainer;