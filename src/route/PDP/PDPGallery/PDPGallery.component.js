import React, { PureComponent } from "react";
import "./PDPGallery.style.scss";

class PDPGallery extends PureComponent {
 
    render() {
        const { src, changeImage } = this.props;
        const { gallery } = this.props.product;
        if ( gallery.length > 1 ) {
            return (
                <>
                    <div className="PDPGallery-SideGallery">
                        { gallery.map((image, i) =>  
                                <img src={ image } alt="Product" key={ i } onClick={ changeImage } />                        
                            )
                        }   
                    </div>
                    <div className="PDPGallery-MainImage-Wrapper">
                        <img className="PDPGallery-MainImage" src={ src } alt="Product" />
                    </div>
                </>      
            );
        } else {
            return (
                <div className="PDPGallery-MainImage-Wrapper">
                    <img className="PDPGallery-MainImage" src={ src } alt="Product" />
                </div>
            ); 
        }    
    }
}

export default PDPGallery;