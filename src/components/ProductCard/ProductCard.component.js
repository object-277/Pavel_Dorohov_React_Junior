import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.style.scss";
import CircleIcon from "./CircleIcon.svg";

class ProductCard extends PureComponent {
    
    getPrice() {
        const { currency} = this.props; 
        const { prices } = this.props;
        const index = prices.findIndex((price) => (price.currency.symbol === currency));

        return (
            <div className="ProductCard-Content-Price">
                <p className="ProductCard-Content-PriceCurrencySymbol">{ prices[index].currency.symbol }</p>
                <p className="ProductCard-Content-PriceAmount">{ prices[index].amount }</p>
            </div>
        );         
    }

    componentDidMount() {
        this.getPrice();
    }

    render() {
        const { id, gallery, brand, name, inStock } = this.props.product;
        const { product, addToCart } = this.props;

        if ( inStock === true ) {
            return (
                <div className="ProductCard">
                    <Link className="ProductCard-Link" to={ "/pdp/" + id } >
                        <div className="ProductCard-Image-Wrapper">
                            <img className="ProductCard-Image" src={ gallery[0] } 
                                alt="Product" 
                            />
                        </div> 
                        <div className="ProductCard-Content">
                            <div className="ProductCard-Content-ProductName">
                                <p id="ProductCard-Content-Brand" >{ brand }</p>
                                <p id="ProductCard-Content-Name" >{ name }</p>
                            </div>
                            { this.getPrice() }
                        </div> 
                    </Link>
                    <img className="ProductCard-AddToCartIcon" 
                         src={ CircleIcon } 
                         alt="Add To Cart" 
                         onClick={() => addToCart(product) }
                    /> 
                </div>
            );
        } else {
            return (
                <div className="ProductCard-OutOfStock" >
                    <p className="ProductCard-OutOfStockLabel">out of stock</p>
                    <div className="ProductCard-Image-Wrapper">
                            <img className="ProductCard-Image" src={ gallery[0] } 
                                alt="Product" 
                            />
                    </div> 
                    <div className="ProductCard-Content">
                        <div className="ProductCard-Content-ProductName">
                            <p id="ProductCard-Content-Brand" >{ brand }</p>
                            <p id="ProductCard-Content-Name" >{ name }</p>
                        </div>
                        { this.getPrice() }
                    </div> 
                </div>   
            );
        }
    }
}

export default ProductCard;