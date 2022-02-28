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
            chosenCurrency: '$',
            notSelected: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getCurrencies();
    }

    componentWillUnmount() {
        this.setState({notSelected: true});
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
            notSelected: !prevState.notSelected,
            chosenCurrency: symbol
        }));
        const symbol = e.currentTarget.firstChild.innerText;
        console.log(symbol);
        this.props.chosenCur(symbol);
    }

    render() {
        const { notSelected } = this.state;
        if ( notSelected === true ) {
            return(
                <CurrencySwitcher
                    { ...this.props }
                    { ...this.state }
                    onClick={ this.handleClick }
                />
            );
        } else {
            return null;    
        }
    }
}

export default CurrencySwitcherContainer;

