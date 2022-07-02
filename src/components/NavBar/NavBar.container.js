import React, { PureComponent } from "react";
import NavBar from "./NavBar.component";
import { categoriesQuery } from "../../query/category.query";
import { executePost } from "../../util/Request.util";
import { connect } from "react-redux"
import { setCategory, setProducts } from "../../redux/Cart/Cart.reducer";
import { Field, Query } from "@tilework/opus";

class NavBarContainer extends PureComponent {
    componentDidMount() {
        this.getCategories();
    }

    componentDidUpdate() {
        this.getProducts();
    }

    async getCategories() {
        await executePost(categoriesQuery).then(({ categories }) => {
            this.setState({ categories });
        });
    }

    async getProducts() {
        const { setProducts, productsCategory } = this.props;
        const category = {
            title: productsCategory
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
            )).then(({ category }) => {
                const { products = [] } = category || {};
                setProducts(products);
            });
    }

    render() {

        return (
            <NavBar
                {...this.props}
                {...this.state}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        productsCategory: state.cart.productsCategory
    }
};

const mapDispatchToProps = { setCategory, setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);