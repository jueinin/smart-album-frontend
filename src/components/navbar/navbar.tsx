import React, {Component} from 'react';
import {Col, Row} from "antd";
import style from './navbar.module.css';
class Navbar extends Component {
    render() {
        return (
          <Row className={style.row}>
              <Col span={3}>
                  <img src={'http://jueinin.oss-cn-hongkong.aliyuncs.com/smart-album/logo.png'} className={style.logo}/>
              </Col>
              {this.props.children}
          </Row>
        );
    }
}

export default Navbar;