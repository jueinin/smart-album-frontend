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
interface Props extends RouteComponentProps{

}
interface State {
    data:{
        username: string;
        avatar: string;
        gender: number;
        albumAmount: number;
        photoAmount: number;
        storeSpace: number;
        usedSpace: number;
    }
    bottomData: BottomData[];
}
interface BottomData {
    title: string;
    src: string;
}
class PersonalCenterInfo extends Component<Props,State> {
    state:State={
        data: undefined,
        bottomData: undefined
    }
    getData=()=>{
        Axios.get(mockPath+"/api/user/getInfo").then(value => {
            this.setState({data: value.data},()=>{
                this.setState({bottomData: [
                        {
                            title: "相册数量" + this.state.data.albumAmount + "本",
                            src: "http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u591.png"
                        },
                        {
                            title: "图片数量 " + this.state.data.photoAmount + "本",
                            src: "http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u592.png"
                        },
                        {
                            title: `图片已用空间 ${this.state.data.usedSpace}/${this.state.data.storeSpace}`,
                            src: "http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u593.png"
                        }
                    ]})
            })
        })
    }
    componentDidMount(): void {
        this.getData();
    }
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
        let Item=(title:string,src:string)=>{
            return <div key={src}>
                <img src={src} className={style.img}/>
                <div>
                    {title}
                </div>
            </div>
        }
        return (
            <React.Fragment>
                {this.state.bottomData?<Col span={24}>
                    <Row className={style.top}>
                        <Col span={8}>
                            <Row>
                                <Col span={12}>
                                    <img src={this.state.data.avatar}
                                         className={style.avatar}/>
                                </Col>
                                <Col span={12}>
                                    <Col span={24}>{this.state.data.username}</Col>
                                    <Col span={24}>{parseGender(this.state.data.gender)}</Col>
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
                        </Col>
                        <Col span={24}>
                            <Row>
                                数据统计>>
                            </Row>
                            <Col span={24} className={style.bottom}>
                                {this.state.bottomData.map((value, index) => {
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
