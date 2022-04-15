import React, { PureComponent } from "react";
import "./CurrencySwitcher.style.scss";

class CurrencySwitcher extends PureComponent {
 
    renderCurrencyItem(currency, i) {
        const { symbol, label } = currency;
        const { setCurrency } = this.props;
        
        return (
            <div id="item" className="CurrencySwitcher-Item" key={ i } onClick={ () => setCurrency(symbol) }>
                <p className="symbol">{ symbol }</p>
                <p>{ label }</p>
            </div>
        );
    }

    renderCurrencySwithcer() {
        const { currencies, handleMouseOver, handleMouseOut } = this.props;

        return (
            <div className="CurrencySwitcher-Menu" onMouseEnter={ handleMouseOver } onMouseLeave={ handleMouseOut } >
                { currencies && currencies.map((currency, i) => this.renderCurrencyItem(currency, i))}
            </div>
        );
    }

    render() {
 
        return (
            <div className="CurrencySwitcher" >
                { this.renderCurrencySwithcer() }
            </div>
        );
    }
}

export default CurrencySwitcher;