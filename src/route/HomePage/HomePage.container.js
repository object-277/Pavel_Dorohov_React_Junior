import React, { PureComponent } from "react";
import HomePage from "./HomePage.component";
import Products from "../Products";
import { executePost } from "../../util/Request.util";
import { productsQuery } from "../../query/products.query";

class HomePageContainer extends PureComponent {


    render(){

        return(

            <HomePage
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default HomePageContainer;