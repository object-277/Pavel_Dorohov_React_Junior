import React, { PureComponent } from "react";
import CurrencyButton from "../CurrencyButton";
import CartIconContainer from "../Cart/CartIcon/CartIcon.container";
import { Link } from "react-router-dom";
import "./NavBar.style.scss";

class NavBar extends PureComponent {

    renderMenuItem(category, i) {
        const { name } = category;
        const { pathname } = this.props.location;
        const productsCategory = pathname.replace('/', '');
        const activeCategoryStyle = {
            color: '#5ECEB7',
            borderBottom: '2px solid #5ECEB7',
            fontWeight: 600
        }
        const notActiveCategoryStyle = {
            fontWeight: 400
        }
        const { getProducts } = this.props;
    
        return (
            <Link className="NavBar-MenuItemLink" to={ "/" + name } key={ i } onClick= { () => getProducts(name) } >
                <div className="NavBar-MenuItem" key={ i } 
                    style={ name === productsCategory ? activeCategoryStyle : notActiveCategoryStyle } 
                >
                    <p className="NavBar-CategoryName">{ name }</p>
                </div>
            </Link> 
        );
    }

    render() {
        const { categories } = this.props;
        
        return (
            <>
                <div className="NavBar-Menu" >
                    { this.props.categories && categories.map((category, i) => this.renderMenuItem(category, i))}
                </div>
                <CurrencyButton /> 
                <CartIconContainer /> 
            </>
        );
    }
}

export default NavBar;