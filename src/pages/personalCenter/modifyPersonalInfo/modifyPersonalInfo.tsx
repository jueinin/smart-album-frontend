import React, {Component, FormEvent} from 'react';
import Col from "antd/lib/grid/col";
import Row from "antd/lib/grid/row";
import {Button, Form, Input, message, Select, Upload} from "antd";
import Axios from "axios";
import {avatarUrl, mockPath} from "../../../index";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
import {FormComponentProps} from "antd/lib/form";
import {RcFile} from "antd/lib/upload/interface";
import {userInfoMobx, UserProperties} from "../../../mobx/userMobx";
import {observer} from "mobx-react";
interface State {
    uploadAvatar: File;
    avatarUrl: string;
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
export const reverseParseGender = (gender: string) => {
    switch (gender) {
        case '男':
            return 1;
        case '女':
            return 2;
        case "保密":
            return 0;
        default:
            return 0;
    }
};
interface Props extends FormComponentProps{
    userInfo: UserProperties;
}
@observer
class ModifyPersonalInfo extends Component<Props,State> {
    state:State={
        uploadAvatar: undefined, avatarUrl: undefined
    }
    onSubmit=(e:FormEvent)=>{
        e.preventDefault();
        this.props.form.validateFields((error,values)=>{
            if (!error) {
                const gender =reverseParseGender( values.userGender)+"";
                const userNickName = values.userNickName;
                const signature = values.userSignature;
                const avatar = this.state.uploadAvatar;
                let formData = new FormData();
                formData.append("gender", gender);
                formData.append("nickname", userNickName);
                formData.append("signature", signature);
                if (avatar) {
                    formData.append("avatar", avatar);
                }
                Axios.post(`/api/user/editInfo`,formData).then(value => {
                    if (value.data.status === "ok") {
                        message.success("修改成功!");
                        userInfoMobx.getUserInfo();
                    }
                });
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
                this.setState({avatarUrl:url})
            }
        })
        return false
    }
    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        let userInfo = this.props.userInfo;
        let avatar = "";
        if (userInfo) {
            //avatar = userInfo.avatar;
            avatar = avatarUrl();
            if (this.state.uploadAvatar) {
                avatar=this.state.avatarUrl;
            }
        }
        
        return (
            <React.Fragment>
                {userInfo? <Col span={24}>
                    <Form onSubmit={this.onSubmit}>
                        <Col span={8}>
                            <Row>
                                <Col span={8}>
                                    <Col span={24}>
                                        <img style={{width:"100%"}} src={avatar}/>
                                    </Col>
                                    <Col span={24}>
                                        <Upload showUploadList={false} accept={"image/*"} beforeUpload={this.beforeUpload}>
                                            <Button>上传头像</Button>
                                        </Upload>
                                    </Col>
                                </Col>
                                <Col span={14} offset={2}>
                                    <Col span={24}>
                                        用户名 <br></br>
                                        <span>
                                            {userInfo.username}
                                        </span>
                                    </Col>
                                    <Col span={24}>
                                        性别 {getFieldDecorator("userGender",{
                                        initialValue: parseGender(userInfo.gender)
                                    })(
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
                                {getFieldDecorator("userNickName",{
                                    initialValue:userInfo.nickname
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item label={"个性签名"}>
                                {getFieldDecorator("userSignature",{
                                    initialValue: userInfo.signature
                                })(
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
