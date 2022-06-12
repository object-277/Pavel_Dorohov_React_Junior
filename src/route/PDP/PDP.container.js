import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";
import { connect } from "react-redux";
import { addProductToCart, getTotals, setProductAttribute, setProductToCart } from "../../redux/Cart/Cart.reducer";

class PDPContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allAttributesSelected : false,
            showWarning: false     
        };
        this.ifNoAttributes = this.ifNoAttributes.bind(this);
    }


    handleWarning = () => {        // Not all product's attributes are selected warning     
        this.setState({showWarning: true});     
        setTimeout(() => this.setState({showWarning: false}), 3000);     
    }

    handleAddToCart = () => {
        const { addProductToCart, productToCart, product } = this.props;
        if (productToCart.length === 0) {
            addProductToCart(product);
        } else {
            addProductToCart(productToCart); 
        }
        this.props.getTotals();
    };
  
    /*handleSetAttribute = (itemIn) => {
        const { product } = this.state;
        /* const productCopy = JSON.parse(JSON.stringify(product));  // Made copy of the product to avoid direct state modifying
        const { attributes } = this.state.product;
        const { setProductToCart } = this.props;
        const attributeIndex = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const attributeName = product.attributes[attributeIndex].id;
        productCopy.attributes[attributeIndex].items = itemIn;
        const productAttributes = product.attributes;
        const productSelectedAttribute = Object.assign({}, productCopy, {allAttributes: productAttributes}); // allAttributes is needed to show product's all attributes in CartPage and CartMenu 
        // productToCart is product with selected attributes. productReadyToCart will be added to Cart from PDP  
        const productToCart =  Object.assign({}, {productReadyToCart: productSelectedAttribute }, {selectedAttribute: attributeName}, {itemIn: itemIn}, {product: product});
        const { setProductToCart } = this.props;
        const { attributes } = this.state.product;
        const attributeIndex = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
       // const attributeName = product.attributes[attributeIndex].id;
        const selectedAttribute = Object.assign({}, {product: product}, {attributeIndex: attributeIndex}, {itemIn: itemIn}, {allAttributes: attributes});
        console.log(selectedAttribute);
        //console.log(product.product.attributes[0]);
        setProductToCart(selectedAttribute);
    }*/

    handleSetAttribute_test = (itemIn) => {
        //const { product } = this.state;
        /* const productCopy = JSON.parse(JSON.stringify(product));  // Made copy of the product to avoid direct state modifying
        const { attributes } = this.state.product;
        const { setProductToCart } = this.props;
        const attributeIndex = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const attributeName = product.attributes[attributeIndex].id;
        productCopy.attributes[attributeIndex].items = itemIn;
        const productAttributes = product.attributes;
        const productSelectedAttribute = Object.assign({}, productCopy, {allAttributes: productAttributes}); // allAttributes is needed to show product's all attributes in CartPage and CartMenu 
        // productToCart is product with selected attributes. productReadyToCart will be added to Cart from PDP  
        const productToCart =  Object.assign({}, {productReadyToCart: productSelectedAttribute }, {selectedAttribute: attributeName}, {itemIn: itemIn}, {product: product});*/

        //const product = JSON.parse(localStorage.getItem("productSetToCart"));
        const { product } = this.state;
        const productCopy = JSON.parse(JSON.stringify(product));
        const { setProductToCart } = this.props;
        const { attributes } = this.state.product;
        console.log(product);
        const attributeIndex = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        productCopy.attributes[attributeIndex].items = itemIn;
       // const attributeName = product.attributes[attributeIndex].id;
        console.log(product);
        const productSelectedAttribute = Object.assign({}, productCopy, {allAttributes: attributes});
        const productToCart = Object.assign({}, {product: productSelectedAttribute}, {attributeIndex: attributeIndex}, {itemIn: itemIn});
        console.log(productToCart);
        //console.log(product.product.attributes[0]);
        setProductToCart(productToCart);
    }

    ifNoAttributes() {
        this.setState({allAttributesSelected: true});    
    }

    checkAttributeSelection() {
        const { product } = this.state;
        const { productToCart } = this.props;
        if (productToCart.length !== 0) {
            // if every attribute of the product is not array, but object, then all attributes have been selected  
            const allSelected = productToCart.attributes.every((attribute) => attribute.items.constructor === Object);
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
       // this.checkAttributeSelection();
    }

    componentWillUnmount() {
        localStorage.setItem("productSetToCart", "[]");
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
            if (localStorage.getItem("productSetToCart").length !== 0) {
                const productItem = JSON.parse(localStorage.getItem("productSetToCart"));
                if (productItem.id === this.state.product.id) {
                    return null;
                } else {
                    localStorage.setItem("productSetToCart", JSON.stringify(product)); 
                }
            } else {
                localStorage.setItem("productSetToCart", JSON.stringify(product));     
            }
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
                    setAttribute={ this.handleSetAttribute_test }
                    ifNoAttributes={ this.ifNoAttributes }
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