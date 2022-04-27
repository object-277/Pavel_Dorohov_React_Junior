import React, { PureComponent } from "react";
import Header from "./Header.component";

class HeaderContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: false
        }
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(value) {
        this.setState(() => ({
            isHovering: value
        }));
    }

    render() {
        return <Header { ...this.state } getStateFromNavBar={ this.getStateFromChild } />
    }
}

export default HeaderContainer;

