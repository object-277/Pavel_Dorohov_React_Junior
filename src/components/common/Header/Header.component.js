import React, { PureComponent } from "react";
import NavBar from "../NavBar";
import "./Header.style.scss";
import logo from "./logo.svg";

class Header extends PureComponent {

    render() {
        const { categories } = this.props;

        return (
            <div className="Header">
                <NavBar />
                <img src={logo} alt="logo"/>
            </div>
            
        );
    }
}

export default Header;