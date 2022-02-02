import React, { PureComponent } from "react";
import "./currency.button.style.scss";
import vector from "./vector.svg";

class CurrencyButton extends PureComponent {

    render() {

        return (
                <img className="currency-button" src={vector} alt="Select currency" onClick={this.props.handleClick} /> 
     
        );
    }

}

export default CurrencyButton;