import React, { PureComponent } from "react";
import "../CurrencyButton/CurrencyButton.style.scss";
import vector from "../CurrencyButton/Vector.svg";
import vectorClicked from "../CurrencyButton/VectorClicked.svg";
import CurrencySwitcherContainer from "../CurrencySwitcher";

class CurrencyButton extends PureComponent {

    render() {
        const { onClick, isClicked, isHovering, currency, handleMouseOver, handleMouseOut } = this.props;
        
        return (
            <>
                <div className="CurrencyButton-Selector" onClick={ onClick } onMouseEnter={ handleMouseOver } onMouseLeave={ handleMouseOut } >
                    <div id="Currency-Label" >
                        <p className="CurrencyButton-Symbol">{ currency }</p>
                    </div>
                    <img className="CurrencyButton" src={ isHovering ? vectorClicked : vector } alt="Select currency" /> 
                    { isHovering && <CurrencySwitcherContainer { ...this.props } /> }
                </div>
            </>
        );
    }
}

export default CurrencyButton;