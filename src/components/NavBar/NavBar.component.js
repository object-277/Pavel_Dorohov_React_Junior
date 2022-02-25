import React, { PureComponent } from "react";
import NavBarMenuContainer from "./NavBarMenu";
import "./NavBar.style.scss";

class NavBar extends PureComponent {

    render() {
        
        return (
            <div className="NavBar">
                <NavBarMenuContainer 
                    { ...this.state }
                    { ...this.props }
                />
            </div>
        );
    }
}

export default NavBar;