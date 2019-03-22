import React, {Component} from 'react';
import style from './personalCenter.module.css';
import Col from "antd/lib/grid/col";
import Row from "antd/lib/grid/row";

class PersonalCenter extends Component {

    render() {
        return (
            <React.Fragment>
                <Col span={7} offset={5}>
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
            </React.Fragment>
        );
    }
}

export default PersonalCenter;
