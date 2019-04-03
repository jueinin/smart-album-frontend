import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import Login from "./login/login";
import IndexPage from "./indexPage/indexPage";


class BackendRoute extends Component {
  render() {
    return (
      <Switch>
        <Route path={'/backend/login'} component={Login}/>
        <Route path={'/backend/index'} component={IndexPage}/>
      </Switch>
    );
  }
}

export default BackendRoute;