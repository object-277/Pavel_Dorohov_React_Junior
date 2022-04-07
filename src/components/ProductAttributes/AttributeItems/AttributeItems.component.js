import React, { PureComponent } from "react";

class AttributeItems extends PureComponent {

    renderAttributeItems() {
        const { value } = this.props.item;
        const { item, isSelected, setAttribute, product, attribute, isProductInCart, setAttributeIfNotInCart } = this.props;

        const selectedStyle = {
            background: '#1D1F22',
            color: '#FFF'
        };

        const ifColorStyle = {
            background: value,
            width: '63px',
            height: '45px',
            border: '1px solid #1D1F22'
        };

        const isSelectedTrue = this.props.itemAttributes.some((attributeItem) => attributeItem.itemIn.id === item.id);

        if (this.props.itemAttributes !== undefined) {
            console.log(isSelectedTrue );

            } else {
                console.log("lol");
            }

        return (

            <div className="PDP-AttributeItem" 
                 onClick = {
                    isProductInCart === false ?
                    () => setAttributeIfNotInCart(item) :
                    () => setAttribute(item) 
                } 
                    style={ isSelectedTrue === true ? selectedStyle : null 
                    } 
            >
                <p className="PDP-ItemText" style={ attribute === 'Color' ? ifColorStyle : null  }>
                    { attribute !== 'Color' && value }
                </p>  
            </div>
        );
    }

    render() {
        return (
            <>
                { this.renderAttributeItems() }
            </>
        );
    }
}

export default AttributeItems;