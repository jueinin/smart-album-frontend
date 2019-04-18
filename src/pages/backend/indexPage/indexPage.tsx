import React, {Component} from 'react';
import style from './indexPage.module.css';
import {RouteComponentProps} from "react-router";
import Axios from "axios";
import Navbar from "../../../components/navbar/navbar";
import {List, message} from "antd";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
interface Props extends RouteComponentProps{

}
interface GetInfo {
  picAmount: number;
  userAmount: number;
  onlineUsers: number;
  userOnlineTime: number;//second
  dailyAddUser: number;
  usedSpace: number;
  remainSpace: number;
  dailyAddSpace: number;
}
interface State {
  data: GetInfo;
}
class IndexPage extends Component<Props,State> {
  state:State={
    data: undefined
  }
  componentDidMount(): void {
    
    Axios.get("/backendApi/getInfo").then(value => {
    this.setState({data: value.data})
    }).catch(err=>{
      if (err.data.message === "not authed") {
        message.error("请登陆后重试");
        this.props.history.push('/backend/login');
      }
    })
  }
  renderItem=(item)=>{
  
  }
  convertSpace=(bytes:number)=>{
    let mb = bytes / 1024 / 1024;
    if (mb > 1024) {
      return `${(mb / 1024).toFixed(2)}GB`;
    } else {
      return mb.toFixed(2) + "MB";
    }
  }
  render() {
    return (
      <div>
        <Navbar>
        </Navbar>
        <div>
          {this.state.data?<List renderItem={null} bordered>
            <List.Item>总图片数量: {this.state.data.picAmount}张</List.Item>
            <List.Item>总用户量: {this.state.data.userAmount}</List.Item>
            <List.Item>在线用户: {this.state.data.onlineUsers}</List.Item>
            <List.Item>今日用户在线总时长: {this.state.data.userOnlineTime}</List.Item>
            <List.Item>今日新增用户: {this.state.data.dailyAddUser}</List.Item>
            <List.Item>已经占用容量: {this.convertSpace(this.state.data.usedSpace)}</List.Item>
            <List.Item>服务器剩余容量: {this.convertSpace(this.state.data.remainSpace)}</List.Item>
            <List.Item>今日新增占用容量: {this.convertSpace(this.state.data.dailyAddSpace)}</List.Item>
          </List>:<CustomSpin/>}
        </div>
      </div>
    );
  }
}

export default IndexPage;