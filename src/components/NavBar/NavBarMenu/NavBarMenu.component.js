import React, { PureComponent } from "react";
import ProductsContainer from "../../../route/Products";
import { Link } from "react-router-dom";

class NavBarMenu extends PureComponent {

    renderMenuItem(category, i) {
        const { name } = category;
        const { selectedCategory } = this.props;
        const activeCategoryStyle = {
            color: '#5ECEB7',
            borderBottom: '2px solid #5ECEB7'
        }
        /*if (selectedCategory === "clothes" || selectedCategory === "tech") {
            return (
                <Link to={ "/" + selectedCategory } key={ i } >
                    <div className="NavBar-MenuItem" key={ i } onClick={ () => this.props.onClick(name) } >
                        <p>{ name }</p>
                    </div>
                </Link> 
            );
        } else {*/
        return (
            <Link className="NavBar-MenuItemLink" to={ "/" } key={ i } onClick={ () => this.props.onClick(name) } >
                <div className="NavBar-MenuItem" key={ i } 
                    style={ name === selectedCategory ? activeCategoryStyle : null } >
                    <p>{ name }</p>
                </div>
            </Link> 
        );
       //</Link> }
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