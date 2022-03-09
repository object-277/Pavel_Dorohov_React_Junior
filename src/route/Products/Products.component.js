import React, { PureComponent } from "react";
import ProductCardContainer from "../../components/ProductCard/ProductCard.container";
import "./Products.style.scss";

class Products extends PureComponent {

    renderProducts() {
        const { category: { products = [] } = {}, Category } = this.props;
        if (Category !== "all") {
           const filteredProducts = products.filter((product) => product.category === Category)
           return (
                <div className="Product-Page"> 
                    { products && filteredProducts.map((product, i) => <ProductCardContainer product={ product } key={ i } /> )}
                </div> 
           );
        } else {
            return (
                <div className="Product-Page">
                    { products && products.map((product, i) => 
                    <ProductCardContainer 
                        { ...this.props }
                        product={ product } 
                        key={ i } 
                    /> 
                    )}
                </div>
            );
        }
    }

    render() {
        const { Category } = this.props;

        return (
            <div className="Products">
                 <h1 className="Products-CategoryName">{ Category }</h1>
                { this.renderProducts() }  
            </div>  
        );
    }
}

export default Products;