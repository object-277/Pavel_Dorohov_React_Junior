import React, { PureComponent } from "react";
import PDPGalleryContainer from "./PDPGallery";
import "./PDP.style.scss";

class PDP extends PureComponent {

    getPrice() {
        const { currency} = this.props; 
        const { prices } = this.props.product;
        const index = prices.findIndex((price) => (price.currency.symbol === currency));
        return (
            <div className="PDP-Content-SideSection-ProductPrice">
                <p className="PDP-Content-SideSection-ProductPrice-CurrencySymbol">{ prices[index].currency.symbol }</p>
                <p className="PDP-Content-SideSection-ProductPrice-Amount">{ prices[index].amount }</p>
            </div>
        );         
    }

    componentDidUpdate() { 
        this.getPrice();    
    }
    
    renderAttributeItems(item, i, attribute, index) {
        const { value } = item;
        const { setAttribute, productToCart, product } = this.props;
        const selectedStyle = {
            background: '#1D1F22',
            color: '#FFF'
        };
        const isSelectedTrue = productToCart[0] !== undefined && productToCart[0].productReadyToCart.id === product.id ? 
                               productToCart[0].productReadyToCart.attributes[index].items.id === item.id
             : false;
        
        const ifColorStyle = {
            background: value,
            width: '63px',
            height: '45px',
            border: '1px solid #1D1F22'
        };

        return (
            
            <div className="PDP-Content-SideSection-Attributes-Items-Item" key={ i } 
                onClick = {
                () => setAttribute(item) 
                } 
               style={ isSelectedTrue === true ? selectedStyle : null 
               } 
            >
                <p className="PDP-Content-SideSection-Attributes-Items-ItemText"
               style={ attribute.id === 'Color' ? ifColorStyle : null  }
            >
               { attribute.id !== 'Color' && value }
            </p>   
            </div>
        );
    }

    renderAttributes(attribute, index) {
        const { id } = attribute;
        const { items } = attribute;

        return (
            <div className="PDP-Content-SideSection-Attributes" key={ index }>
                <div className="PDP-Content-SideSection-Attributes-Name">
                    { id }:
                </div>
                <div className="PDP-Content-SideSection-Attributes-Items">
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
                 <div className="PDP-Content-SideSection">
                    <p id="PDP-Content-SideSection-Brand">{ brand }</p>
                    <p id="PDP-Content-SideSection-Name">{ name }</p>
                    { attributes.map((attribute, i) => this.renderAttributes(attribute, i)) }
                    <p id="PDP-Content-SideSection-PriceLabel">price:</p>
                    { this.getPrice() } 
                    <button className="PDP-Content-SideSection-AddToCart" onClick={ addToCart }>ADD TO CART</button>
                    {/*<p id="PDP-Description">{ description }</p>*/}
                    <div id="PDP-Content-SideSection-Description" dangerouslySetInnerHTML={{ __html: description }} />
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
             return <p>Loading...</p>         
        }
    }
}

export default PDP;