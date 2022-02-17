import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.style.scss";
import CircleIcon from "./CircleIcon.svg";

class ProductCard extends PureComponent {

    render() {
        const { brand, name, gallery, id } = this.props.product;
        const { onMouseOver, onMouseOut, isHovering, updateConfig, onClick } = this.props;

        return (
            <div className="Product" onMouseOver={ onMouseOver } onMouseOut={ onMouseOut }>
                <Link className="Product-Card" to={ "/pdp/" + id } > 
                    <img className="Product-Image" src={ gallery[0] } alt="Product" />
                    <div className="Product-Content">
                        <p className="Product-Brand" >{ brand }</p>
                        <p className="Product-Name" >{ name }</p>
                        <p>{ this.props.price }</p>
                    </div> 
                </Link>
                <img className="Product-AddToCartIcon" src={ CircleIcon } alt="Add To Cart" onClick={ onClick }/> 
            </div>
        );
    }
}

export default ProductCard;