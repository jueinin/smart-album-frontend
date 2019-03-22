import React, {Component, FormEvent} from 'react';
import Col from "antd/lib/grid/col";
import Row from "antd/lib/grid/row";
import {Button, Form, Input, message, Select, Upload} from "antd";
import Axios from "axios";
import {mockPath} from "../../../index";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
import {FormComponentProps} from "antd/lib/form";
import {RcFile} from "antd/lib/upload/interface";
interface State {
    data:{
        avatar: string;
        username: string;
        gender: number;
        nickname: string;
        signature: string;
    };
    uploadAvatar: File;
}
export const parseGender=(gender:number)=>{
    if (gender == 0) {
        return "保密";
    }else if (gender == 1) {
        return "男";
    } else {
        return "女";
    }
}
interface Props extends FormComponentProps{

}
class ModifyPersonalInfo extends Component<Props,State> {
    state:State={
        data: undefined, uploadAvatar: undefined
    }
    getData=()=>{
        Axios.get(mockPath+"/api/user/getInfo").then(value => {
            this.setState({data: value.data},()=>{
                console.log(this.state.data.nickname);
                this.props.form.setFieldsValue({
                    userSignature: this.state.data.signature,
                    username: this.state.data.username,
                    userGender: this.state.data.gender,
                    userNickName: this.state.data.nickname
                })
            })
        })
    }
    componentDidMount(): void {
        this.getData();
    }
    onSubmit=(e:FormEvent)=>{
        e.preventDefault();
        this.props.form.validateFields((error,values)=>{
            if (!error) {
                const username = values.username;
                const gender = values.userGender;
                const userNikeName = values.userNickName;
                const signature = values.userSignature;
                const avatar = this.state.uploadAvatar;
                let formData = new FormData();
                formData.append("name", username);
                formData.append("gender", gender);
                formData.append("nikeName", userNikeName);
                formData.append("signature", signature);
                formData.append("avatar", avatar);
                Axios.post(`${mockPath}/api/user/info`,formData).then(value => {
                    if (value.data.status === "ok") {
                        message.success("修改成功!");
                        this.getData();
                    }
                })
            }
        })
    }
    beforeUpload=(file:RcFile)=>{
        this.setState({uploadAvatar: file},()=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=(ev)=>{
                // @ts-ignore
                let url = ev.target.result;
                this.setState({data: {...this.state.data, avatar: url}})
            }
        })
        return false
    }
    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        return (
            <React.Fragment>
                {this.state.data? <Col span={24}>
                    <Form onSubmit={this.onSubmit}>
                        <Col span={8}>
                            <Row>
                                <Col span={8}>
                                    <Col span={24}>
                                        <img style={{width:"100%"}} src={this.state.data.avatar}/>
                                    </Col>
                                    <Col span={24}>
                                        <Upload accept={"image/*"} beforeUpload={this.beforeUpload}>
                                            <Button>上传头像</Button>
                                        </Upload>
                                    </Col>
                                </Col>
                                <Col span={14} offset={2}>
                                    <Col span={24}>
                                        用户名 {getFieldDecorator("username",)(
                                            <Input type={"text"}/>
                                    )}
                                    </Col>
                                    <Col span={24}>
                                        性别 {getFieldDecorator("userGender")(
                                        <Select>
                                            <Select.Option value={"男"}>男</Select.Option>
                                            <Select.Option value={"女"}>女</Select.Option>
                                            <Select.Option value={"保密"}>保密</Select.Option>
                                        </Select>
                                    )}
                                    </Col>
                                </Col>
                            </Row>
                            <Form.Item label={"昵称"}>
                                {getFieldDecorator("userNickName")(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item label={"个性签名"}>
                                {getFieldDecorator("userSignature")(
                                    <Input.TextArea rows={7}/>
                                )}
                            </Form.Item>
                            <Button htmlType={"submit"}>确认修改</Button>
                        </Col>
                    </Form>
                </Col>:<CustomSpin/>}
            </React.Fragment>
        );
    }
}

export default Form.create()(ModifyPersonalInfo);
