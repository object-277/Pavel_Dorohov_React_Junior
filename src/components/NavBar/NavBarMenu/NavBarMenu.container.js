import React, { PureComponent } from "react";
import NavBarMenu from "./NavBarMenu.component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCategory } from "../../../redux/Cart/Cart.reducer";

class NavBarMenuContainer extends PureComponent {
    constructor(props) {
        super(props);

         this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (name) => {
        const { setCategory } = this.props;
        setCategory(name);
    }

    render() {
        
        return(
            <NavBarMenu 
                { ...this.props }
                onClick={ this.handleClick }
            />
        );
    }
}

const mapStateToProps = state => ({
    selectedCategory: state.cart.selectedCategory
});

const mapDispatchToProps = { setCategory };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBarMenuContainer));