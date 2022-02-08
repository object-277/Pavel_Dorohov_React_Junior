import React, { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher.component";
import { currenciesQuery } from "../../query/currency.query";
import { executePost } from "../../util/Request.util";

class CurrencySwitcherContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            currencies: [],
            isClicked: false,
            chosenCurrency: '$'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getCurrencies();
    }

    async getCurrencies() {
        await executePost(currenciesQuery).then(({currencies}) => {
            this.setState({currencies});
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isClicked: !prevState.isClicked,
            chosenCurrency: e.target.innerText
        }));
        this.props.chosenCur(e.target.innerText);
    }

    render() {
        return(
            <CurrencySwitcher
                onClick={this.handleClick}
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default CurrencySwitcherContainer;

