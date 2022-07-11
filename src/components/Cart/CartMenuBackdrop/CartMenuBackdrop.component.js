import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setCartMenu } from "../../../redux/Cart/Cart.reducer";
import './CartMenuBackdrop.style.scss';

class CartMenuBackdrop extends PureComponent {

    render() {
        const { cartMenuActive, setCartMenu } = this.props;
        const backdropHeight = document.getElementById("root") !== null ? (document.getElementById("root").clientHeight - 80) : null;
        const backdropWidth = document.getElementById("root") !== null ? (document.getElementById("root").clientWidth) : null;

        return (
            <>
                {cartMenuActive &&
                    <div className="CartMenuBackdrop" style={{ height: (backdropHeight), width: (backdropWidth) }}
                        onClick={() => setCartMenu()}
                    >
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartMenuActive: state.cart.cartMenuActive
    }
}

const mapDispatchToProps = { setCartMenu };

export default connect(mapStateToProps, mapDispatchToProps)(CartMenuBackdrop)