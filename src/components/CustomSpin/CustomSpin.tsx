import React, {Component} from 'react';
import style from './CustomSpin.module.css';
import {Spin} from "antd";
class CustomSpin extends Component {
    render() {
        return (
            <div className={style.body}>
                <Spin size={"large"} tip={"Loading"}/>
            </div>
        );
    }
}

export default CustomSpin;
