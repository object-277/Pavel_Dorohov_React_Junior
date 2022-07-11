import React, { PureComponent } from "react";
import "../CurrencyButton/CurrencyButton.style.scss";
import vector from "../CurrencyButton/Vector.svg";
import CurrencySwitcherContainer from "../CurrencySwitcher";

class CurrencyButton extends PureComponent {
    render() {
        const { onClick, currency, handleMouseOver, handleMouseOut } = this.props;

        return (
            <>
                <div className="CurrencyButton" onClick={onClick} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} >
                    <div id="CurrencyButton-Symbol" >
                        {currency}
                    </div>
                    <img id="CurrencyButton-Arrow" src={vector} alt="Select currency" />
                    <CurrencySwitcherContainer {...this.props} />
                </div>
            </>
        );
    }
}

export default CurrencyButton;