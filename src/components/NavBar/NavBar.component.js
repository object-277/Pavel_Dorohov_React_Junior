import React, { PureComponent } from "react";
import CurrencyButton from "../CurrencyButton";
import CartIconContainer from "../Cart/CartIcon/CartIcon.container";
import ProductsContainer from "../../route/Products";
import { Link } from "react-router-dom";
import "./NavBar.style.scss";

class NavBar extends PureComponent {

    renderMenuItem(category, i) {
        const { name } = category;
        const { selectedCategory, onClick } = this.props;
        const activeCategoryStyle = {
            color: '#5ECEB7',
            borderBottom: '2px solid #5ECEB7'
        }
    
        return (
            <Link className="NavBar-MenuItemLink" to={ "/" + name } key={ i } onClick={ () => onClick(name) } >
                <div className="NavBar-MenuItem" key={ i } 
                    style={ name === selectedCategory ? activeCategoryStyle : null } 
                >
                    <p className="NavBar-CategoryName">{ name }</p>
                </div>
            </Link> 
        );
    }

    render() {
        const { categories, location } = this.props;
        
        return (
            <>
                <div className="NavBar-Menu">
                    { this.props.categories && categories.map((category, i) => this.renderMenuItem(category, i))}
                </div>
                { (location.pathname === "/" || location.pathname === "/all" || location.pathname === "/clothes" || location.pathname === "/tech" ) && 
                    <ProductsContainer 
                        { ...this.props }
                    /> 
                }
                <CurrencyButton /> 
                <CartIconContainer /> 
            </>
        );
    }
}

export default NavBar;