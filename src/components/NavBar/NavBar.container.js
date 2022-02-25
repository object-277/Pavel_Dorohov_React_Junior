import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { categoriesQuery } from "../../query/category.query";
import { productsQuery } from "../../query/products.query";
import { executePost } from "../../util/Request.util";

class NavBarContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            categories: [],
            category: []
         };
         this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    handleClick() {

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
            />
        );
    }
}

export default NavBarContainer;