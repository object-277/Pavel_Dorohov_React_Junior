import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.style.scss";

class ProductCard extends PureComponent {

    render() {
        const { product } = this.props;
        const { brand } = this.props.product;
        const { name } = this.props.product;

        return (

            <Link className="Product" to="/pdp">
                <div className="Product-Card">
                <img className="Product-Image" src={ product.gallery[0] } alt="Product Card" />
                <div className="Product-Content">
                    <p className="Product-Brand" >{ brand }</p>
                    <p className="Product-Name" >{ name }</p>
                </div> 
            </div>
            </Link>
            
        );

    }

}

export default ProductCard;