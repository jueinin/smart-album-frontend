import React, {Component, FormEvent} from 'react';
import style from './signup.module.css';
import {Button, Col, Row, Form, Input, Icon, notification, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {Link, RouteComponentProps} from "react-router-dom";
import Axios from "axios";
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import {
    emailField, emailOption,
    passwordField,
    passwordOption, rePasswordField,
    rePasswordOption,
    usernameField,
    usernameOption
} from "../../tools/fieldsValidate";
interface Props extends FormComponentProps , RouteComponentProps {

}
export const elseError=()=>{
    notification.info({message: "请求失败"});
}
class Signup extends Component<Props,{}> {
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
                    let res = err.data.message;
                    if (res === 'username has been registered') {
                        message.error("用户名已经被注册");
                    }else if (res === 'email has been registered') {
                        message.error("邮箱已经被注册");
                    } else if (res === 'already logged in') {
                        message.success("已经登录,即将跳转")
                        this.props.history.push("/albumlist");
                    }else {
                        
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
                              {getFieldDecorator('username', usernameOption())(
                                usernameField()
                              )}
                          </FormItem>
                          <FormItem label={'password'}>
                              {
                                  getFieldDecorator('password', passwordOption())(
                                    passwordField()
                                  )
                              }
                          </FormItem>
                          <FormItem
                            label={'repassword'}>{/*那个repasswordoption函数有种mobx的感觉  只要password值变化了 所有依赖于password字段的decorator都会重新跑一遍*/}
                              {getFieldDecorator("repassword", rePasswordOption(this.props.form.getFieldValue('password')))(
                                rePasswordField()
                              )}
                          </FormItem>
                          <FormItem label={'email'}>
                              {getFieldDecorator("email", emailOption())(
                                emailField()
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
