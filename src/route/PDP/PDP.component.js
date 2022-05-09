import React, { PureComponent } from "react";
import PDPGalleryContainer from "./PDPGallery";
import "./PDP.style.scss";

class PDP extends PureComponent {

    getPrice() {
        const { currency} = this.props; 
        const { prices } = this.props.product;
        const index = prices.findIndex((price) => (price.currency.symbol === currency));
        
        return (
            <div className="PDP-SideSection-ProductPrice">
                <p className="PDP-SideSection-ProductPrice-CurrencySymbol">{ prices[index].currency.symbol }</p>
                <p className="PDP-SideSection-ProductPrice-Amount">{ prices[index].amount }</p>
            </div>
        );         
    }

    componentDidUpdate() { 
        this.getPrice();    
    }
    
    renderAttributeItems(item, i, attribute, index) {
        const { value } = item;
        const { setAttribute, productToCart, product } = this.props;
        const isSelectedTrue = productToCart[0] !== undefined && productToCart[0].productReadyToCart.id === product.id ? 
                               productToCart[0].productReadyToCart.attributes[index].items.id === item.id
             : false;

        const selectedStyle = {
            backgroundColor: '#1D1F22',
            color: "#FFF"
        }
        
        const selectedColorStyle = {
            width: '36px',
            height: '36px',
            border: '1px solid #5ECE7B',
            marginRight: '8px'
        };

        const ifColorItemStyle = {
            width: '32px',
            height: '32px',
            border: '1px solid transparent',
            marginRight: '8px',
            visibility: 'none'
        };     
        
        const ifColorStyle = {
            background: value,
            width: '32px',
            height: '32px',
        };

        const ifWhiteStyle = {
            background: value,
            width: '32px',
            height: '32px',
            boxSizing: 'border-box',
            border: '1px solid #1D1F22'
        }

        return (
            <div className="PDP-Attribute-Item" key={ i } 
                onClick = {
                () => setAttribute(item) 
                } 
                style={ (isSelectedTrue === true && attribute.id !== 'Color') ? selectedStyle : 
                       (isSelectedTrue === true && attribute.id === 'Color') ? selectedColorStyle : 
                        attribute.id === 'Color' ? ifColorItemStyle : null
                        
                } 
            >
                <p className="PDP-Attribute-Item-ItemText"
                   style={ (attribute.id === 'Color' && value !== '#FFFFFF') ? ifColorStyle : 
                          (attribute.id === 'Color' && value === '#FFFFFF') ? ifWhiteStyle : null
                   }
            >
               { attribute.id !== 'Color' && value }
            </p>   
            </div>
        );
    }

    renderAttributes(attribute, index) {
        const { id } = attribute;
        const { items } = attribute;
        const ifColorStyle = {
            height: '36px',
        };

        return (
            <div className="PDP-Attribute" key={ index }>
                <div className="PDP-Attribute-Name">
                    { id }:
                </div>
                <div className="PDP-Attribute-Items"
                     style={ attribute.id === 'Color' ? ifColorStyle : null }
                >
                   { items.map((item, i) => this.renderAttributeItems(item, i, attribute, index)) } 
                </div>
            </div>
        );    
    }

    renderPDP() {
        const { brand, name, description, attributes } = this.props.product;
        const { addToCart } = this.props;

        return (
            <div className="PDP-Content">
                 <section className="PDP-SideSection">
                    <p id="PDP-SideSection-Brand">{ brand }</p>
                    <p id="PDP-SideSection-Name">{ name }</p>
                    <div className="PDP-SideSection-Attributes">
                        { attributes.map((attribute, i) => this.renderAttributes(attribute, i)) }
                    </div>
                    <p id="PDP-SideSection-PriceLabel">price:</p>
                    { this.getPrice() } 
                    <button className="PDP-SideSection-AddToCart" onClick={ addToCart }>ADD TO CART</button>
                    <div id="PDP-SideSection-Description" dangerouslySetInnerHTML={{ __html: description }} />
                 </section>
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
             return <p>Loading...</p>         
        }
    }
}

export default PDP;