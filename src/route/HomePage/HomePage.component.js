import React, { PureComponent } from "react";
import "./HomePage.style.scss";
import ProductsContainer from "../Products";

class HomePage extends PureComponent {

    render() {

        return (

            <div className="HomePage">
                <h1 className="category-name">All</h1> 
                <ProductsContainer />
            </div>  
        );
    }

}


export default HomePage;