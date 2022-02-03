import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { client } from "@tilework/opus";
import { categoriesQuery } from "../../../query/category.query";
import { executePost } from "../../../util/Request.util";

class NavBarContainer extends PureComponent {
    
    state = { 
        categories: []
     };

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

export default NavBarContainer;