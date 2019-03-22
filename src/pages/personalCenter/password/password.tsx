import React, {Component, FormEvent} from 'react';
import style from './password.module.css';
import {Button, Form, Input, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import Axios from "axios";
import {mockPath} from "../../../index";
import {RouteComponentProps} from "react-router";
interface Props extends FormComponentProps,RouteComponentProps{

}
class Password extends Component<Props,{}> {
    onSubmitPassword=(e:FormEvent)=>{
        e.preventDefault();
        console.log("ddd");
        this.props.form.validateFields((error, values) => {
                console.log(values);
                console.log("dddddd");
                const prePassword = this.props.form.getFieldValue("prePassword");      //这个回调函数不会被调用 原因不明
                const newPassword = this.props.form.getFieldValue("newPassword");
                Axios.post(`${mockPath}/api/user/changePassword`, {
                    prePassword, newPassword
                }).then(value => {
                    if (value.data.status === "ok") {
                        message.success("密码修改成功!,两秒后返回登录界面");
                        setTimeout(() => {
                            this.props.history.push("/signin");
                        }, 2000);
                    }
                });
            }
        );
    }
    comparePrePassword=(rules:any,value:any,callback:any)=>{
        const reNewPassword=this.props.form.getFieldValue("reNewPassword")
        const newPassword = this.props.form.getFieldValue("newPassword");
        if (reNewPassword && reNewPassword !== newPassword) {
            callback("两次输入密码不一致!");
            return;
        }
        callback();
    }
    render() {
        const getFieldDocorator = this.props.form.getFieldDecorator;
        return (
            <div>
                <Form onSubmit={this.onSubmitPassword}>
                    <Form.Item label={"原密码"}>
                        {getFieldDocorator("prePassword",{
                            rules:[{
                                required:true, message: "请输入原密码",
                            }]
                        })(
                            <Input type={"password"}/>
                        )}
                    </Form.Item>
                    <Form.Item label={"新密码"}>
                        {getFieldDocorator("newPassword",{
                            rules:[{
                                required:true, message: "请输入密码"
                            }]
                        })(
                            <Input type={"password"}/>
                        )}
                    </Form.Item>
                    <Form.Item label={"确认新密码"}>
                        {getFieldDocorator("reNewPassword",{
                            rules:[
                                {
                                    required:true ,message:"请输入确认密码",
                                },
                                {validator: this.comparePrePassword}
                            ]
                        })(
                            <Input type={"password"}/>
                        )}
                    </Form.Item>
                    <Button htmlType={"submit"}>修改密码</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Password);
