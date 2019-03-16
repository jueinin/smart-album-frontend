import React, {Component} from 'react';
import style from './signin.module.css';
import {Button, Form, Icon, Input, notification} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";
import Axios from "axios";
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

    signin=()=>{
        // @ts-ignore
        Axios.post("/api/login.do",{
            username: this.username.current ? this.username.current.input.value : "",
            password: this.username.current ? this.username.current.input.value : ""
        }).then(value => {
            const status = value.data.status as string;
            if (status == 'ok') {
                this.props.history.push("/album");
            }else if (status.startsWith("username")) {
                notification.open({message:"用户名或者邮箱不存在"})
            }else if (status.startsWith("wrong")) {
                notification.open({message: "密码错误"})
            }
        })
    }
    render() {
        const FormItem = Form.Item;
        return (
            <div>
                <div className={style.body}>
                    <div className={style.form}>
                        <Form className={style["inner-form"]}>
                            <FormItem label={'用户名'}>
                                <Input ref={this.username} prefix={<Icon type={'user'}/>}/>
                            </FormItem>
                            <FormItem label={'密码'}>
                                <Input ref={this.passwod} type={"password"} prefix={<Icon type={'lock'}/>}/>
                            </FormItem>
                            <FormItem>
                                <Button type={"primary"} block onClick={this.signin}>登录</Button>
                            </FormItem>
                            <div className={style["form-bottom"]}>
                                <Link style={{float:'left'}} to={"/signup"}>立即注册</Link>
                                <Link style={{float:"right"}} to={'/'}>忘记密码?</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
