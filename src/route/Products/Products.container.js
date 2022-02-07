import React, { PureComponent } from "react";
import Products from "./Products.component";
import { executePost } from "../../util/Request.util";
import { productsQuery } from "../../query/products.query";

class ProductsContainer extends PureComponent {

    state = {

        category: []
    }

    componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        await executePost(productsQuery).then(({category}) => {
            this.setState({category});
            console.log({category});
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