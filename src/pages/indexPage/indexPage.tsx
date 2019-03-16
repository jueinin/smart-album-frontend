import React, {Component} from 'react';
import {Button, Col, Input, Row} from "antd";
import {Link} from "react-router-dom";
import style from './indexPage.module.css';
class IndexPage extends Component {
    onSearch=()=>{
        //search
    }
    render() {
        const Search = Input.Search;
        return (
            <div>
                <div className={style["top-bar"]}>
                    <Row style={{paddingTop: 25}}>
                        <Col span={4} offset={20}>
                            <Link className={style["black-link"]} to={'/signin'}>登录</Link>&nbsp;|&nbsp;
                            <Link className={style["black-link"]} to={'/signup'}>注册</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style["search-bar-wrapper"]} span={8} offset={8}>
                            <div>
                                <img src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u0.png"}/>
                                <div className={style["search-input-wrapper"]}>
                                    <Input className={style["search-input"]} allowClear
                                           placeholder={"请输入关键字进行搜索"}/><Button type={"primary"}>搜索</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col span={24}>
                        <h1 style={{textAlign: "center"}}>服务支持</h1>
                    </Col>
                </Row>
                <div className={style["content-item-wrapper"]}>
                    <div className={style["content-item"]}>
                        <div>
                            <h3>超大存储空间</h3>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                        </div>
                    </div>
                    <div className={style["content-item"]}>
                        <div>
                            <h3>超大存储空间</h3>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                        </div>
                    </div>
                    <div className={style["content-item"]}>
                        <div>
                            <h3>超大存储空间</h3>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                            <p>
                                这里有文字介绍
                            </p>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col span={24}>
                        <h1 style={{textAlign:'center'}}>为您推荐</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className={style.promotiom} span={24}>
                        我是推荐
                    </Col>
                </Row>
                <Row>
                    <Col className={style.footer} span={24}>京网文[2013]0934-983号 Copyright ©2019 Newbee</Col>
                </Row>
            </div>
        );
    }
}

export default IndexPage;
