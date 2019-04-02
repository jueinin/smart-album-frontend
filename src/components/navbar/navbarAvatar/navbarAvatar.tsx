import React, {Component} from 'react';
import {Button, Col, Dropdown, Menu, message} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";
import Axios from "axios";
import style from './navbarAvatar.module.css';
import {avatarUrl} from "../../../index";
interface Props extends RouteComponentProps{
  nickname: string;
  avatar: string;
  signature: string;
  span?: number;
  offset?: number;
}
class NavbarAvatar extends Component<Props,{}> {
  onLogout=()=>{
    Axios.post("/api/user/logout").then(value => {
      if (value.data.status === 'ok') {
        message.success("登出成功");
        this.props.history.push("/");
      }
    })
  }
  render() {
    let avatarOverlay=<Menu style={{textAlign:"center",width:"155px"}}>
      <Menu.Item>昵称:&nbsp;{this.props.nickname}</Menu.Item>
      <Menu.Item title={this.props.signature||"还没有个性签名呢"} className={style['signature']}>个性签名:&nbsp;{this.props.signature||"还没有个性签名呢"}</Menu.Item>
      <Menu.Item>
        <Button htmlType={'button'} onClick={this.onLogout}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
    return (
        <Dropdown overlay={avatarOverlay}>
          <Col span={this.props.span||2} offset={this.props.offset||4} className={style["nav-buttons"]}>
            <Link className={style['avatar-link']} to={'/personalCenter'}>
              <img className={style['avatar-img']}
                   src={avatarUrl()}/>
            </Link>
          </Col>
        </Dropdown>
    );
  }
}

export default NavbarAvatar;