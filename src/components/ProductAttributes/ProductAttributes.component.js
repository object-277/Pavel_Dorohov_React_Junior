import React, { PureComponent } from "react";
import AttributeItemsContainer from "./AttributeItems/AttributeItems.container";

class ProductAttributes extends PureComponent {

    renderAttributes(attribute, i) {
        const { id, items } = attribute;

        return (
            <div className="PDP-Attributes" key={ i }>
                <div className="PDP-AttributeName">
                    { id }
                </div>
                <div className="PDP-AttributeItems">
                   { items.map((item, i) => <AttributeItemsContainer attribute ={ id } item={ item } { ...this.props } key={ i } /> ) } 
                </div>
            </div>
        );    
    }

    render() {
        const { attributes } = this.props.product;

        return (
            <>
                { attributes.map((attribute, i) => this.renderAttributes(attribute, i)) }
            </>
        );
    }
}

export default ProductAttributes;