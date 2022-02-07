import React, { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher.component";
import { currenciesQuery } from "../../query/currency.query";
import { executePost } from "../../util/Request.util";

class CurrencySwitcherContainer extends PureComponent {

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
            <CurrencySwitcher
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default CurrencySwitcherContainer;

