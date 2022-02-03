import React, { PureComponent } from "react";
import CurrencyButton from "../HeaderActions/CurrencySwitcher";
import HeaderActions from "../HeaderActions/HeaderActions";
import NavBar from "../NavBar";
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