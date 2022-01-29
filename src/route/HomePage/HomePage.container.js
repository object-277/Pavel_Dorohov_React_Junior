import React, { PureComponent } from "react";
import HomePage from "./HomePage.component";

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