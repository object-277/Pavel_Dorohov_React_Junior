import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { categoriesQuery } from "../../query/category.query";
import { productsQuery } from "../../query/products.query";
import { executePost } from "../../util/Request.util";
import { withRouter } from "react-router-dom";

class NavBarContainer extends PureComponent {

    componentDidMount() {
        this.getCategories();
    }

    async getCategories() {
        await executePost(categoriesQuery).then(({categories}) => {
            this.setState({categories});
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