import React, { PureComponent } from "react";
import AttributeItems from "./AttributeItems.component";
import { connect } from "react-redux";
import { setItemAttribute } from "../../../redux/Cart/Cart.reducer";

class AttributeItemsContainer extends PureComponent {

    state = {
        isSelected: false
    }

    handleSetAttribute = (itemIn) => {
        const { product } = this.props;
        const { attributes } = this.props.product;
        const index2 = attributes.findIndex((attribute) => (attribute.items.includes(itemIn)));
        const index3 = attributes[index2].items.findIndex((item) => (item === itemIn));
        console.log(index2);
        console.log(index3);

        console.log(this.state);
        const { setItemAttribute } = this.props;
    
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
        setItemAttribute(test2);
    }

    render() {
        return (
            <AttributeItems
                { ...this.state } 
                { ...this.props } 
                setAttribute={ this.handleSetAttribute }
            />
        );
    }
}

const mapStateToProps = state => ({
    itemAttributes: state.cart.itemAttributes
});

const mapDispatchToProps = { setItemAttribute };

export default connect(mapStateToProps, mapDispatchToProps)(AttributeItemsContainer);