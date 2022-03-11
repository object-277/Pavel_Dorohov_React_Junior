import React, { PureComponent } from "react";
import ProductCard from "./ProductCard.component";
import { connect } from "react-redux";
import { setItemInCart, getTotals } from "../../redux/Cart/Cart.reducer";

class ProductCardContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            prices: this.props.product.prices
        }
        this.handleAddToCart = this.handleAddToCart.bind(this);
    };

    handleAddToCart  = () => {
        const { product, setItemInCart } = this.props;
        setItemInCart(product);
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
    itemsInCart: state.cart.itemsInCart,
    currency: state.cart.currency
});

const mapDispatchToProps = { setItemInCart, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
