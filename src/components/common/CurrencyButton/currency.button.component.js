import React, { PureComponent } from "react";
import "./currency.button.style.scss";
import vector from "./vector.svg";

class CurrencyButton extends PureComponent {
    
    render() {
        return (
            <button onClick={this.props.onClick} >
                <img className="currency-button" src={vector} alt="Select currency" /> 
            </button>
             
        );
    }

}

export default CurrencyButton;