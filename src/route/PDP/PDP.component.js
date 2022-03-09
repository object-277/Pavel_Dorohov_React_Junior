import React, { PureComponent } from "react";
import PDPGalleryContainer from "./PDPGallery";
import ProductPriceContainer from "../../components/ProductPrice";
import "./PDP.style.scss";

class PDP extends PureComponent {
  
    componentDidMount() {
        console.log(this.props.product);
    }

    componentDidUpdate() { 
        console.log(this.props.product);    
    }
    
    renderAttributeItems(item, i) {
        const { value } = item;

        return (
            <div className="PDP-AttributeItem" key={ i }>
                <p className="PDP-ItemText">{ value }</p> 
            </div>
        );
    }

    renderAttributes(attribute, i) {
        const { id } = attribute;
        const { items } = attribute;

        return (
            <div className="PDP-Attributes" key={ i }>
                <div className="PDP-AttributeName">
                    { id }
                </div>
                <div className="PDP-AttributeItems">
                   { items.map((item, i) => this.renderAttributeItems(item, i)) } 
                </div>
            </div>
        );    
    }

    renderPDP() {
        const { brand, name, description, attributes } = this.props.product;
        const { addToCart } = this.props;

        return (
            <div className="PDP-Content">
                 <div className="PDP-SideSection">
                    <p id="PDP-Brand">{ brand }</p>
                    <p id="PDP-Name">{ name }</p>
                    { attributes.map((attribute, i) => this.renderAttributes(attribute, i)) }
                    <p id="PDP-PriceLabel">price:</p>
                         
                    <button className="PDP-AddToCart" onClick={ addToCart }>ADD TO CART</button>
                    <p id="PDP-Description">{ description }</p>
                 </div>
            </div>  
        ); 
    }
    
    render() {
        if ( this.props.product !== undefined ) {
            return (
                <div className="PDP">
                    { this.renderPDP() }
                    <PDPGalleryContainer 
                        { ...this.props }
                    />
                </div>
            );
        } else {
             return <p>error</p>         
        }
    }
}

export default PDP;