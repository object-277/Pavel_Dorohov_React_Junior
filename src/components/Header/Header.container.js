import React, { PureComponent } from "react";
import Header from "./Header.component";
import { client } from "@tilework/opus";
import { categoriesQuery } from "../../query/category.query";

class HeaderContainer extends PureComponent {
    componentDidMount() {
        this.getCategories();
        console.log(process.env);

    }
    
    async getCategories() {
        await client.post(categoriesQuery).then((data) => console.log(data));
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