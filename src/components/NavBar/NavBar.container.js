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
            category: [],
            selectedCurrency: '$'
         };
         this.getCurrency = this.getCurrency.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.selectedCurrency);
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    getCurrency(symbol) {
        this.setState({selectedCurrency: symbol});
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
                getCurrency={ this.getCurrency }
                selectedCurrency={ this.state.selectedCurrency }
            />
        );
    }
}

export default NavBarContainer;