import React, { PureComponent } from "react";
import "./CurrencySwitcher.style.scss";

class CurrencySwitcher extends PureComponent {
 
    renderCurrencyItem(currency, i) {
        const { symbol, label } = currency;
        const { setCurrency } = this.props;
        
        return (
            <div className="CurrencySwitcher-Item-Wrapper" key={ i } onClick={ () => setCurrency(symbol) } >
                <div id="item" className="CurrencySwitcher-Item">
                    <p className="CurrencySwitcher-Item-Symbol">{ symbol }</p>
                    <p className="CurrencySwitcher-Item-Label">{ label }</p>
                </div>
            </div>
        );
    }

    renderCurrencySwithcer() {
        const { currencies } = this.props;

        return (
            <div className="CurrencySwitcher-Menu" >
                { currencies && currencies.map((currency, i) => this.renderCurrencyItem(currency, i))}
            </div>
        );
    }

    render() {
        const { handleMouseOver, handleMouseOut } = this.props; 
 
        return (
            <div className="CurrencySwitcher" onMouseEnter={ handleMouseOver } onMouseLeave={ handleMouseOut } >
                { this.renderCurrencySwithcer() }
            </div>
        );
    }
}

export default CurrencySwitcher;