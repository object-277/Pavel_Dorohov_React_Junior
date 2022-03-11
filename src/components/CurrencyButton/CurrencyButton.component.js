import React, { PureComponent } from "react";
import "../CurrencyButton/CurrencyButton.style.scss";
import vector from "../CurrencyButton/Vector.svg";
import vectorClicked from "../CurrencyButton/VectorClicked.svg";
import CurrencySwitcherContainer from "../CurrencySwitcher";

class CurrencyButton extends PureComponent {

    componentWillUnmount() {
        const { currencySwitcherUnmounts } = this.props;
        currencySwitcherUnmounts();
      }

    render() {
        const { onClick, isClicked, currency } = this.props;
        
        return (
            <>
                <div className="CurrencyButton-Selector" onClick={ onClick } >
                    <div id="Currency-Label" >
                        <p className="CurrencyButton-Symbol">{ currency }</p>
                    </div>
                    <img className="CurrencyButton" src={ isClicked ? vectorClicked : vector } alt="Select currency" /> 
                    { isClicked && <CurrencySwitcherContainer /> }
                </div>
            </>
        );
    }
}

export default CurrencyButton;