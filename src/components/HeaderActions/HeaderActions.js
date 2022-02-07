import React, { PureComponent } from "react";
import CurrencyButton from "../CurrencyButton";
import "./HeaderActions.style.scss";

class HeaderActions extends PureComponent {

    render() {
        return (
            <div className="HeaderActionsWrapper">
                <CurrencyButton />
            </div>
        );
    }

}

export default HeaderActions; 