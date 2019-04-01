import React, {Component, FormEvent} from 'react';
import style from './signin.module.css';
import {Button, Form, Icon, Input, message, notification} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";
import Axios from "axios";
import {elseError} from "../signup/signup";
interface Props extends RouteComponentProps{

}
class SignIn extends Component<Props,{}> {
    username: React.RefObject<Input>;
    passwod: React.RefObject<Input>;

    constructor(props:any) {
        super(props);
        this.username = React.createRef();
        this.passwod = React.createRef();
    }

    signin=(e:FormEvent)=>{
        e.preventDefault();
        // @ts-ignore
        Axios.post("/api/user/login",{
            username: this.username.current ? this.username.current.input.value : "",
            password: this.username.current ? this.passwod.current.input.value : ""
        }).then(value => {
            const status = value.data.status as string;
            if (status == 'ok') {
                this.props.history.push("/albumlist");
            }
        }).catch(error=>{
            let msg= error.data.message;
            if (msg === 'username or email does not exist') {
                message.error("用户名或者邮箱不存在");
            }else if (msg === 'password error') {
                message.error('用户名或密码错误');
            }else if (msg === 'already logged in') {
                message.success("已经登录,即将跳转")
                this.props.history.push("/albumlist");
            } else {
                elseError();
            }
        })
    }
    render() {
        const FormItem = Form.Item;
        return (
            <div>
                <div className={style.body}>
                    <div className={style.form}>
                        <Form className={style["inner-form"]} onSubmit={this.signin}>
                            <FormItem label={'用户名'}>
                                <Input ref={this.username} prefix={<Icon type={'user'}/>}/>
                            </FormItem>
                            <FormItem label={'密码'}>
                                <Input ref={this.passwod} type={"password"} prefix={<Icon type={'lock'}/>}/>
                            </FormItem>
                            <FormItem>
                                <Button htmlType={'submit'} type={"primary"} block>登录</Button>
                            </FormItem>
                            <div className={style["form-bottom"]}>
                                <Link style={{float:'left'}} to={"/signup"}>立即注册</Link>
                                <Link style={{float:"right"}} to={'/resetPassword'}>忘记密码?</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
