import { Component, PureComponent } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from "../components/Header/Header.component";
import HomePage from "./HomePage";
import PDP from "./PDP";

class AppRouter extends PureComponent { 
    render() {

        return(
            <Router>
                <Switch> 
                    <Route exact path="/" component={ HomePage }/> 
                    <Route path="/pdp" component={ PDP }/>        
                </Switch>
                <Header />
            </Router>
        );
    }
}

export default AppRouter;