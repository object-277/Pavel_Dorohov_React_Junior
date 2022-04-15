import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { categoriesQuery } from "../../query/category.query";
import { productsQuery } from "../../query/products.query";
import { executePost } from "../../util/Request.util";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCategory } from "../../redux/Cart/Cart.reducer";

class NavBarContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
         this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    handleClick = (name) => {
        const { setCategory } = this.props;
        setCategory(name);
    }

    async getCategories() {
        await executePost(categoriesQuery).then(({categories}) => {
            this.setState({categories});
        });
    }

    async getProducts() {
        await executePost(productsQuery).then(({category}) => {
            this.setState({category});
            console.log({category});
        });
    }

    render() {
        
        return(
            <NavBar
                { ...this.props }
                { ...this.state }
                onClick={ this.handleClick }
            />
        );
    }
}

const mapStateToProps = state => ({
    selectedCategory: state.cart.selectedCategory
});

const mapDispatchToProps = { setCategory };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBarContainer));