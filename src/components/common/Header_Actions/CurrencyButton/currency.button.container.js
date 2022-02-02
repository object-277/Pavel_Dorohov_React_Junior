import React, {PureComponent} from "react";
import CurrencyButton from "./currency.button.component";

class CurrencyButtonContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("hello");
    }
    
    render() {
        return <CurrencyButton onClick={this.handleClick} />;
    }

}

export default CurrencyButtonContainer;