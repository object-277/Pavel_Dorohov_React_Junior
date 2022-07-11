import React, { PureComponent } from "react";
import CurrencyButton from "./CurrencyButton.component";
import { currenciesQuery } from "../../query/currency.query";
import { executePost } from "../../util/Request.util";
import { connect } from "react-redux";
import { setCurrency, getTotals } from "../../redux/Cart/Cart.reducer";

class CurrencyButtonContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            isClicked: false,
            isHovering: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.getStateFromChild = this.getStateFromChild.bind(this);
        this.currencySwitcherUnmounts = this.currencySwitcherUnmounts.bind(this);
    }

    componentDidMount() {
        this.getCurrencies();
    }

    async getCurrencies() {
        const { setCurrency } = this.props;
        await executePost(currenciesQuery).then(({ currencies }) => {
            this.setState({ currencies }, () => setCurrency(this.state.currencies[0].symbol));
        });
    }

    currencySwitcherUnmounts() {  // when CurrencySwitcher has been closed, then hover state is set to initial
        this.setState(() => ({
            isHovering: false
        }));
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }));
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

    getStateFromChild(value) {
        // check if user is hovering CurrencySwitcher, so switcher not getting closed 
        if (value !== undefined) {
            this.setState(() => ({
                isHovering: value
            }));
        } else {
            return null;
        }
    }

    render() {

        return (
            <CurrencyButton
                {...this.state}
                {...this.props}
                currencySwitcherUnmounts={this.currencySwitcherUnmounts}
                onClick={this.handleClick}
                handleMouseOver={this.handleMouseOver}
                handleMouseOut={this.handleMouseOut}
                sendState={this.getStateFromChild}
            />
        );
    }
}

const mapStateToProps = state => ({
    currency: state.cart.currency
});

const mapDispatchToProps = { setCurrency, getTotals };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyButtonContainer);