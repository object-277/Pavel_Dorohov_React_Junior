import React, { PureComponent } from "react";
import HeaderActions from "../HeaderActions/HeaderActions";
import NavBar from "../NavBar";
import "./Header.style.scss";
import logo from "./logo.svg";

class Header extends PureComponent {

    render() {
    
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