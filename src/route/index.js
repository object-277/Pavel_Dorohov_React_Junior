import { Component, PureComponent } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "./HomePage";

class AppRouter extends PureComponent {
    render() {
        return(
            <Router>
                <Header />
                <Switch>
                    <Route path="/" component={ HomePage }/>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;