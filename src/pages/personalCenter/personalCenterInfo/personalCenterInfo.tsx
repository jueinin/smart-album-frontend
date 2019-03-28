import React, {Component} from 'react';
import style from './personalCenterInfo.module.css';
import Col from "antd/lib/grid/col";
import Row from "antd/lib/grid/row";
import {Button} from "antd";
import Axios from "axios";
import {mockPath} from "../../../index";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
import {RouteComponentProps} from "react-router";
import {parseGender} from "../modifyPersonalInfo/modifyPersonalInfo";
import {UserProperties} from "../../../mobx/userMobx";
import {observer} from "mobx-react";
interface Props extends RouteComponentProps{

}
interface Props{
    userInfo: UserProperties;
}
interface State {

}
@observer
class PersonalCenterInfo extends Component<Props,State> {
    onModifyPassword=()=>{
        this.props.history.push("/personalCenter/password");
    }
    onModifyInfo=()=>{
        this.props.history.push("/personalCenter/modifyInfo");
    }
    onOpenNotification=()=>{
        this.props.history.push("/personalCenter/notification")
    }
    render() {
        let userInfo = this.props.userInfo;
        let Item=(title:string,src:string)=>{
            return <div key={src} className={style['item-body']}>
                <img src={src} className={style.img}/>
                <div>
                    {title}
                </div>
            </div>
        }
        let bottomData:any[] = [];
        if (userInfo) {
            let {usedSpace, storeSpace} = this.props.userInfo;
            usedSpace = parseFloat((usedSpace / 1024 / 1024 / 1024).toFixed(2));
            storeSpace = parseFloat((storeSpace / 1024 / 1024 / 1024).toFixed(2));
            bottomData = [
                {
                    title: "相册数量" + this.props.userInfo.albumAmount + "本",
                    src: "http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u591.png"
                },
                {
                    title: "图片数量 " + this.props.userInfo.photoAmount + "本",
                    src: "http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u592.png"
                },
                {
                    title: `图片已用空间 ${usedSpace}GB/${storeSpace}GB`,
                    src: "http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u593.png"
                }
            ];
        }
        
        return (
            <React.Fragment>
                {userInfo?<Col span={24}>
                    <Row className={style.top}>
                        {/*<Col span={8}>
                            <Row>
                                <Col span={12}>
                                    <img src={this.props.userInfo.avatar}
                                         className={style.avatar}/>
                                </Col>
                                <Col span={12}>
                                    <Col span={24}>{this.props.userInfo.username}</Col>
                                    <Col span={24}>{parseGender(this.props.userInfo.gender)}</Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Button block onClick={this.onModifyInfo}>修改资料</Button>
                                </Col>
                                <Col span={24}>
                                    <Button block onClick={this.onModifyPassword}>修改密码</Button>
                                </Col>
                                <Col span={24}>
                                    <Button block onClick={this.onOpenNotification}>我的消息</Button>
                                </Col>
                            </Row>
                        </Col>*/}
                        <Col span={24} className={style['bottom-content']}>
                            <Row>
                                数据统计>>
                            </Row>
                            <Col span={24} className={style.bottom}>
                                {bottomData.map(value => {
                                    return Item(value.title, value.src);
                                })}
                            </Col>
                        </Col>
                    </Row>
                </Col>:<CustomSpin/>}
            </React.Fragment>
        );
    }
}

export default PersonalCenterInfo;
