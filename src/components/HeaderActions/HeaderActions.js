import React, { PureComponent } from "react";
import CurrencyButton from "../CurrencyButton";
import CartContainer from "../Cart/Cart.container";
import "./HeaderActions.style.scss";

class HeaderActions extends PureComponent {

    render() {
        return (
            <div className="HeaderActionsWrapper">
                <CurrencyButton />
                <CartContainer />
            </div>
        );
    }

}

export default HeaderActions; 