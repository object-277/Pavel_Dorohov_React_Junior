import React, { PureComponent } from "react";
import "./currency.button.style.scss";
import vector from "./vector.svg";

class CurrencyButton extends PureComponent {
    render() {
        return (
               <img className="currency-selector" src={vector} alt="Select currency"/> 
            
        );
    }

}

export default CurrencyButton;