import React, { PureComponent } from "react";
import "./NavBar.style.scss";


class NavBar extends PureComponent {

    renderMenuItem(category, i) {
        const { name } = category;


        return (
            <div className="NavBar-MenuItem" key={ i }>
                <p>{ name }</p>
            </div>
            
        );
    }

    renderMenu() {
        const { categories } = this.props;

        return (
            <div className="NavBar-Menu">
                { this.props.categories && categories.map((category, i) => this.renderMenuItem(category, i))}
            </div>
            
        );
    }

    render() {
        const { categories } = this.props;

        return (
            <div className="NavBar">
                { this.renderMenu() }
            </div>
            
        );
    }
}

export default NavBar;