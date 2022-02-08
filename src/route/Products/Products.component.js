import React, { PureComponent } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.component";
import "./Products.style.scss";

class Products extends PureComponent {

    renderProducts() {
        const { category: { products = [] } = {} } = this.props;

        return (
            <div className="Product-Page">
                { products && products.map((product, i) => <ProductCard product={ product } key={ i }/> )}
            </div>
            
        );
    }

    render() {

        return (

            <div className="Products">
                { this.renderProducts() }  
            </div>  
        );
    }

}

export default Products;