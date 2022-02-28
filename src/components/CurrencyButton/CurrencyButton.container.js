import React, {PureComponent} from "react";
import CurrencyButton from "./CurrencyButton.component";
import vector from "../CurrencyButton/Vector.svg";
import vectorClicked from "../CurrencyButton/VectorClicked.svg";

class CurrencyButtonContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.currencySwitcherUnmounts = this.currencySwitcherUnmounts.bind(this);
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
    
    render() {
        const { isClicked } = this.state;

        return ( 
            <CurrencyButton
                currencySwitcherUnmounts={ this.currencySwitcherUnmounts }
                isClicked={ isClicked } 
                onClick={ this.handleClick } 
            />
        );
    }
}

export default CurrencyButtonContainer;