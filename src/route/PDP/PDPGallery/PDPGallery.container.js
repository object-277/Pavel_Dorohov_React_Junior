import React, { PureComponent } from "react";
import PDPGallery from "./PDPGallery.component";

class PDPGalleryContainer extends PureComponent {
    constructor(props){
        super(props)
        const { gallery } = this.props.product;
        this.state = {
            src: gallery[0]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const newSrc = e.target.getAttribute("src");
        this.setState({src: newSrc});    
    }

    render() {
        return <PDPGallery
                    { ...this.state }
                    { ...this.props } 
                    changeImage={ this.handleClick }
                />    
    }
}

export default PDPGalleryContainer;