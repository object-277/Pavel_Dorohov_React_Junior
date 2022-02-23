import React, { PureComponent } from "react";
import NavBar from "../NavBar";
import CurrencyButton from "../CurrencyButton";
import CartContainer from "../Cart/Cart.container";
import "./Header.style.scss";
import logo from "./logo.svg";

class Header extends PureComponent {

    render() {
    
        return (
            <div className="Header">
                <NavBar />
                <CurrencyButton /> 
                <CartContainer />              
                <img className="logo" src={logo} alt="logo"/>
            </div>
        );
    }
}

export default Header;