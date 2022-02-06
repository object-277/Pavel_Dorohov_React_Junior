import { Component, PureComponent } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from "../components/common/Header/Header.component";
import HomePage from "./HomePage";
import PDP from "./PDP";
import ProductsContainer from "./Products";

class AppRouter extends PureComponent { 
    render() {
        return(
            <Router>
                <HomePage />
                <Header />
                <Switch>  
                    <Route path="/pdp" component={ PDP }/>        
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;