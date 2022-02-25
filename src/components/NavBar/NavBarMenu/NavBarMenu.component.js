import React, { PureComponent } from "react";
import ProductsContainer from "../../../route/Products";
import { Link } from "react-router-dom";

class NavBarMenu extends PureComponent {

    renderMenuItem(category, i) {
        const { name } = category;
        const { selectedCategory } = this.props;
        if (selectedCategory === "clothes" || selectedCategory === "tech") {
            return (
                <Link to={ "/" + selectedCategory } key={ i } >
                    <div className="NavBar-MenuItem" key={ i } onClick={ () => this.props.onClick(name) } >
                        <p>{ name }</p>
                    </div>
                </Link> 
            );
        } else {
            return (
                <Link to={ "/"} key={ i } >
                    <div className="NavBar-MenuItem" key={ i } onClick={ () => this.props.onClick(name) } >
                        <p>{ name }</p>
                    </div>
                </Link> 
            );
        }
    }

    render() {
        const { categories } = this.props;

        return (
            <>
                <div className="NavBar-Menu">
                    { this.props.categories && categories.map((category, i) => this.renderMenuItem(category, i))}
                </div>
                <ProductsContainer 
                    { ...this.props }
                />
            </>
        );
    } 
}

export default NavBarMenu;