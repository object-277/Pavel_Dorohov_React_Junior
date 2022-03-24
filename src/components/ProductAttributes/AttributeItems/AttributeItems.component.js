import React, { PureComponent } from "react";

class AttributeItems extends PureComponent {

    renderAttributeItems() {
        const { value } = this.props.item;
        const { item, isSelected } = this.props;
        const { setAttribute, product } = this.props;

        const selectedStyle = {
            background: '#1D1F22',
            color: '#FFF'
        }
        const isSelectedTrue = this.props.itemAttributes.some((attributeItem) => attributeItem.itemIn.id === item.id);

        if (this.props.itemAttributes !== undefined) {
            console.log(isSelectedTrue );

            } else {
                console.log("lol");
            }

        return (

            <div className="PDP-AttributeItem" onClick = { () => setAttribute(item) } style={ isSelectedTrue === true ? selectedStyle : null } >
                <p className="PDP-ItemText">{ value }</p>  
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