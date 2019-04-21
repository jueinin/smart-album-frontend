import React, {Component} from 'react';
import style from './indexPage.module.css';
import {Button, Col, Input, Row} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import {observer} from "mobx-react";
import NavbarAvatar from "../../components/navbar/navbarAvatar/navbarAvatar";
import {userInfoMobx} from "../../mobx/userMobx";
import {albumListMobx} from "../../mobx/albumListMobx";
import Axios from "axios";
import PhotosShow from "../albumList/phototsShow/photosShow";
@observer
class IndexPage extends Component<RouteComponentProps> {
    input: React.RefObject<Input> = React.createRef();
    onSearch=()=>{
        let value = this.input.current.input.value;
        this.props.history.push("/search?keyword=" + value);
    }
    componentDidMount(): void {
        Axios.get('/api/user/checkLoginStatus').then(value => {
            if (value.data.status === 'not login') {
                userInfoMobx.userInfo = undefined;
            } else {
                userInfoMobx.getUserInfo();
            }
        })
    }
    
    render() {
        const Search = Input.Search;
        
        return (
          <div>
              <div className={style["top-bar"]}>
                  <Navbar>
                      <NavbarLink active title={"首页"} path={'/'}/>
                      <NavbarLink title={"个人主页"} path={'/albumlist'}/>
                      {userInfoMobx.userInfo ?
                        <NavbarAvatar signature={userInfoMobx.userInfo.signature}
                                      nickname={userInfoMobx.userInfo.nickname} avatar={userInfoMobx.userInfo.avatar} offset={13} {...this.props}/> : <React.Fragment>
                            <NavbarLink title={"登录"} path={'/signin'} offset={13}/>
                            <NavbarLink title={'注册'} path={'/signup'} linkClassName={style['active-link']}/>
                        </React.Fragment>}
                  </Navbar>
                  <Row>
                      <Col className={style["search-bar-wrapper"]} span={8} offset={8}>
                          <div>
                              <h2 className={style.title}>欢迎来到NEWBEE</h2>
                              <div className={style["search-input-wrapper"]}>
                                  <Input ref={this.input} className={style["search-input"]} allowClear onPressEnter={this.onSearch}
                                         placeholder={"请输入关键字进行搜索"}/><Button type={"primary"}
                                                                             onClick={this.onSearch}>搜索</Button>
                              </div>
                          </div>
                      </Col>
                  </Row>
              </div>
              <Row>
                  <Col span={24}>
                      <h1 style={{textAlign: "center", fontWeight: 800}}>服务支持</h1>
                  </Col>
              </Row>
              <div className={style["content-item-wrapper"]}>
                  <div className={style["content-item"]}>
                      <div>
                          <img className={style['content-icon']}
                               src={'http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E8%B6%85%E5%A4%A7%E5%AD%98%E5%82%A8%E7%A9%BA%E9%97%B4logo.png'}/>
                          <h3>超大存储空间</h3>
                          <p>
                              免费帐户1G存储空间
                          </p>
                          <p>
                              VIP每月10G存储空间
                          </p>
                          <p>
                              超级VIP每月100G存储空间
                          </p>
                          <p>
                              终生会员不限存储空间
                          </p>
                      </div>
                  </div>
                  <div className={style["content-item"]}>
                      <div>
                          <img className={style['content-icon']}
                               src={'http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E6%99%BA%E8%83%BD%E4%BA%91%E5%AD%98%E5%82%A8%E6%8A%80%E6%9C%AF.png'}/>
                          <h3>智能云存储技术</h3>
                          <p>
                              急速上传云端
                          </p>
                          <p>
                              自动分类照片至云端
                          </p>
                          <p>
                              多人云端管理相册
                          </p>
                          <p>
                              照片可打包快速下载至本地
                          </p>
                      </div>
                  </div>
                  <div className={style["content-item"]}>
                      <div>
                          <img className={style['content-icon']}
                               src={'http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/%E8%AF%AF%E5%88%A0%E6%89%BE%E5%9B%9E%E7%85%A7%E7%89%87.png'}/>
                          <h3>误删找回照片</h3>
                          <p>
                              照片意外删除可找回
                          </p>
                          <p>
                              误分享可撤回
                          </p>
                          <p>
                              免费用户每月三次找回功能
                          </p>
                          <p>
                              超级VIP每月100次找回机会
                          </p>
                      </div>
                  </div>
              </div>
              <Row>
                  <Col span={24}>
                      <h1 style={{textAlign: 'center'}}>为您推荐</h1>
                  </Col>
              </Row>
              <Row>
                  <Col className={style.promotiom} span={24}>
                  <PhotosShow promotionPage searchShowPage type={"promotionPhotos"}/>
                  </Col>
              </Row>
              <Row className={style.footer}>
                  <Col span={24}>
                      <Link to={'/'}>关于图片</Link>
                      <Link to={'/'}>意见反馈</Link>
                      <Link to={'/'}>常见问题</Link>
                      <Link to={'/'}>客户服务</Link>
                  </Col>
                  <Col span={24}>京网文[2013]0934-983号 Copyright ©2019 Newbee</Col>
              </Row>
          </div>
        );
    }
}

export default IndexPage;
