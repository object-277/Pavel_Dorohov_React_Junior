import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";
import { connect } from "react-redux";
import { setItemInCart, getTotals, setItemAttribute } from "../../redux/Cart/Cart.reducer";

class PDPContainer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {};
    }

    handleAddToCart = () => {
        const { setItemInCart } = this.props;
        const { product } = this.state;
        setItemInCart(product);
        this.props.getTotals();
    };

    handleSetAttribute = (itemIn) => {
        const { product } = this.state;
        const { attributes } = this.state.product;
        const index2 = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = attributes[index2].items.findIndex((item) => (item === itemIn));
        console.log(index2);
        console.log(index3);

        console.log(this.state);
        const { setItemAttribute } = this.props;
    
        const extract = (({ id, attributes}) => ({ id, attributes}))(product);
        const test = (({ id }) => ({ id }))(product);
        console.log(test);
       
        if (this.state.product !== undefined) { 
            console.log(this.state.product.attributes[index2]);
            extract.attributes[index2].items.filter((item) => item === itemIn);
            console.log(extract);
        }
        else { return console.log("error")};
        const attributeName = product.attributes[index2].id;
        const allAttributeItems = product.attributes[index2].items;
        const test2 = Object.assign({}, test, { selectedAttribute: attributeName, allAttributeItems, itemIn });
        console.log(test2);
       setItemAttribute(test2);
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
            this.setState(product);
    }

    render(){
        if ( this.state !== {} ) { 
            return (
                <PDP
                    { ...this.props }
                    { ...this.state }
                    addToCart={ this.handleAddToCart }
                    setAttribute = { this.handleSetAttribute }
                />  
            );
        } else {
            return console.log("error");
        }
    }
}

const mapStateToProps = state => ({
    itemsInCart: state.cart.itemsInCart,
    currency: state.cart.currency,
    itemAttributes: state.cart.itemAttributes
});

const mapDispatchToProps = { setItemInCart, getTotals, setItemAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(PDPContainer);