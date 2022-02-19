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
        const { isClicked } = this.state;

        return ( 
            <CurrencyButton isClicked={isClicked} onClick={this.handleClick} />
        );
    }
}

export default CurrencyButtonContainer;