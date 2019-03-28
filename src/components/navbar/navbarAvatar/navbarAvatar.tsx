import React, {Component} from 'react';
import {Button, Col, Dropdown, message} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";
import Axios from "axios";
import style from './navbarAvatar.module.css';
interface Props extends RouteComponentProps{
  nickname: string;
  avatar: string;
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
    let avatarOverlay=<div style={{textAlign:"center"}}>
      <Button htmlType={'button'}onClick={this.onLogout}>
        退出登录
      </Button>
    </div>
    return (
        <Dropdown overlay={avatarOverlay}>
          <Col span={this.props.span||2} offset={this.props.offset||4} className={style["nav-buttons"]}>
            <Link className={style['avatar-link']} to={'/personalCenter'}>
              {this.props.nickname}&nbsp;&nbsp;&nbsp;&nbsp;
              <img className={style['avatar-img']}
                   src={this.props.avatar}/>
            </Link>
          </Col>
        </Dropdown>
    );
  }
}

export default NavbarAvatar;