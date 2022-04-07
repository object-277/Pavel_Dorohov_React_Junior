import React, { PureComponent } from "react";
import PDP from "./PDP.component";
import { executePost } from "../../util/Request.util";
import { Field, Query } from "@tilework/opus";
import { connect } from "react-redux";
import { setItemInCart, getTotals, setItemAttribute, setProductToCart } from "../../redux/Cart/Cart.reducer";

class PDPContainer extends PureComponent {

    state = {
        isProductInCart: null     
        //productToCart: localStorage.getItem("productToCart") 
        //? JSON.parse(localStorage.getItem("productToCart")) 
       // : []
    };

    handleAddToCart = () => {
        const { setItemInCart, productToCart } = this.props;
        const { product } = this.state;
        if (productToCart.length > 0) {
            const { attributes } = this.props.productToCart[0].productReadyToCart;
            const ifAllAttributesSelected = attributes.every((attribute) => Object.entries(attribute.items).length === 2);
            if (ifAllAttributesSelected) {
                //if ( productToCart.length === 0) {
                //  setItemInCart(product);        
                //} else {
                    setItemInCart(productToCart[0].productReadyToCart);
                //}
                this.props.getTotals();
                console.log(ifAllAttributesSelected);
                console.log("success");
            } else {
                console.log("SELECT ALL ATTRIBUTES"); 
            }
        } else {
            
            console.log("SELECT ALL ATTRIBUTES"); 
        }
    };

    /*handleSetAttribute = (itemIn) => {
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
    }*/
  
    handleSetAttribute = (itemIn) => {
        const { product, productToCart } = this.state;
        const productSelectedAttribute = JSON.parse(JSON.stringify(product));
        console.log(productSelectedAttribute);
        const { attributes } = this.state.product;
        const { setProductToCart } = this.props;
        const index2 = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = attributes[index2].items.findIndex((item) => (item === itemIn));
        const attributeName = product.attributes[index2].id;
        console.log(index2);
        console.log(index3);
        console.log(itemIn);
        
            /*if (productToCart.attributes[index2].items.id === itemIn.id) {
                console.log("test");
                productSelectedAttribute.attributes[index2] = product.attributes[index2];
            } else if (productSelectedAttribute.attributes[index2].id === itemIn.selectedAttribute ) 
                 {
                    productSelectedAttribute.attributes[index2].items = itemIn;
                    console.log("test");
            } else {*/
                 const filtered = product.attributes[index2].items.filter((item) =>
             (item.id === itemIn.id));
             console.log(filtered);
             productSelectedAttribute.attributes[index2].items = itemIn;
             //}
             //localStorage.setItem("productToCart", JSON.stringify(productSelectedAttribute));
             const productAttributes = product.attributes;
             const testProduct = Object.assign({}, productSelectedAttribute, {allAttributes: productAttributes});
             console.log(testProduct);
             const testToCart =  Object.assign({}, {productReadyToCart: testProduct }, {selectedAttribute: attributeName}, {allAttributes: attributes}, {itemIn: itemIn}, {product:product});
             console.log(testToCart);
             setProductToCart(testToCart);
    }
        /*localStorage.setItem("cartItems", JSON.stringify(state.itemsInCart));

        let ifAlreadyInState = state.itemAttributes.some((item) => JSON.stringify(item) === JSON.stringify(action.payload));
        let ifAlreadyInState2 = state.itemAttributes.some((item) => JSON.stringify(item.selectedAttribute) === JSON.stringify(action.payload.selectedAttribute));
        const needFindIndex = state.itemAttributes.findIndex((item) => (item.id === action.payload.id));
        if (ifAlreadyInState === true) {
            state.itemAttributes = state.itemAttributes.filter((item) => (item.itemIn.id !== action.payload.itemIn.id));
        } else if (state.itemAttributes[needFindIndex] !== undefined &&
                   state.itemAttributes[needFindIndex].id === action.payload.id && 
                   ifAlreadyInState2 === true) {
            state.itemAttributes[needFindIndex].itemIn = action.payload.itemIn;
        } else {
            state.itemAttributes.push(action.payload);
        }
        localStorage.setItem("selectedAttributes", JSON.stringify(state.itemAttributes));*/   

    checkIfInCart() {
        const { product } = this.state;
        const ifInCart = this.props.itemsInCart.some((productInCart) => productInCart.id === product.id);
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
    itemsInCart: state.cart.itemsInCart,
    currency: state.cart.currency,
    itemAttributes: state.cart.itemAttributes,
    productToCart: state.cart.productToCart
});

const mapDispatchToProps = { setItemInCart, getTotals, setItemAttribute, setProductToCart };

export default connect(mapStateToProps, mapDispatchToProps)(PDPContainer);