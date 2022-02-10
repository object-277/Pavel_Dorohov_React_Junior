import React, { PureComponent } from "react";
import CurrencySelector from "./CurrencySelector.component";
import { currenciesQuery } from "../../query/currency.query";
import { executePost } from "../../util/Request.util";

class CurrencySelectorContainer extends PureComponent {

  state = {
            currencies: []      
        };

    componentDidMount() {
        this.getCurrencies();
    }

    async getCurrencies() {
        await executePost(currenciesQuery).then(({currencies}) => {
            this.setState({currencies});
        });
    }

    render() {
        
        return(
            <CurrencySelector
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default CurrencySelectorContainer;

