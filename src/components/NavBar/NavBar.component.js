import React, { PureComponent } from "react";
import NavBarMenuContainer from "./NavBarMenu";
import CurrencyButton from "../CurrencyButton";
import CartContainer from "../Cart/Cart.container";
import "./NavBar.style.scss";

class NavBar extends PureComponent {

    render() {
        
        return (
            <>
                <div className="NavBar">
                    <NavBarMenuContainer 
                        { ...this.state }
                        { ...this.props }
                    />
                </div>
                <CurrencyButton /> 
                <CartContainer /> 
            </>
        );
    }
}

export default NavBar;