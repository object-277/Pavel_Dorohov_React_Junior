import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";
import { connect } from "react-redux";
import { addItem } from "../../redux/Cart/cart.actions";

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
                .addFieldList(["id", "name", "brand", "inStock", "gallery", "description", "category"])
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
                addToCart={this.props.addToCart}
            />  
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = {
    addToCart: (product) => {
        return (
            {type: "ADD_ITEM"}
        )
    } 
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PDPContainer);