import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { categoriesQuery } from "../../query/category.query";
import { executePost } from "../../util/Request.util";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { setProducts } from "../../redux/Cart/Cart.reducer";
import { Field, Query } from "@tilework/opus";

class NavBarContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.getProducts = this.getProducts.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    async getCategories() {
        await executePost(categoriesQuery).then(({categories}) => {
            this.setState({categories});
        });
    }

    async getProducts(name) {
        const { setProducts } = this.props;
        const { pathname } = this.props.location;
        const categoryName = pathname.replace('/', '');
        const category = {
            title: name ? name : categoryName
        }
        await executePost(new Query("category", true)
        .addArgument("input", "CategoryInput", category)
        .addField(new Field("products", true)
            .addFieldList(["id", "brand", "name", "description", "category", "gallery", "inStock"])
            .addField(new Field("prices", true)
                .addFieldList(["amount"])
                .addField(new Field("currency", true)
                    .addFieldList(["label", "symbol"])
                 )
            )
            .addField(new Field("attributes", true)
                .addFieldList(["id", "name", "type"])
                .addField(new Field("items", true)
                    .addFieldList(["id", "value"])
                )
            )
        )).then(({category}) => {
            const { products } = category;
            setProducts(products);
        });
    }


    render() {
        
        return(
            <NavBar
                getProducts={ this.getProducts }
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

const mapStateToProps = state => ({
    products: state.cart.products
});

const mapDispatchToProps = { setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBarContainer));