import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { categoriesQuery } from "../../query/category.query";
import { productsQuery } from "../../query/products.query";
import { executePost } from "../../util/Request.util";
import { withRouter } from "react-router-dom";

class NavBarContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: false
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    componentDidUpdate() {
        const { getStateFromNavBar } = this.props;
        const { isHovering } = this.state;
        getStateFromNavBar(isHovering);
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

    async getCategories() {
        await executePost(categoriesQuery).then(({categories}) => {
            this.setState({categories});
        });
    }

    async getProducts() {
        await executePost(productsQuery).then(({category}) => {
            this.setState({category});
        });
    }

    render() {
        
        return(
            <NavBar
                { ...this.props }
                { ...this.state }
                handleMouseOver={ this.handleMouseOver }
                handleMouseOut={ this.handleMouseOut }
            />
        );
    }
}

export default (withRouter(NavBarContainer));