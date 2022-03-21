import React, { PureComponent } from "react";
import ProductsContainer from "../../../route/Products";
import { Link } from "react-router-dom";

class NavBarMenu extends PureComponent {

    renderMenuItem(category, i) {
        const { name } = category;
        const { Category, onClick } = this.props;
        const activeCategoryStyle = {
            color: '#5ECEB7',
            borderBottom: '2px solid #5ECEB7'
        }
    
        return (
            <Link className="NavBar-MenuItemLink" to={ "/" } key={ i } onClick={ () => onClick(name) } >
                <div className="NavBar-MenuItem" key={ i } 
                    style={ name === Category ? activeCategoryStyle : null } 
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
                { location.pathname === "/" && 
                    <ProductsContainer 
                        { ...this.props }
                    /> 
                }
            </>
        );
    } 
}

export default NavBarMenu;