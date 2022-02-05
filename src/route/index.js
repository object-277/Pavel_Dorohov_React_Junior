import { Component, PureComponent } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from "../components/common/Header/Header.component";
import ProductContainer from "../components/Product";
import HomePage from "./HomePage";

class AppRouter extends PureComponent { 
    render() {
        return(
            <Router>
                <Header />
                <ProductContainer />
                <Switch>
                    <Route path="/" component={ HomePage }/>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;