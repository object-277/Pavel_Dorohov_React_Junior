import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";
import { connect } from "react-redux";
import { addProductToCart, getTotals, setProductAttribute, setProductToCart } from "../../redux/Cart/Cart.reducer";

class PDPContainer extends PureComponent {

    state = {
        isProductInCart: null,
        allAttributesSelected : false     
    };

    handleAddToCart = () => {
        const { addProductToCart, productToCart } = this.props;
        if (productToCart.length > 0) {
            const { attributes } = this.props.productToCart[0].productReadyToCart;
            const ifAllAttributesSelected = attributes.every((attribute) => Object.entries(attribute.items).length === 2);
            if (ifAllAttributesSelected) {
                addProductToCart(productToCart[0].productReadyToCart);
                this.props.getTotals();
            } else {
                console.log("SELECT ALL ATTRIBUTES"); 
            }
        } else {
            return (
                <p>Select all attributes!</p>
            );
        }
    };
  
    handleSetAttribute = (itemIn) => {
        const { product } = this.state;
        const productSelectedAttribute = JSON.parse(JSON.stringify(product));
        const { attributes } = this.state.product;
        const { setProductToCart } = this.props;
        const index2 = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const attributeName = product.attributes[index2].id;
        productSelectedAttribute.attributes[index2].items = itemIn;
        const productAttributes = product.attributes;
        const testProduct = Object.assign({}, productSelectedAttribute, {allAttributes: productAttributes});
        const testToCart =  Object.assign({}, {productReadyToCart: testProduct }, {selectedAttribute: attributeName}, {allAttributes: attributes}, {itemIn: itemIn}, {product:product});
    
        setProductToCart(testToCart);
    }

    checkIfInCart() {
        const { product } = this.state;
        const ifInCart = this.props.productsInCart.some((productInCart) => productInCart.id === product.id);
        console.log(ifInCart);
        this.setState({isProductInCart: ifInCart});
    }

    componentDidMount() {
        this.productQuery();
    }

    componentDidUpdate() {
        this.checkIfInCart();
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
    productsInCart: state.cart.productsInCart,
    currency: state.cart.currency,
    itemAttributes: state.cart.itemAttributes,
    productToCart: state.cart.productToCart
});

const mapDispatchToProps = { addProductToCart, getTotals, setProductAttribute, setProductToCart };

export default connect(mapStateToProps, mapDispatchToProps)(PDPContainer);