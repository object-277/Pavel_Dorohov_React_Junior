import React, { PureComponent } from "react";
import NavBar from "../NavBar";
import HeaderActions from "../Header_Actions/HeaderActions.component";
import "./Header.style.scss";
import logo from "./logo.svg";

class Header extends PureComponent {

    render() {
        const { categories } = this.props;

        return (
            <div className="Header">
                <NavBar />
                <HeaderActions />
                <img className="logo" src={logo} alt="logo"/>
            </div>
            
        );
    }
}

export default Header;