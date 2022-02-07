import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.style.scss";

class ProductCard extends PureComponent {

    render() {
        const { product } = this.props;

        return (

            <Link className="product" to="/pdp">
                <div className="product-card">
                <img className="product-image" src={ product.gallery[0] } alt="Product Card" />
                <div className="product-content">
                    <p className="product-name" ></p>
                    <p className="product-name" ></p>
                </div> 
            </div>
            </Link>
            
        );

    }

}

export default ProductCard;