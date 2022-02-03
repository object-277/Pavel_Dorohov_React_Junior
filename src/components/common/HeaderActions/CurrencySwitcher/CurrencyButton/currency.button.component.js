import React, { PureComponent } from "react";
import "./currency.button.style.scss";
import vector from "../vector.svg";
import CurrencySwitcher from "../CurrencySwitcherSelector";

class CurrencyButton extends PureComponent {


    render() {
        return (
            <div>
                <img className="currency-switcher-button" src={vector} alt="Select currency" onClick={this.props.onClick} /> 
                {this.props.isClicked && <CurrencySwitcher />}
            </div>
             
        );
    }

}

export default CurrencyButton;