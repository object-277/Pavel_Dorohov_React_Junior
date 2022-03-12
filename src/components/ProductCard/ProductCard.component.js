import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.style.scss";
import CircleIcon from "./CircleIcon.svg";
import ProductPriceContainer from "../ProductPrice/ProductPrice.container";

class ProductCard extends PureComponent {
    
    getPrice() {
        const { currency} = this.props; 
        const { prices } = this.props;
        const index = prices.findIndex((price) => (price.currency.symbol === currency));
        
        return (
            <div className="ProductPrice">
                <p className="ProductPrice-CurrencySymbol">{ prices[index].currency.symbol }</p>
                <p className="ProductPrice-Amount">{ prices[index].amount }</p>
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
                <div className="Product" >
                    <Link className="Product-Card" to={"/pdp/" + id } > 
                        <img className="Product-Image" src={ gallery[0] } 
                             alt="Product" 
                        />
                        <div className="Product-Content">
                            <p id="Product-Brand" >{ brand }</p>
                            <p id="Product-Name" >{ name }</p>
                            { this.getPrice() }
                            {/*<ProductPriceContainer 
                                { ...this.props }
                            />*/}
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