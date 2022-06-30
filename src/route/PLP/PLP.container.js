import React, { PureComponent } from "react";
import PLP from "./PLP.component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class PLPContainer extends PureComponent {

    render() {

        return (
            <PLP
                {...this.props}
            />
        );
    }
}

const mapStateToProps = state => ({
    products: state.cart.products
});

export default connect(mapStateToProps)(withRouter(PLPContainer));