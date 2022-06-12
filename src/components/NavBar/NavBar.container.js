import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { categoriesQuery } from "../../query/category.query";
import { productsQuery } from "../../query/products.query";
import { executePost } from "../../util/Request.util";
import { withRouter } from "react-router-dom";

class NavBarContainer extends PureComponent {

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    async getCategories() {
        await executePost(categoriesQuery).then(({categories}) => {
            this.setState({categories});
        });
    }

    async getProducts() {
        await executePost(productsQuery).then(({category}) => {
            this.setState({category});
        });
    }

    render() {
        
        return(
            <NavBar
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default (withRouter(NavBarContainer));