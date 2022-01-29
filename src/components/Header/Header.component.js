import React, { PureComponent } from "react";
import "./Header.style.scss";

class Header extends PureComponent {
    renderMenuItem(category, i) {
        const { name } = category;


        return (
            <div className="Header-MenuItem" key={ i }>
                <p>{ name }</p>
            </div>
            
        );
    }

    renderMenu() {
        const { categories } = this.props;

        return (
            <div className="Header-Menu">
                { categories.map((category, i) => this.renderMenuItem(category, i))}
            </div>
            
        );
    }

    render() {
        const { categories } = this.props;

        return (
            <div className="Header">
                { this.renderMenu() }
            </div>
            
        );
    }
}

export default Header;