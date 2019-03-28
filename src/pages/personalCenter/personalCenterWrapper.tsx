import React, {Component} from 'react';
// @ts-ignore
import PersonalCenter from "./personalCenter";
import {RouteComponentProps} from "react-router";
import {userInfoMobx} from "../../mobx/userMobx";
import {observer} from "mobx-react";
@observer
class PersonalCenterWrapper extends Component<RouteComponentProps,{}> {
  componentDidMount(): void {
    userInfoMobx.getUserInfo();
  }
  
  render() {
    return (
      <PersonalCenter userInfo={userInfoMobx.userInfo} {...this.props}/>
    );
  }
}

export default PersonalCenterWrapper;