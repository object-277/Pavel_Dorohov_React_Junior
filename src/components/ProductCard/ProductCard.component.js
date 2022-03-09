import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.style.scss";
import CircleIcon from "./CircleIcon.svg";
import ProductPriceContainer from "../ProductPrice/ProductPrice.container";

class ProductCard extends PureComponent {

    render() {
        const { id, gallery, brand, name, inStock } = this.props.product;
        const { product, addToCart } = this.props;

        if ( inStock === true ) {
            return (
                <div className="Product" >
                    <Link className="Product-Card" to={"/pdp/" + id } > 
                        <img className="Product-Image" src={ gallery[0] } 
                             alt="Product" 
                        />
                        <div className="Product-Content">
                            <p id="Product-Brand" >{ brand }</p>
                            <p id="Product-Name" >{ name }</p>
                            <ProductPriceContainer 
                                { ...this.props }
                            />
                        </div> 
                    </Link>
                    <img className="Product-AddToCartIcon" 
                         src={ CircleIcon } 
                         alt="Add To Cart" 
                         onClick={() => addToCart(product) }
                    /> 
                </div>
            );
        } else {
            return (
                <div className="Product-OutOfStock" >
                    <div className="Product" >
                    <p className="OutOfStockLabel">out of stock</p>
                        <img className="Product-Image" src={ gallery[0] } 
                                alt="Product" 
                        />
                        <div className="Product-Content">
                            <p id="Product-Brand" >{ brand }</p>
                            <p id="Product-Name" >{ name }</p>
                            <ProductPriceContainer 
                                { ...this.props }
                            />
                        </div> 
                    </div>
                </div>   
            );
        }
    }
}

export default ProductCard;