import React, {PureComponent} from "react";
import CurrencyButton from "./currency.button.component";

class CurrencyButtonContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
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