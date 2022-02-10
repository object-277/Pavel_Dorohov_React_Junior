import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.style.scss";

class ProductCard extends PureComponent {

    render() {
        const { brand, name, gallery, id } = this.props.product;
       
        return (

            <Link className="Product" to={ "/pdp/" + id }>
                <div className="Product-Card">
                <img className="Product-Image" src={ gallery[0] } alt="Product" />
                <div className="Product-Content">
                    <p className="Product-Brand" >{ brand }</p>
                    <p className="Product-Name" >{ name }</p>
                    <p>{ this.props.price }</p>
                </div> 
            </div>
            </Link>
            
        );

    }

}

export default ProductCard;