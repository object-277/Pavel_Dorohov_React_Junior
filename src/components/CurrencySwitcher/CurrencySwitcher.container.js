import React, { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher.component";
import { connect } from "react-redux";
import { setCurrency, getTotals } from "../../redux/Cart/Cart.reducer";

class CurrencySwitcherContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: undefined
        };
        this.handleSetCurrency = this.handleSetCurrency.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentDidUpdate() {
        this.props.sendState(this.state.isHovering);
    }

    componentWillUnmount() {
        const { currencySwitcherUnmounts } = this.props;
        /* when CurrencySwitcher has been closed, 
        then hover state of this component and the state of its' parent component
        is set to initial  */
        currencySwitcherUnmounts();
    }

    handleMouseOver() {
        this.setState(() => ({
            isHovering: true
        }));
    }

    handleMouseOut() {
        this.setState(() => ({
            isHovering: false
        }));
    }

    handleSetCurrency = (symbol) => {
        this.setState(() => ({ 
            isHovering: false
        }));
        const { setCurrency, getTotals } = this.props;
        setCurrency(symbol);
        getTotals();
    }

    render() {
        const { isHovering } = this.props;
        if (isHovering) {
            return (
                <CurrencySwitcher
                    {...this.props}
                    {...this.state}
                    setCurrency={this.handleSetCurrency}
                    handleMouseOver={this.handleMouseOver}
                    handleMouseOut={this.handleMouseOut}
                />
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    currency: state.cart.currency
});

const mapDispatchToProps = { setCurrency, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcherContainer);

