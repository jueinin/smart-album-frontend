import React, {Component, FormEvent} from 'react';
import style from './signup.module.css';
import {Button, Col, Row, Form, Input, Icon, notification, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {Link, RouteComponentProps} from "react-router-dom";
import Axios from "axios";
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
interface Props extends FormComponentProps , RouteComponentProps {

}
export const elseError=()=>{
    notification.info({message: "因不可抗力,注册失败了"});
}
class Signup extends Component<Props,{}> {
    compareFirstPassword=(rules:any,value:any,callback:any)=>{
        //console.log(value+this.props.form.getFieldValue("password"))
        if (value && value !== this.props.form.getFieldValue("password")) {
            callback("两次输入密码不一致!")
            return;
        }
        callback();
    }
    usernameVlidate=(rules:any,value:string,callback:any)=>{
        if (value.includes("@")) {
            callback("用户名不能有@")
            return;
        }
        callback();
    }
    loginButton=()=>{
        this.props.history.push("/signin");
    }
    registry=(e:FormEvent)=>{
        //发注册请求
        //data = JSON.stringify(data);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Axios.post("/api/user/register", {
                        username: this.props.form.getFieldValue("username"),
                        password: this.props.form.getFieldValue("password"),
                        email: this.props.form.getFieldValue("email")
                    }
                ).then(value => {
                    let status = value.data.status as string;
                    console.log(status);
                    if (status == "ok") {
                        this.props.history.push("/albumlist");
                    }
                }).catch(err=>{
                    let res = err.response.data.message;
                    if (res === 'username has been registered') {
                        message.error("用户名已经被注册");
                    }else if (res === 'email has been registered') {
                        message.error("邮箱已经被注册");
                    } else {
                        elseError();
                    }
                })
            } else {
                message.error("请检查输入内容");
            }
        });
    }
    render() {
        const FormItem = Form.Item;
        // @ts-ignore
        const { getFieldDecorator } = this.props.form;
        return (
          <div>
              <div className={style.body}>
                  <Navbar>
                      <NavbarLink title={"首页"} path={'/'}/>
                      <NavbarLink title={"个人主页"} path={'/albumlist'}/>
                      <NavbarLink offset={13} title={'登录'} path={'/signin'} linkClassName={style['active-link']}/>
                      <NavbarLink title={'注册'} path={'/signup'}/>
                  </Navbar>
                  <Row className={style.form}>
                      <Form className={style["inner-form"]} layout={"vertical"} onSubmit={this.registry}>
                          <FormItem label={"用户名"}>
                              {getFieldDecorator('username', {
                                  rules: [{
                                      required: true, message: '请输入用户名3-20个字符', min: 3, max: 20
                                  }, {
                                      validator: this.usernameVlidate
                                  }],
                              })(
                                <Input prefix={<Icon type={'user'}/>}/>
                              )}
                          </FormItem>
                          <FormItem label={'password'}>
                              {
                                  getFieldDecorator('password', {
                                      rules: [{
                                          required: true, message: "密码至少8位", type: "string", min: 8, max: 20
                                      }]
                                  })(
                                    <Input type={'password'} prefix={<Icon type="lock"/>}/>
                                  )
                              }
                          </FormItem>
                          <FormItem label={'repassword'}>
                              {getFieldDecorator("repassword", {
                                  rules: [
                                      {
                                          required: true, message: "请输入确认密码", type: "string"
                                      },
                                      {
                                          validator: this.compareFirstPassword
                                      }
                                  ]
                              })(
                                <Input type={'password'} prefix={<Icon type="lock"/>}/>
                              )}
                          </FormItem>
                          <FormItem label={'email'}>
                              {getFieldDecorator("email", {
                                  rules: [{
                                      required: true, type: "email", message: "邮箱格式错误哦"
                                  }]
                              })(
                                <Input type={'email'}/>
                              )}
                          </FormItem>
                          <FormItem>
                              <Button type={"primary"} block size={"large"} htmlType={"submit"}>注册</Button>
                          </FormItem>
                      </Form>
                  </Row>
              </div>
          </div>
        );
    }
}

export default Form.create()(Signup)
