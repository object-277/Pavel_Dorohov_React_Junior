import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";
import { connect } from "react-redux";
import { addProductToCart, getTotals, setProductAttribute, setProductToCart } from "../../redux/Cart/Cart.reducer";

class PDPContainer extends PureComponent {

    state = {
        allAttributesSelected : false,
        showWarning: false     
    };

    handleWarning = () => {        // Not all product's attributes are selected warning     
        this.setState({showWarning: true});     
        setTimeout(() => this.setState({showWarning: false}), 3500);     
    }

    handleAddToCart = () => {
        const { addProductToCart, productToCart } = this.props;
        addProductToCart(productToCart[0].productReadyToCart);
        this.props.getTotals();
    };
  
    handleSetAttribute = (itemIn) => {
        const { product } = this.state;
        const productCopy = JSON.parse(JSON.stringify(product));  // Made copy of the product to avoid direct state modifying
        const { attributes } = this.state.product;
        const { setProductToCart } = this.props;
        const attributeIndex = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const attributeName = product.attributes[attributeIndex].id;
        productCopy.attributes[attributeIndex].items = itemIn;
        const productAttributes = product.attributes;
        const productSelectedAttribute = Object.assign({}, productCopy, {allAttributes: productAttributes}); // allAttributes is needed to show product's all attributes in CartPage and CartMenu 
        // productToCart is product with selected attributes. productReadyToCart will be added to Cart from PDP  
        const productToCart =  Object.assign({}, {productReadyToCart: productSelectedAttribute }, {selectedAttribute: attributeName}, {itemIn: itemIn}, {product: product});
        setProductToCart(productToCart);
    }

    checkAttributeSelection() {
        const { productToCart } = this.props;
        if (productToCart.length > 0) {
            const { productReadyToCart } = this.props.productToCart[0];
            // if every attribute of the product is not array, but object, then all attributes have been selected  
            const allSelected = productReadyToCart.attributes.every((attribute) => attribute.items.constructor === Object);
            if (allSelected) {
                this.setState({allAttributesSelected: true});
            } else {
                this.setState({allAttributesSelected: false});
            }
        } else {
            this.setState({allAttributesSelected: false});
        }
    }

    componentDidMount() {
        this.productQuery();
    }

    componentDidUpdate() {
        this.checkAttributeSelection();
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
                    setAttribute={ this.handleSetAttribute }
                    warning={ this.handleWarning }
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
    productToCart: state.cart.productToCart
});

const mapDispatchToProps = { addProductToCart, getTotals, setProductAttribute, setProductToCart };

export default connect(mapStateToProps, mapDispatchToProps)(PDPContainer);