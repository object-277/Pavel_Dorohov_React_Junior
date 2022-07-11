import React, { PureComponent } from "react";
import ReactHtmlParser from 'react-html-parser';
import PDPGalleryContainer from "./PDPGallery";
import "./PDP.style.scss";
const COLOR = 'Color';

class PDP extends PureComponent {

    getPrice() {
        const { currency, product } = this.props;
        const { prices } = this.props.product || [];
        const index = prices !== undefined ? prices.findIndex((price) => (price.currency.symbol === currency)) : 0;
        if (product) {
            return (
                <div className="PDP-SideSection-ProductPrice">
                    <p className="PDP-SideSection-ProductPrice-CurrencySymbol">{prices[index].currency.symbol}</p>
                    <p className="PDP-SideSection-ProductPrice-Amount">{prices[index].amount}</p>
                </div>
            );
        }
    }

    getAttributeItemClass(attribute, index, item) {
        const { productToCart, product, showWarning } = this.props;
        const isSelectedTrue = productToCart !== undefined && productToCart.id === product.id ?
            productToCart.attributes[index].items.id === item.id
            : false;
        const attributeNotSelected = productToCart !== undefined && productToCart.id === product.id ?
            productToCart.attributes[index].items.id === attribute.items.id
            : true;
        if (attributeNotSelected && showWarning) {
            return "PDP-Attribute-Item-Warning";
        } else if (isSelectedTrue && attribute.id !== COLOR) {
            return "PDP-Attribute-Item-Active";
        } else if (isSelectedTrue === false && attribute.id === COLOR) {
            return "PDP-Attribute-Color";
        } else if (isSelectedTrue && attribute.id === COLOR) {
            return "PDP-Attribute-Color-Active";
        } else {
            return "PDP-Attribute-Item";
        }
    }

    componentDidUpdate() {
        this.getPrice();
        this.props.ifNoAttributes();
    }

    renderAttributeItems(item, i, attribute, index) {
        const { value } = item;
        const { setAttribute } = this.props;
        const colorStyle = {
            background: value,
            width: '32px',
            height: '32px',
            margin: '0px',
            border: '1px solid #1D1F22',
            boxSizing: 'border-box'
        };

        return (
            <div className={this.getAttributeItemClass(attribute, index, item)} key={i}
                onClick={() => setAttribute(item)}
            >
                <p className="PDP-Attribute-Item-ItemText"
                    style={attribute.id === COLOR ? colorStyle : null}
                >
                    {attribute.id !== COLOR && value}
                </p>
            </div>
        );
    }

    renderAttributes(attribute, index) {
        const { showWarning, product, productToCart } = this.props;
        const { id } = attribute;
        const { items } = attribute;
        const notSelected = productToCart !== undefined && productToCart.id === product.id ?
            productToCart.attributes[index].items.id === attribute.items.id
            : true;

        return (
            <div className="PDP-Attribute" key={index}>
                <div className={showWarning && notSelected ? "PDP-Attribute-NotSelected" : "PDP-Attribute-Name"}>
                    {id}:
                </div>
                <div className={attribute.id === COLOR ? "PDP-Attribute-Items-Color" : "PDP-Attribute-Items"}>
                    {items.map((item, i) => this.renderAttributeItems(item, i, attribute, index))}
                </div>
            </div>
        );
    }

    renderPDP() {
        const { allAttributesSelected, addToCart, warning, showWarning } = this.props;
        const { brand, name, description, attributes, inStock } = this.props.product;

        if (inStock === true) {
            return (
                <div className="PDP-Content">
                    <section className="PDP-SideSection">
                        <p id="PDP-SideSection-Brand">{brand}</p>
                        <p id="PDP-SideSection-Name">{name}</p>
                        <div className={showWarning ? "PDP-SideSection-Attributes-Warning" : "PDP-SideSection-Attributes"}>
                            {attributes.map((attribute, index) => this.renderAttributes(attribute, index))}
                        </div>
                        {showWarning && <div id="PDP-Warning">Please select product options!</div>}
                        <p id="PDP-SideSection-PriceLabel">price:</p>
                        {this.getPrice()}
                        <button className="PDP-SideSection-AddToCart" onClick={(allAttributesSelected || attributes.length === 0) ? addToCart : warning}>add to cart</button>
                        <div id="PDP-SideSection-Description">
                            {ReactHtmlParser(description)}
                        </div>
                    </section>
                </div>
            );
        } else {
            return (
                <div className="PDP-Content">
                    <section className="PDP-SideSection">
                        <p id="PDP-SideSection-Brand">{brand}</p>
                        <p id="PDP-SideSection-Name">{name}</p>
                        <div className={"PDP-SideSection-Attributes"}>
                            {attributes.map((attribute, index) => this.renderAttributes(attribute, index))}
                        </div>
                        <p id="PDP-SideSection-PriceLabel">price:</p>
                        {this.getPrice()}
                        <button className="PDP-SideSection-OutOfStock">out of stock</button>
                        <div id="PDP-SideSection-Description">
                            {ReactHtmlParser(description)}
                        </div>
                    </section>
                </div>
            );
        }
    }

    render() {
        if (this.props.product !== undefined) {
            return (
                <div className="PDP">
                    <PDPGalleryContainer
                        {...this.props}
                    />
                    {this.renderPDP()}
                </div>
            );
        } else {
            return <p>Loading...</p>
        }
    }
}

export default PDP;