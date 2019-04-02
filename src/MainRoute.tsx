import React, {Component} from 'react';
import {Route} from "react-router";
import IndexPage from "./pages/indexPage/indexPage";

class MainRoute extends Component {

    render() {
        return (
            <div>
                <Route path={'/'} component={IndexPage}/>
            </div>
        );
    }
}

export default MainRoute;
