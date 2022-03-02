import React, { PureComponent } from "react";
import "./CurrencySwitcher.style.scss";

class CurrencySwitcher extends PureComponent {
    
    componentDidMount() {
        console.log(this.props);
    }

    renderCurrencyItem(currency, i) {
        const { symbol, label } = currency;
        const { onClick } = this.props;
        
        return (
            <div id="item" className="CurrencySwitcher-Item" key={ i } onClick={ onClick }>
                <p className="symbol">{ symbol}</p>
                <p>{ label }</p>
            </div>
        );
    }

    renderCurrencySwithcer() {
        const { currencies } = this.props;

        return (
            <div className="CurrencySwitcher-Menu">
                { currencies && currencies.map((currency, i) => this.renderCurrencyItem(currency, i))}
            </div>
        );
    }

    render() {

        return (
            <div className="CurrencySwitcher">
                { this.renderCurrencySwithcer() }
            </div>
        );
    }
}

export default CurrencySwitcher;