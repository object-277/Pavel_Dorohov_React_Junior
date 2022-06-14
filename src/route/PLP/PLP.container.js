import React, { PureComponent } from "react";
import Products from "./PLP.component";
import { executePost } from "../../util/Request.util";
import { withRouter } from "react-router-dom";
import { Field, Query } from "@tilework/opus";

class ProductsContainer extends PureComponent {
    
    state = {};

    componentDidMount() {
        this.getProducts();
    }

    componentDidUpdate() {
        this.getProducts();
    }

    async getProducts() {
        const { pathname } = this.props.location;
        const categoryName = pathname.replace('/', '');
        const category = {
            title: categoryName
        }
        await executePost(new Query("category", true)
        .addArgument("input", "CategoryInput", category)
        .addField(new Field("products", true)
            .addFieldList(["id", "brand", "name", "description", "category", "gallery", "inStock"])
            .addField(new Field("prices", true)
                .addFieldList(["amount"])
                .addField(new Field("currency", true)
                    .addFieldList(["label", "symbol"])
                 )
            )
            .addField(new Field("attributes", true)
                .addFieldList(["id", "name", "type"])
                .addField(new Field("items", true)
                    .addFieldList(["id", "value"])
                )
            )
        )).then(({category}) => {
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