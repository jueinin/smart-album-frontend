import React, {Component} from 'react';
import style from './resetPassword.module.css';
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import {Button, Form, Input, message} from "antd";
import {RouteComponentProps} from "react-router";
import {FormComponentProps} from "antd/lib/form";
import Axios from "axios";
interface Props extends FormComponentProps{

}
interface State {
  getVerificationDisable: boolean;
  remainSecs: number;
}
class ResetPassword extends Component<Props,State> {
  state:State={
    getVerificationDisable: false,
    remainSecs: undefined
  }
  i: any;
  onGetVerificationCode=()=>{
    this.props.form.validateFields((err,values)=>{
      if (!err) {
        Axios.get("/api/user/retrievePasswordByEmail",{
          params:{
            email: values.email
          }
        }).then(value => {
          if (value.data.status === 'ok') {
            message.success('邮件发送成功!');
            let secs = 5;
            this.setState({remainSecs:secs,getVerificationDisable:true},()=>{
              this.i = setInterval(() => {
                secs = secs - 1;
                this.setState({remainSecs: secs})
                if (secs === 0) {
                  clearInterval(this.i);
                  this.setState({remainSecs:undefined,getVerificationDisable:false})
                }
              }, 1000);
    
            })
          }
        })
      }
    })
    
    
  }
  render() {
    let {getFieldDecorator}=this.props.form
    return (
      <div className={style.body}>
        <Navbar>
          <NavbarLink title={'首页'} path={'/'}/>
        </Navbar>
        <Form className={style.form}>
          <Form.Item label={'输入您的绑定邮箱'}>
            &nbsp;&nbsp;{getFieldDecorator("email",{
              rules:[
                {
                  required: true,type:"email",message:"请输入正确的邮箱"
                }
              ]
          })(
              <Input type={'email'}/>
            )}
          </Form.Item>
          <Button htmlType={"button"} className={style['get-code']} disabled={this.state.getVerificationDisable} onClick={this.onGetVerificationCode}>{this.state.remainSecs||"获取验证链接"}</Button>
          <span>请按照邮箱指示操作</span>
          {/*
          <Form.Item label={"输入验证码"}>
             &nbsp;&nbsp; {
            getFieldDecorator('verification')(
              <Input type={'text'}/>
            )
          }<Button htmlType={"button"} className={style['get-code']} disabled={this.state.getVerificationDisable} onClick={this.onGetVerificationCode}>{this.state.remainSecs||"获取验证码"}</Button>
          </Form.Item>
          <Button htmlType={'submit'}>提交</Button>
          */}
        </Form>
      </div>
    );
  }
}

export default Form.create()(ResetPassword);