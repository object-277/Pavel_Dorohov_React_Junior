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
        const { product } = this.state;
        const { addProductToCart, productToCart, getTotals } = this.props;
        if (productToCart.length === 0) {
            addProductToCart(product);
        } else {
            addProductToCart(productToCart); 
        }
        getTotals();
    };

    handleSetAttribute_test = (itemIn) => {
        const { product } = this.state;
        const productCopy = JSON.parse(JSON.stringify(product));
        const { setProductToCart } = this.props;
        const { attributes } = this.state.product;
        const attributeIndex = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        productCopy.attributes[attributeIndex].items = itemIn;
        const productSelectedAttribute = Object.assign({}, productCopy, {allAttributes: attributes});
        const productToCart = Object.assign({}, {product: productSelectedAttribute}, {attributeIndex: attributeIndex}, {itemIn: itemIn});
        setProductToCart(productToCart);
    }

    ifNoAttributes() {
        this.setState({allAttributesSelected: true});    
    }

    checkAttributeSelection() {
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
       this.checkAttributeSelection();
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