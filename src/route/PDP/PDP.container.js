import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";

class PDPContainer extends PureComponent {

    state = {

        product: []
    }

    componentDidMount() {
        this.productQuery();
    }

    async productQuery() {
        const id = this.props.match.params.id;
        await executePost(new Query("product", true)
                .addArgument("id", "String!", id)
                .addFieldList(["name", "brand", "inStock", "gallery", "description", "category"])
        ).then(({product}) => {
            this.getCategory({product});
        });
    }

    getCategory(product) {
            this.setState({product});
            console.log(this.props.match.params.id);      
    }

    render(){
        const { product } = this.state;

        return(
            product.length !== 0 && <PDP
                { ...this.props }
                { ...this.state }
            />  
        );
    }
}

export default PDPContainer;