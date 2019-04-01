import React, {Component, FormEvent} from 'react';
import Axios from "axios";
import {RouteComponentProps} from "react-router";
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import {Button, Form, Input, message} from "antd";
import style from "../resetPassword/resetPassword.module.css";
import {FormComponentProps} from "antd/lib/form";
import {elseError} from "../signup/signup";
import {passwordField, passwordOption, rePasswordField, rePasswordOption} from "../../tools/fieldsValidate";
interface Props extends RouteComponentProps,FormComponentProps{

}
interface State {
  verificated: boolean;
}
class RetrievePassword extends Component<Props,State> {
  state:State={
    verificated: false
  }
  sid: string;
  userId: number;
  componentDidMount(): void {
    let sid=this.props.location.search.substring(1).split("=")[1]
    this.sid = sid;
    console.log(sid);
    Axios.get('/api/user/verifySid',{
      params:{
        sid
      }
    }).then(value => {
      if (value.data.status === 'ok') {
        this.setState({verificated: true})
        this.userId = value.data.userId;
      }
    }).catch(err=>{
      let msg = err.data.message;
      if (msg === 'sid expired or not exist') {
        message.error("链接过期或不存在");
      } else {
        elseError();
      }
    })
    
    //let sid = this.props.location.pathname.split("?")[1].split("=")[1];
  }
  onSubmit=(e:FormEvent)=>{
    e.preventDefault()
    this.props.form.validateFields((err:any,value:any)=>{
      if (!err) {
        let formData = new FormData();
        formData.append("sid", this.sid);
        formData.append("userId", this.userId + "");
        formData.append("newPassword", value.password);
        Axios.post("/api/user/retrievePassword", formData).then(value1 => {
          if (value1.data.status === 'ok') {
            message.success("修改成功,1秒后返回")
            setTimeout(() => {
              this.props.history.push("/signin")
            }, 1000)
          }
        }).catch(err => {
          let msg = err.data.message;
          if (msg === 'sid expired or not exist') {
            message.error("链接过期或不存在");
          } else {
            elseError();
          }
        });
      } else {
        message.warn("请检查您的输入")
      }
    })
   
  }
  render() {
    let {getFieldDecorator} =this.props.form
    return (
      <div>
        <Navbar>
          <NavbarLink title={'首页'} path={'/'}/>
        </Navbar>
        <Form className={style.form} onSubmit={this.onSubmit}>
          <Form.Item label={'输入您的新密码'}>
            &nbsp;&nbsp;{getFieldDecorator("password", passwordOption())(
            passwordField()
          )}
          </Form.Item>
          <Form.Item label={"确认密码"}>
            &nbsp;&nbsp; {
            getFieldDecorator('repassword', rePasswordOption(this.props.form.getFieldValue('password')))(
              rePasswordField()
            )
          }
          </Form.Item>
          <Button htmlType={'submit'}>提交</Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(RetrievePassword);