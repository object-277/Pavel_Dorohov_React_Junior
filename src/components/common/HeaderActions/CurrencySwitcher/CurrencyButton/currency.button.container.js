import React, {PureComponent} from "react";
import CurrencyButton from "../CurrencyButton/currency.button.component";
import vector from "../vector.svg";
import vectorClicked from "../vectorClicked.svg";

class CurrencyButtonContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (e.target.getAttribute('src') === vector) {
            e.target.setAttribute('src', vectorClicked );
        }
        else {
            e.target.setAttribute('src', vector);
        }
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }));
    }
    
    render() {
        return ( 
            <CurrencyButton isClicked={this.state.isClicked} onClick={this.handleClick} />
        );
    }

}

export default CurrencyButtonContainer;