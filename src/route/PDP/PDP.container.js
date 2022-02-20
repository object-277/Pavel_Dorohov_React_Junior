import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";
import { connect } from "react-redux";
import { setItemInCart } from "../../redux/Cart/test.reducer";

class PDPContainer extends PureComponent {
    
    state = {
        product: []
    }

    handleAddToCart = () => {
        const { setItemInCart } = this.props;
        const { product } = this.state.product;
        setItemInCart(product);
    };
  
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
    }

    render(){
        const { product } = this.state;

        return(
            product.length !== 0 && <PDP
                { ...this.props }
                { ...this.state }
                addToCart={ this.handleAddToCart }
            />  
        );
    }
}

const mapStateToProps = state => ({
    itemsInCart: state.cart.itemsInCart
});

const mapDispatchToProps = { setItemInCart };

export default connect(mapStateToProps, mapDispatchToProps)(PDPContainer);