import React, { PureComponent } from "react";
import AttributeItems from "./AttributeItems.component";
import { connect } from "react-redux";
import { setProductAttribute } from "../../../redux/Cart/Cart.reducer";

class AttributeItemsContainer extends PureComponent {

    state = {
        isSelected: false,
        productAttributes: this.props.product.attributes
    }

   /* handleSetAttribute = (itemIn) => {
        const { product } = this.props;
        const { attributes } = this.props.product;
        const index2 = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = attributes[index2].items.findIndex((item) => (item === itemIn));
        console.log(index2);
        console.log(index3);

        console.log(this.state);
        const { setProductAttribute } = this.props;
    
        const extract = (({ id, attributes}) => ({ id, attributes}))(product);
        const test = (({ id }) => ({ id }))(product);
        console.log(test);
       
        if (this.props.product !== undefined) { 
            console.log(this.props.product.attributes[index2]);
            extract.attributes[index2].items.filter((item) => item === itemIn);
            console.log(extract);
        }
        else { return console.log("error")};
        const attributeName = product.attributes[index2].id;
        const allAttributeItems = product.attributes[index2].items;
        const test2 = Object.assign({}, test, { selectedAttribute: attributeName, allAttributeItems, itemIn });
        console.log(test2);
        this.setState(prevState => ({
            isSelected: !prevState.isSelected
        }));
        setProductAttribute(test2);
    }

    handleSetAttributeNotInCart = (itemIn) => {
        const { productAttributes } = this.state;
        const { product } = this.props;
        const { attributes } = this.props.product;
        const index2 = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = attributes[index2].items.findIndex((item) => (item === itemIn));
        console.log(index2);
        console.log(index3);
        this.setState(prevState => ({
            isSelected: !prevState.isSelected
        }));

         if (product[attributeIndex].attributes[attributeIndex2].items.id === itemIn.id) {
            product[attributeIndex].attributes = productAttributes;
        } else if (product[attributeIndex].attributes[attributeIndex2].id === action.payload.selectedAttribute &&
                    state.productsInCart[attributeIndex].id === action.payload.id
            ) 
            {
                state.productsInCart[attributeIndex].attributes[attributeIndex2].items = action.payload.itemIn;
        } else {
            state.productsInCart[attributeIndex].attributes[attributeIndex2].items = state.productsInCart[attributeIndex].attributes[attributeIndex2].items.filter((productInCart) =>
        (productInCart.id === action.payload.itemIn.id));
        }
        localStorage.setItem("cartProducts", JSON.stringify(state.productsInCart));

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
        localStorage.setItem("selectedAttributes", JSON.stringify(state.itemAttributes));
    }*/

    render() {
        const { handleSetAttribute, handleSetAttributeNotInCart } = this.props;
        return (
            <AttributeItems
                { ...this.state } 
                { ...this.props } 
                setAttribute={ handleSetAttribute }
                setAttributeIfNotInCart={ handleSetAttributeNotInCart }
            />
        );
    }
}

const mapStateToProps = state => ({
    itemAttributes: state.cart.itemAttributes
});

const mapDispatchToProps = { setProductAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(AttributeItemsContainer);