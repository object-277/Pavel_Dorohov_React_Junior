import React, { PureComponent } from "react";
import NavBarMenu from "./NavBarMenu.component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCategory } from "../../../redux/Cart/Cart.reducer";

class NavBarMenuContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            selectedCategory: "all"
        };
         this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (name) => {
        const { setCategory } = this.props;
        this.setState({selectedCategory: name});
        setCategory(name);
    }

    componentDidUpdate() {
        console.log(this.state.selectedCategory);
    }

    render() {
        
        return(
            <NavBarMenu 
                { ...this.state }
                { ...this.props }
                onClick={ this.handleClick }
            />
        );
    }
}

const mapStateToProps = state => ({
    Category: state.cart.Category
});

const mapDispatchToProps = { setCategory };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBarMenuContainer));