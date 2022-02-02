import React, { PureComponent } from "react";
import CurrencyButton from "../CurrencyButton";
import NavBar from "../NavBar";
import "./Header.style.scss";
import logo from "./logo.svg";

class Header extends PureComponent {

    render() {
        const { categories } = this.props;

        return (
            <div className="Header">
                <NavBar />
                <CurrencyButton />
                <img className="logo" src={logo} alt="logo"/>
            </div>
            
        );
    }
}

export default Header;