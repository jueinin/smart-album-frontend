import React, {Component} from 'react';
import style from './logo.module.css';
import {Col, Row} from "antd";
interface Props {
    title: string;
}
class Logo extends Component<Props,{}> {
    render() {
        return (
            <React.Fragment>
                <Col style={{height: "100%"}} span={2}>
                    <div className={style.body}>
                        <img className={style.img} src={'http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u0.png'}/>
                        <img className={style.img} src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u53.png"}/>
                    </div>
                </Col>
                <Col className={style["title-nav"]} span={1}>&nbsp;{this.props.title}</Col>
            </React.Fragment>
        );
    }
}

export default Logo;
