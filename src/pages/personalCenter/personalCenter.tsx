import React, {Component} from 'react';
import styleAlbum from '../albumList/albumList.module.css';
import style from './personalCenter.module.css';
import {Button, Col, Divider, Menu, message, Row} from "antd";
import Logo from "../../components/logo/logo";
import {Link, Route, RouteComponentProps} from "react-router-dom";
import PersonalCenter1 from "./personalCenter/personalCenter";
import PersonalCenterInfo from "./personalCenterInfo/personalCenterInfo";
import Password from "./password/password";
import ModifyPersonalInfo from "./modifyPersonalInfo/modifyPersonalInfo";
import Notification from './notification/notification';
import Axios from "axios";
import {avatarUrl, mockPath} from "../../index";
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import NavbarAvatar from "../../components/navbar/navbarAvatar/navbarAvatar";
import {userInfoMobx, UserProperties} from "../../mobx/userMobx";
import {observer} from "mobx-react";
interface Props extends RouteComponentProps{
    userInfo: UserProperties;
}
@observer
class PersonalCenter extends Component<Props,{}> {
    onLinkClick = (link: string) => {
        this.props.history.push(link);
    };
    render() {
        let nickname = "", avatar = "", signature = "";
        if (this.props.userInfo) {
            nickname = this.props.userInfo.nickname;
            //avatar = this.props.userInfo.avatar;
            avatar = avatarUrl();
            signature = this.props.userInfo.signature;
        }
        return (
          <div>
              <div className={styleAlbum.body}>
                  <Navbar>
                      <NavbarLink title={"首页"} path={'/ '}/>
                      <NavbarLink title={'个人主页'} path={'/albumlist'}/>
                      <NavbarLink title={'个人中心'} path={'/personalCenter'}/>
                      <NavbarAvatar signature={signature} offset={12} nickname={nickname} avatar={avatar} {...this.props}/>
                  </Navbar>
                  <Row className={style['bottom-row']}>
                      <Col span={2} className={style['left-nav']}>
                          <img src={avatar}/>
                          <span>{nickname}</span>
                          <Button htmlType={'button'}
                                  onClick={() => this.onLinkClick('/personalCenter/modifyInfo')}>修改资料</Button>
                          <Button htmlType={'button'}
                                  onClick={() => this.onLinkClick('/personalCenter/password')}>修改密码</Button>
                          <Button htmlType={'button'}
                                  onClick={() => this.onLinkClick('/personalCenter/notification')}>我的消息</Button>
                      </Col>
                      <Col span={20} offset={2} className={style["right-content"]}>
                          <Route exact path={"/personalCenter"}
                                 render={() => <PersonalCenterInfo userInfo={userInfoMobx.userInfo} {...this.props}/>}/>
                          <Route path={"/personalCenter/password"} component={Password}/>
                          <Route path={"/personalCenter/modifyInfo"} render={()=><ModifyPersonalInfo userInfo={userInfoMobx.userInfo}{...this.props}/>}/>
                          <Route path={"/personalCenter/notification"} component={Notification}/>
                      </Col>
                  </Row>
              </div>
          </div>
        );
    }
}

export default PersonalCenter;
