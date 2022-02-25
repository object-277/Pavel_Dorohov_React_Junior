import React, { PureComponent } from "react";
import NavBarMenu from "./NavBarMenu.component";

class NavBarMenuContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            selectedCategory: "all"
         };
         this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (name) => {
        this.setState({selectedCategory: name});
    }

    componentDidUpdate() {
        console.log(this.state.selectedCategory);
    }

    render() {
        
        return(
            <NavBarMenu 
                { ...this.state }
                { ...this.props }
                onClick={ this.handleClick }
            />
        );
    }
}

export default NavBarMenuContainer;