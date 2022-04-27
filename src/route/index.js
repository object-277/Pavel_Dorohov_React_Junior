import { PureComponent } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import PDP from "./PDP";
import CartPage from "./CartPage";
import HeaderContainer from "../components/Header/Header.container";
import ProductsContainer from "./Products";
import HomePage from "./HomePage/HomePage.component";

class AppRouter extends PureComponent { 
    render() {
        return(
            <Router>
                <HeaderContainer />
                <Switch>
                    <Redirect exact from="/" to="/all" /> 
                    <Route path="/all" component={ ProductsContainer } />
                    <Route path="/clothes" component={ ProductsContainer } />
                    <Route path="/tech" component={ ProductsContainer } />
                    <Route path="/pdp/:id" component={ PDP } /> 
                    <Route path="/cart" component={ CartPage } /> 
                </Switch>
            </Router> 
        );
    }
}

export default AppRouter;