import React, { PureComponent } from "react";
import NavBar from "../NavBar";
import "./Header.style.scss";
import logo from "./logo.svg";

class Header extends PureComponent {

    render() {

        return (
            <>
                <div className="Header">         
                    <img className="logo" src={logo} alt="logo"/> 
                    <NavBar /> 
                </div> 
            </> 
        );
    }
}

export default Header;