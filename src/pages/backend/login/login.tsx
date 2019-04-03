import React, {Component, FormEvent} from 'react';
import {Button, Form, Input, message} from "antd";
import style from './login.module.css';
import Axios from "axios";
import {RouteComponentProps} from "react-router";

class Login extends Component<RouteComponentProps,{}> {
  username: React.RefObject<Input> = React.createRef();
  password: React.RefObject<Input> = React.createRef();
  onSubmit=(e:FormEvent)=>{
    e.preventDefault();
    Axios.post('/backendApi/login',{
      username: this.username.current.input.value,
      password: this.password.current.input.value
    }).then(value => {
      if (value.data.status === 'ok') {
        message.success('登录成功');
        this.props.history.push("/backend/index");
      }else if (value.data.status == 'err password') {
        message.error("密码错误");
      }else if (value.data.status === 'not found') {
        message.error("无效的用户名");
      }else if (value.data.status === 'already login') {
        this.props.history.push('/backend/index');
      }
    }).catch(err=>{
      message.error('服务器错误');
    })
  }
  render() {
    return (
      <div className={style.body}>
        <Form className={style.form} onSubmit={this.onSubmit}>
          <h2 className={style['text-center']}>欢迎来到后台管理</h2>
          <Form.Item label={"账号"}>
            <Input ref={this.username} type={'text'}/>
          </Form.Item>
          <Form.Item label={'密码'}>
            <Input type={'password'} ref={this.password}/>
          </Form.Item>
          <div className={style['text-right']}>
            <Button htmlType={'submit'}>登录</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;