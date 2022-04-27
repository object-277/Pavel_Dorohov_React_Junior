import React, { PureComponent } from "react";
import NavBar from "../NavBar";
import "./Header.style.scss";
import logo from "./logo.svg";

class Header extends PureComponent {

    render() {
        const { isHovering } = this.props;
        const hoverStyle = {
            boxShadow: '0px 4px 4px 1px rgba(0, 0, 0, 0.25)'
        };

        return (
            <>
                <div className="Header" style={ isHovering === true ? hoverStyle : null }>         
                    <img className="logo" src={logo} alt="logo"/> 
                    <NavBar { ...this.props } /> 
                </div> 
            </> 
        );
    }
}

export default Header;