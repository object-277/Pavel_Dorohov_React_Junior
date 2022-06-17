import React, { PureComponent } from "react";
import ProductCard from "./ProductCard.component";
import { connect } from "react-redux";
import { addProductToCart, getTotals } from "../../redux/Cart/Cart.reducer";

class ProductCardContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            prices: this.props.product.prices
        }
        this.handleAddToCart = this.handleAddToCart.bind(this);
    };

    handleAddToCart  = () => {
        const { product, addProductToCart } = this.props;
        const productAttributes = product.attributes;
        const productCopy = JSON.parse(JSON.stringify(product));
        productCopy.attributes.map((attribute) => attribute.items.splice(1));
        productCopy.attributes.map((attribute) =>(attribute.items = Object.assign({}, attribute.items[0])));
        const productToCart = Object.assign({}, productCopy, {allAttributes: productAttributes});
        addProductToCart(productToCart);
        this.props.getTotals();
    };

    render(){

        return(
            <ProductCard
                { ...this.props }
                { ...this.state }
                addToCart={ this.handleAddToCart }
            />
        );
    }
}

const mapStateToProps = state => ({
    productsInCart: state.cart.productsInCart,
    currency: state.cart.currency
});

const mapDispatchToProps = { addProductToCart, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
