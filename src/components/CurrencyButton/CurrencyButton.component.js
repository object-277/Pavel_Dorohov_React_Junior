import React, { PureComponent } from "react";
import "../CurrencyButton/CurrencyButton.style.scss";
import vector from "../CurrencyButton/Vector.svg";
import CurrencySwitcher from "../CurrencySwitcher";

class CurrencyButton extends PureComponent {

    render() {
        const { onClick } = this.props;
        const { isClicked } = this.props;

        return (
            <div>
                <img className="CurrencyButton" src={vector} alt="Select currency" onClick={ onClick } /> 
                { isClicked && <CurrencySwitcher /> }
            </div>
             
        );
    }

}

export default CurrencyButton;