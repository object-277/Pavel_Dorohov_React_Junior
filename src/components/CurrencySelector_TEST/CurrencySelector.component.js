import React, { PureComponent } from "react";

class CurrencySelector extends PureComponent {
    
    renderSelector() {
        const {currencies} = this.props;

        return (
            <div className="CurrencySelector-Menu">
                <select>
                        { currencies.map((currency, i) => 
                    <option key={ i } value={ currency.symbol }>
                            { currency.symbol }
                            { currency.label }
                    </option> )}
                </select>
            </div>
                
        );
    }
    
    render() {

        return (
            <div className="CurrencySelector">
                { this.renderSelector() }
            </div>
        );
    }


}

export default CurrencySelector;