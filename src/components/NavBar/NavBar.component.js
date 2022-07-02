import React, { PureComponent } from "react";
import CurrencyButton from "../CurrencyButton";
import CartIconContainer from "../Cart/CartIcon/CartIcon.container";
import { withRouter, Link } from "react-router-dom";
import "./NavBar.style.scss";

class NavBar extends PureComponent {
    componentDidUpdate() {
        const { categories, setCategory } = this.props;
        const {pathname} = this.props.location;
        const categoryName = pathname.replace('/', '');
        const checkCategory = categories !== undefined && categories.some((category) => category.name === categoryName);
        if(checkCategory) {
            setCategory(categoryName);
        }
    }

    renderMenuItem(category, i) {
        const { name } = category;
        const { productsCategory, setCategory } = this.props;
        const activeCategoryStyle = {
            color: '#5ECEB7',
            borderBottom: '2px solid #5ECEB7',
            fontWeight: 600
        }
        const notActiveCategoryStyle = {
            fontWeight: 400
        }

        return (
            <Link className="NavBar-MenuItemLink" to={"/" + name} key={i}  onClick={() => setCategory(name)} >
                <div className="NavBar-MenuItem" key={i} 
                    style={name === productsCategory ? activeCategoryStyle : notActiveCategoryStyle}
                >
                    <p className="NavBar-CategoryName">{name}</p>
                </div>
            </Link>
        );
    }

    render() {
        const { categories } = this.props;

        return (
            <>
                <div className="NavBar-Menu" >
                    {this.props.categories && categories.map((category, i) => this.renderMenuItem(category, i))}
                </div>
                <CurrencyButton />
                <CartIconContainer />
            </>
        );
    }
}

export default withRouter(NavBar);