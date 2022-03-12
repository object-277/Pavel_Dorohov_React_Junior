import React, { PureComponent } from "react";
import CurrencySwitcher from "./CurrencySwitcher.component";
import { currenciesQuery } from "../../query/currency.query";
import { executePost } from "../../util/Request.util";
import { connect } from "react-redux";
import { setCurrency, getTotals } from "../../redux/Cart/Cart.reducer";

class CurrencySwitcherContainer extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            currencies: [],
            isClicked: false,
            notSelected: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getCurrencies();
    }

    componentWillUnmount() {
        this.setState({notSelected: true});
    }

    async getCurrencies() {
        await executePost(currenciesQuery).then(({currencies}) => {
            this.setState({currencies});
        });
    }
    
    handleClick = (symbol) => {
        this.setState(prevState => ({
            isClicked: !prevState.isClicked,
            notSelected: !prevState.notSelected,
        }));
        const { setCurrency, getTotals } = this.props;
        setCurrency(symbol);
        getTotals();
    }

    render() {
        const { notSelected } = this.state;
        if ( notSelected === true ) {
            return(
                <CurrencySwitcher
                    { ...this.props }
                    { ...this.state }
                    onClick={ this.handleClick }
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

