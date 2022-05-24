import React, { PureComponent } from "react";
import Products from "./PLP.component";
import { executePost } from "../../util/Request.util";
import { productsQuery } from "../../query/products.query";
import { withRouter } from "react-router-dom";

class ProductsContainer extends PureComponent {
    
    state = {};

    componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        await executePost(productsQuery).then(({category}) => {
            const { products } = category;
            this.setState({products});
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

export default withRouter(ProductsContainer);