import React, {PureComponent} from "react";
import CurrencyButton from "./CurrencyButton.component";
import vector from "../CurrencyButton/Vector.svg";
import vectorClicked from "../CurrencyButton/VectorClicked.svg";

class CurrencyButtonContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
            currencySymbol: '$'
        };
        this.handleClick = this.handleClick.bind(this);
        this.currencySwitcherUnmounts = this.currencySwitcherUnmounts.bind(this);
        this.getSymbol = this.getSymbol.bind(this);
    }

    currencySwitcherUnmounts() {
        this.setState({isClicked: false});
    }   

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }));
    }

    getSymbol(symbol) {
        this.setState(({currencySymbol: symbol}));
    }

    render() {
        const { isClicked, currencySymbol } = this.state;

        return ( 
            <CurrencyButton
                currencySwitcherUnmounts={ this.currencySwitcherUnmounts }
                isClicked={ isClicked } 
                onClick={ this.handleClick }
                getSymbol={ this.getSymbol }
                currencySymbol = { currencySymbol } 
            />
        );
    }
}

export default CurrencyButtonContainer;