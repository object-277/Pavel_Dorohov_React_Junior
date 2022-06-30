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
import PLPContainer from "./PLP";

class AppRouter extends PureComponent {
    render() {
        return (
            <Router>
                <HeaderContainer />
                <Switch>
                    <Redirect exact from="/" to="/all" />
                    <Route exact path="/cart" component={CartPage} />
                    <Route exact path="/:name" component={PLPContainer} />
                    <Route path="/:name/:id" component={PDP} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;