import React, { PureComponent } from "react";
import "./PDP.style.scss";

class PDP extends PureComponent {

    componentDidMount() {
        console.log(this.props.product);
    }

    renderPDP() {
        const { product } = this.props;

        return (
            <div className="PDP-Content">
                 <img className="PDP-MainImage" src={ product.product.gallery[0] } alt="Product" />
                 <div className="PDP-SideSection">
                    <p>{ product.product.brand }</p>
                    <p>{ product.product.name }</p>
                 </div>
                 
            </div>  
        ); 
    }
    
    render() {
        return (
            <div className="PDP">
                { this.renderPDP() }
            </div>
        );
    }

}

export default PDP;