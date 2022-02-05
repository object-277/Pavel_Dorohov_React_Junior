import React, { PureComponent } from "react";
import "./product.style.scss";

class Product extends PureComponent {


    render() {

        return (
            <div className="product">
                <div className="product-card">
                <img className="product-image" src={this.props.product.gallery} alt="Nike Air Huarache Le" />
                <div className="product-content">
                    <p className="product-name" >{this.props.product.brand}</p>
                </div> 
            </div>
            </div>
            
        );
    }

}

export default Product;