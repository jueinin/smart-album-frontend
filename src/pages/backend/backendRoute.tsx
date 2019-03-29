import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import Login from "./login/login";

class BackendRoute extends Component {
  render() {
    return (
      <Switch>
        <Route path={'/backend/login'} component={Login}/>
      </Switch>
    );
  }
}

export default BackendRoute;