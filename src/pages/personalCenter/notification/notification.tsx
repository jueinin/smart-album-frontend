import React, {Component} from 'react';
import style from './notification.module.css';
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import {Button, message, Table} from "antd";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import Axios from "axios";
import {mockPath} from "../../../index";
import {TableRowSelection} from "antd/lib/table";
interface NotificationItem {
    type: "system" | "like";
    content: string;
    time: string;
    id: number;
}
class NotificationMobx {
    @observable notifications: NotificationItem[]=[];
    @action
    getNotification(){
        Axios.get(`${mockPath}/api/user/notification`).then(value => {
            this.notifications = value.data;
        })
    }
}

let notimobx = new NotificationMobx();
interface Props {
    notifications: NotificationItem[];
}
interface State {
    showNotifications: NotificationItem[];
    selectedId: string[];
}
@observer
class Notification extends Component<Props,State> {
    state:State={
        showNotifications: this.props.notifications, selectedId: undefined
    }
    componentDidMount(): void {
        notimobx.getNotification();
        this.setState({showNotifications: this.props.notifications})
    }
    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({showNotifications: nextProps.notifications})
    }

    onAllNoti=()=>[
        this.setState({showNotifications: this.props.notifications})
    ]
    onSystemNoti=()=>{
        this.setState({showNotifications:this.props.notifications.filter((value, index) => {   // //axios 配置401跳转  mobx
                return value.type === "system";
            })})
    }
    onLikeNoti=()=>{
        this.setState({showNotifications:this.props.notifications.filter((value, index) => {   // //axios 配置401跳转  mobx
                return value.type === "like";
            })})
    }
    rowSelection:TableRowSelection<NotificationItem>={
        onChange:((selectedRowKeys, selectedRows) => {
            this.setState({selectedId: selectedRowKeys as string[]})
        })
    }
    deleteMessage=()=>{
        let deletedMessage = this.state.selectedId;
        const data={
            deletedMessage: deletedMessage
        }
        Axios.post(`${mockPath}/api/user/deleteNotifications`,data).then(value => {
            if (value.data.status === 'ok') {
                message.success("删除成功");
                notimobx.getNotification();
            }
        })
    }
    deleteAllMessage=()=>{
        let ids = this.state.showNotifications.map(value => value.id + "");
        const data={
            deletedMessage: ids
        }
        Axios.post(`${mockPath}/api/user/deleteNotifications`,data).then(value => {
            if (value.data.status === 'ok') {
                message.success("删除成功");
                notimobx.getNotification();
            }
        })
    }
    render() {
        let data=this.state.showNotifications.map((value, index) => {
            // @ts-ignore
            value.key = value.id + "";
            return value
        })
        return (
            <Col span={24}>
                <Row>
                    <Col offset={2} span={4}>
                        <Button onClick={this.onAllNoti}>全部通知</Button>
                    </Col>
                    <Col offset={2} span={4}>
                        <Button onClick={this.onSystemNoti}>系统通知</Button>
                    </Col>
                    <Col offset={2} span={4}>
                        <Button onClick={this.onLikeNoti}>赞通知</Button>
                    </Col>
                </Row>
                <Row>
                    <Col offset={2} span={4}>
                        <Button onClick={this.deleteMessage}>删除通知</Button>
                    </Col>
                    <Col offset={2} span={4}>
                        <Button onClick={this.deleteAllMessage}>清空通知</Button>
                    </Col>
                </Row>
                <div>
                    <Table dataSource={data} rowSelection={this.rowSelection}>
                        <Table.Column  dataIndex={"content"} title={"通知内容"}/>
                        <Table.Column dataIndex={"time"} title={"通知时间"}/>
                        <Table.Column dataIndex={"type"} title={"通知人"}/>
                    </Table>
                </div>
            </Col>
        );
    }
}
@observer
class NotificationWrapper extends Component{
    render(){
        return <React.Fragment>
            <Notification notifications={notimobx.notifications}/>
        </React.Fragment>
    }
}

export default NotificationWrapper;
