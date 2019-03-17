import React, {Component} from 'react';
import style from './signup.module.css';
import {Button, Col, Row, Form, Input, Icon, notification} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {Link, RouteComponentProps} from "react-router-dom";
import Axios from "axios";
interface Props extends FormComponentProps , RouteComponentProps {

}
class Signup extends Component<Props,{}> {
    compareFirstPssword=(rules:any,value:any,callback:any)=>{
        console.log(value+this.props.form.getFieldValue("password"))
        if (value && value !== this.props.form.getFieldValue("password")) {
            callback("两次输入密码不一致!")
        }
    }
    usernameVlidate=(rules:any,value:string,callback:any)=>{
        if (value.includes("@")) {
            callback("用户名不能有@")
        }
    }
    loginButton=()=>{
        this.props.history.push("/signin");
    }
    registry=()=>{
        //发注册请求
        //data = JSON.stringify(data);
        Axios.post("/api/regist.do", {
                    username: this.props.form.getFieldValue("username"),
                    password: this.props.form.getFieldValue("password"),
                    email: this.props.form.getFieldValue("email")
            }
        ).then(value => {
            let status = value.data.status as string;
            if (status == "ok") {
                this.props.history.push("/album");
            } else if (status.startsWith("user")) {
                notification.info({
                    message:"用户名已经被注册了"
                })
            }else if (status.startsWith("email")) {
                notification.info({
                    message: "邮箱已经被注册"
                })
            }else {
                notification.info({
                    message:"账号密码错误,请重试"
                })
            }
        })
    }
    render() {
        const FormItem = Form.Item;
        // @ts-ignore
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className={style.body}>
                    <Row className={style.header+" mdui-hoverable"}>
                        <Col span={2} className={style.logo}>
                            <img className={style["logo-img-1"]} src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u0.png"}/>
                            <img className={style["logo-img-2"]} src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u53.png"}/>
                        </Col>
                        <Col span={4} className={style.registry}>
                            注册账号
                        </Col>
                        <Col span={4} offset={14} className={style.login}>
                            我已经注册,现在就&nbsp;&nbsp;
                            <Button type={"primary"} onClick={this.loginButton}>登录</Button>
                        </Col>
                    </Row>
                    <Row className={style.form}>
                        <Form className={style["inner-form"]} layout={"vertical"}>
                            <FormItem label={"用户名"}>
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required:true, message: '请输入用户名3-20个字符',min:3,max:20
                                    },{
                                        validator:this.usernameVlidate
                                    }],
                                })(
                                    <Input prefix={<Icon type={'user'}/>} />
                                )}
                            </FormItem>
                            <FormItem label={'password'}>
                                {
                                    getFieldDecorator('password',{
                                        rules: [{
                                            required:true,message: "密码至少8位",type:"string",min:8,max:20
                                        }]
                                    })(
                                        <Input type={'password'} prefix={<Icon type="lock"/>}/>
                                    )
                                }
                            </FormItem>
                            <FormItem label={'repassword'}>
                                {getFieldDecorator("repassword",{
                                    rules:[
                                        {
                                            required:true,message:"请输入确认密码",type:"string"
                                        },
                                        {
                                            validator: this.compareFirstPssword
                                        }
                                    ]
                                })(
                                    <Input type={'password'} prefix={<Icon type="lock"/>}/>
                                )}
                            </FormItem>
                            <FormItem label={'email'}>
                                {getFieldDecorator("email",{
                                    rules:[{
                                        required:true,type:"email",message:"邮箱格式错误哦"
                                    }]
                                })(
                                    <Input type={'email'}/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type={"primary"} block size={"large"} onClick={this.registry}>注册</Button>
                            </FormItem>
                        </Form>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Form.create()(Signup)
