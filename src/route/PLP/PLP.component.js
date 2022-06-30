import React, { PureComponent } from "react";
import ProductCardContainer from "../../components/ProductCard/ProductCard.container";
import "./PLP.style.scss";

class PLP extends PureComponent {

    renderProducts() {
        const { products = [] } = this.props;
        return (
            <div className="Product-Page">
                {products && products.map((product, i) =>
                    <ProductCardContainer
                        {...this.props}
                        product={product}
                        key={i}
                    />
                )
                }
            </div>
        );
    }

    render() {
        const { pathname } = this.props.location;
        const productsCategory = pathname.replace('/', '');

        return (
            <div className="Products">
                {productsCategory !== "all" ?
                    <h1 id="Products-CategoryName">{productsCategory}</h1> :
                    <h1 id="Products-CategoryName">all</h1>
                }
                {this.renderProducts()}
            </div>
        );
    }
}

export default PLP;