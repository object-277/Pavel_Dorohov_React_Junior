import React, { PureComponent } from "react";
import Header from "./Header.component";
import { client } from "@tilework/opus";
import { categoriesQuery } from "../../query/category.query";
import { executePost } from "../../util/Request.util";

class HeaderContainer extends PureComponent {
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

    render(){
        return(
            <Header
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default HeaderContainer;