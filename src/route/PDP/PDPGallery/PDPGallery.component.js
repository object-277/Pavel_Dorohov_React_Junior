import React, { PureComponent } from "react";
import "./PDPGallery.style.scss";

class PDPGallery extends PureComponent {
 
    render() {
        const { src, onClick } = this.props;
        const { gallery } = this.props.product;
        if ( gallery.length > 1 ) {
            return (
                <>
                    <div className="PDPGallery-SideGallery">
                        { gallery.map((image, i) =>  
                                <img src={ image } alt="Product" key={ i } onClick={ onClick } />                        
                            )
                        }   
                    </div>
                    <img className="PDPGallery-MainImage" src={ src } alt="Product" />
                </>      
            );
        } else {
            return <img className="PDPGallery-MainImage" src={ src } alt="Product" />    
        }    
    }
}

export default PDPGallery;