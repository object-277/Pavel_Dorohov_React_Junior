import React, { PureComponent } from "react";
import Header from "./Header.component";

class HeaderContainer extends PureComponent {
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