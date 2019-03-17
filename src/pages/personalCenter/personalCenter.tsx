import React, {Component} from 'react';
import styleAlbum from '../albumList/albumList.module.css';
import style from './personalCenter.module.css';
import {Button, Col, Divider, Menu, Row} from "antd";
import Logo from "../../components/logo/logo";
import {Link} from "react-router-dom";
class PersonalCenter extends Component {
    render() {
        return (
            <div>
                <div className={styleAlbum.body}>
                    <Row className={style.nav}>
                        <Col className={style.height100}>
                            <Link to={"/"} className={style.logo}>
                                <img style={{height: "100%"}}
                                     src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u0.png"}/>
                                <img style={{height: "100%"}}
                                     src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u53.png"}/>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}>
                            <Menu>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>首页</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>个人信息</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>数据和个性化</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>安全性</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>用户和分享</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>付费和订阅</Link>
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>帮助</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={"/personalCenter"}>反馈</Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={20} offset={2} className={style["right-content"]}>
                            <Row>
                                <img src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u0.png"}/>
                            </Row>
                            <Row>
                                欢迎回来
                            </Row>
                            <Row>
                                艾菲奖厚爱u好的佛啊u哈佛iu阿红俘虏后
                            </Row>
                            <Row className={style["right-middle"]}>
                                <Row>
                                    <Col span={10}>fasfasf</Col>
                                    <Col span={10}>faddists</Col>
                                </Row>
                                <Row>
                                    <Col span={10}>fasfasf</Col>
                                    <Col span={10}>fsdfgsdgs</Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default PersonalCenter;
