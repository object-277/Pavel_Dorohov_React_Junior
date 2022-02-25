import React, { PureComponent } from "react";
import ProductCard from "./ProductCard.component";
import { connect } from "react-redux";
import { setItemInCart, getTotals } from "../../redux/Cart/test.reducer";

class ProductCardContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            price: [],
            isHovering: false
        }
        this.handleAddToCart = this.handleAddToCart.bind(this);
    };

    handleAddToCart  = () => {
        const { product, setItemInCart } = this.props;
        setItemInCart(product);
        this.props.getTotals();
    };
  
    componentDidMount() {
        this.getPrice();
    }

    getPrice() {
        const { prices } = this.props.product;

        switch (document.getElementById("Currency-Label").innerText) {
            case "£":
                this.setState({price: prices[1].amount})
                console.log(this.state.price);
                break;
                
            default:
                this.setState({price: prices[0].amount})
        }
    }

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
    itemsInCart: state.cart.itemsInCart
});

const mapDispatchToProps = { setItemInCart, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
