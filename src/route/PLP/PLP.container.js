import React, { PureComponent } from "react";
import Products from "./PLP.component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ProductsContainer extends PureComponent {

    render(){
        
        return(
            <Products
                { ...this.props }
            />
        );
    }
}

const mapStateToProps = state => ({
    products: state.cart.products
});

export default connect(mapStateToProps)(withRouter(ProductsContainer));