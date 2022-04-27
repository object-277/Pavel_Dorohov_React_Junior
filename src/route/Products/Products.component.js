import React, { PureComponent } from "react";
import ProductCardContainer from "../../components/ProductCard/ProductCard.container";
import "./Products.style.scss";

class Products extends PureComponent {

    renderProducts() {
        const { products = [] , selectedCategory } = this.props;
        const { pathname } = this.props.location;
        const productsCategory = pathname.replace('/', '');
        if (productsCategory !== "all" && pathname !== "/") {
           const filteredProducts = products.filter((product) => product.category === productsCategory);
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
        const { selectedCategory } = this.props;
        const { pathname } = this.props.location;
        const productsCategory = pathname.replace('/', '');

        return (
            <div className="Products">
                { productsCategory !== "all" ? 
                    <h1 id="Products-CategoryName">{ productsCategory}</h1> :
                    <h1 id="Products-CategoryName">all</h1>
                }
                { this.renderProducts() }  
            </div>  
        );
    }
}

export default Products;