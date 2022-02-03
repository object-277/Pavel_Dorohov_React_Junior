import React, { PureComponent } from "react";
import "./currency.switcher.style.scss";

class CurrencySwitcher extends PureComponent {
    
    componentDidMount() {
        console.log(this.props);
    }

    renderCurrencyItem(currency, i) {
        
        const { symbol } = currency;
        const { label } = currency;

        return (
            <div className="Currency-SwitcherItem" key={ i }>
                <p className="symbol">{ symbol}</p>
                <p>{ label }</p>
            </div>
            
        );
    }

    renderCurrencySwithcer() {
        const { currencies } = this.props;

        return (
            <div className="Currency-SwitcherMenu">
                { this.props.currencies && currencies.map((currency, i) => this.renderCurrencyItem(currency, i))}
            </div>
            
        );
    }

    render() {

        return (
            <div className="Currency-Switcher">
                { this.renderCurrencySwithcer() }
            </div>
        );
    }


}

export default CurrencySwitcher;