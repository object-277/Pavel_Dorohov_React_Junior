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
            notSelected: true,  
            isHovering: undefined
        };
        this.handleSetCurrency = this.handleSetCurrency.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentDidUpdate() {
        this.props.sendState(this.state.isHovering);
    }

    componentDidMount() { 
        this.getCurrencies();
    }

    componentWillUnmount() {
        const { currencySwitcherUnmounts } = this.props;
        /* when CurrencySwitcher has been closed, 
        then hover state of this component and the state of its' parent component
        is set to initial  */
        currencySwitcherUnmounts();      
    }

    async getCurrencies() {
        await executePost(currenciesQuery).then(({currencies}) => {
            this.setState({currencies});
        });
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
        this.setState(prevState => ({
            notSelected: !prevState.notSelected,  // when user selects currency, then CurrencySwitcher is being closed 
            isHovering: false
        }));
        const { setCurrency, getTotals } = this.props;
        setCurrency(symbol);
        getTotals();
    }

    render() {
        const { notSelected } = this.state;
        if (notSelected) {
            return(
                <CurrencySwitcher
                    { ...this.props }
                    { ...this.state }
                    setCurrency={ this.handleSetCurrency }
                    handleMouseOver = { this.handleMouseOver }
                    handleMouseOut = { this.handleMouseOut } 
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

