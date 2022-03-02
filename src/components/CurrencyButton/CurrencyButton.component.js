import React, { PureComponent } from "react";
import "../CurrencyButton/CurrencyButton.style.scss";
import vector from "../CurrencyButton/Vector.svg";
import vectorClicked from "../CurrencyButton/VectorClicked.svg";
import CurrencySwitcherContainer from "../CurrencySwitcher";
import ProductPriceContainer from "../ProductPrice/ProductPrice.container";

class CurrencyButton extends PureComponent {

    componentWillUnmount() {
        const { currencySwitcherUnmounts } = this.props;
        currencySwitcherUnmounts();
      }

    render() {
        const { onClick, isClicked, currencySymbol, getSymbol } = this.props;
        
        return (
            <>
                <div className="CurrencyButton-Selector" onClick={ onClick } >
                    <div id="Currency-Label" >
                        <p className="CurrencyButton-Symbol">{ currencySymbol }</p>
                    </div>
                    <img className="CurrencyButton" src={ isClicked ? vectorClicked : vector } alt="Select currency" /> 
                    { isClicked && <CurrencySwitcherContainer chosenCur={ getSymbol }/> }
                </div>
                <ProductPriceContainer />
            </>
        );
    }
}

export default CurrencyButton;