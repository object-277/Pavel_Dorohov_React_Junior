import React, { PureComponent } from "react";
import ProductAttributes from "./ProductAttributes.component";

class ProductAttributesContainer extends PureComponent {

    state = {
        selectedAttributes: [],
        isAllAttributesSelected: false
    }

    render() {
        return (
            <ProductAttributes
                { ...this.props }
            />
        );
    }
}

export default ProductAttributesContainer;