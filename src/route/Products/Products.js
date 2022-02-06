import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./products.style.scss";

class Products extends PureComponent {

    renderProductCard(product, i) {
        const { products } = this.props.category;

        return (

            <Link className="product" key={ i } to="/pdp">
                <div className="product-card">
                <img className="product-image" src={ products[i].gallery[0] } alt="Nike Air Huarache Le" />
                <div className="product-content">
                    <p className="product-name" ></p>
                    <p className="product-name" ></p>
                </div> 
            </div>
            </Link>
            
        );

    }

    renderProducts() {
        const { products } = this.props.category;

        return (
            <div className="product-page">
                { products && products.map((product, i) => this.renderProductCard(product, i))}
            </div>
            
        );
    }

    render() {

        const { products } = this.props.category;
        
        return (

            <div className="Products">
                { this.renderProducts() }  
            </div>  
        );
    }

}


export default Products;