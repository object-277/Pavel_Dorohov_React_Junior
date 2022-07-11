import React, { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher.component";
import { connect } from "react-redux";
import { setCurrency, getTotals } from "../../redux/Cart/Cart.reducer";

class CurrencySwitcherContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isHoveringSwitcher: undefined
        };
        this.handleSetCurrency = this.handleSetCurrency.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { sendState } = this.props;
        if (this.props.currency !== prevProps.currency) {
            sendState(false);
        } 
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
            isHoveringSwitcher: true
        }));
    }

    handleMouseOut() {
        this.setState(() => ({
            isHoveringSwitcher: false
        }));
    }

    handleSetCurrency = (symbol) => {
        const { sendState } = this.props;
        this.setState(() => ({
            isHoveringSwitcher: false
        }), () => sendState(this.state.isHoveringSwitcher));
        const { setCurrency, getTotals } = this.props;
        setCurrency(symbol);
        getTotals();
    }

    render() {
        return (
            <CurrencySwitcher
                {...this.props}
                {...this.state}
                setCurrency={this.handleSetCurrency}
                handleMouseOver={this.handleMouseOver}
                handleMouseOut={this.handleMouseOut}
            />
        );
    }
}

const mapStateToProps = state => ({
    currency: state.cart.currency
});

const mapDispatchToProps = { setCurrency, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcherContainer);

