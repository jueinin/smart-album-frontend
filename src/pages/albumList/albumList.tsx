import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Menu, Modal, notification, Radio, Row, Upload} from "antd";
import Logo from '../../components/logo/logo';
import style from './albumList.module.css';
import SizeProgress from "../../components/sizeProgress/sizeProgress";
import {Route, Switch} from "react-router";
import AlbumList1 from '../../components/albumLIst/albumList';
import Share from "./share/share";
import {Link} from "react-router-dom";
import RecycleBin from "./recycleBin/recycleBin";
import {UploadChangeParam} from "antd/lib/upload";
import {UploadFile} from "antd/lib/upload/interface";
import {FormComponentProps} from "antd/lib/form";
import Axios from "axios";
interface Props extends FormComponentProps{

}
interface State {
    uploadModalVisible: boolean;
    uploadFileNames: string[];
    uploadFiles: UploadFile[];
    uploadMultipleVisible: boolean;
    uploadMultipleFiles: File[];
}
class AlbumList extends Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state={uploadModalVisible: false, uploadFileNames: [], uploadFiles: undefined, uploadMultipleVisible: false,
            uploadMultipleFiles: undefined}
    }
    onUploadClick=()=>{
        this.setState({uploadModalVisible: true})//图片名称 图片描述 是否公开默认不公开
    }
    onMultipleUploadClick=()=>{
        this.setState({uploadMultipleVisible: true})
    }
    onUploadModalClose=()=>{
        this.setState({uploadModalVisible:false})
    }
    onUploadMultipleClose=()=>{
        this.setState({uploadMultipleVisible: false})
    }
    onDraggerChange=(info:UploadChangeParam)=>{
        let filenames=info.fileList.map((value, index) => {
            return value.name as string;
        })
        console.log(info.fileList);
        let files=info.fileList.map((value, index) => {
            return value
        })
        this.setState({uploadFileNames: filenames, uploadFiles: files})
    }
    onUploadSubmit=()=>{
        const photoName = this.props.form.getFieldValue("photoName");
        const photoDescription = this.props.form.getFieldValue("photoDescription");
        const isPublic = this.props.form.getFieldValue("isPublic");
        const file = this.state.uploadFiles[0].originFileObj
        let formData = new FormData();
        formData.set("name", photoName);
        formData.set("description", photoDescription);
        // @ts-ignore
        formData.set("isPublic", isPublic == "isPublic" ? 1 : 0);
        formData.set("file", file);
        Axios.post("/api/photo/upload.do", formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'cookie':"JSESSIONID=F77A351799EBEED4C69E1BA34F20A624;"
            },
        }).then(value => {
            if (value.data.status === "ok") {
                notification.info({
                    message: "上传成功"
                });
            } else {
                notification.info({message: "上传失败"})
            }
        })
    }
    onMultipleSubmit=(file:any)=>{
        console.log(file.file)
        let formData = new FormData();
        formData.set("files", file.file);
        Axios.post("/api/photo/uploads.do", formData).then(value => {
            if (value.data.status !== "ok") {
                notification.info({message: "上传失败"})
            }
        })
    }
    componentDidMount(): void {
    }

    render() {
        const Search = Input.Search;
        const SubMenu = Menu.SubMenu;
        const MenuItem = Menu.Item;
        const FormItem = Form.Item;
        const Dragger = Upload.Dragger;
        const getFieldDecorator = this.props.form.getFieldDecorator;
        if (!this.props.form.getFieldValue("isPublic")) {
            this.props.form.setFieldsValue({isPublic: "isPrivate"})
        }
        return (
            <div>
                <Modal destroyOnClose footer={false} visible={this.state.uploadModalVisible}
                       onOk={this.onUploadModalClose}
                       onCancel={this.onUploadModalClose}>
                    <div>
                        <Form>
                            <FormItem label={"图片名称"}>
                                {getFieldDecorator("photoName", {})(<Input placeholder={"请输入图片名称"}/>)}
                            </FormItem>
                            <FormItem label={"图片描述"}>
                                {getFieldDecorator("photoDescription", {})(<Input placeholder={'请输入图片描述'}/>)}
                            </FormItem>
                            <FormItem label={'是否公开'}>
                                {getFieldDecorator("isPublic", {})(<Radio.Group>
                                    <Radio value={'isPublic'}>公开</Radio>
                                    <Radio value={'isPrivate'}>私密</Radio>
                                </Radio.Group>)}
                            </FormItem>
                            <FormItem label={"拖动图片上传"}>
                                <Dragger showUploadList={false} onChange={this.onDraggerChange} accept={"image/*"}
                                         customRequest={() => {
                                         }}>
                                    <p>点击或者拖动文件到这里即可上传</p>
                                </Dragger>
                            </FormItem>
                            <div>
                                {this.state.uploadFileNames.map((value, index) => {
                                    return <p key={index}>{value}</p>;
                                })}
                            </div>
                            <FormItem className={style["upload-modal-submit"]}>
                                <Button type={"primary"} onClick={this.onUploadSubmit}>提交</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
                <Modal destroyOnClose visible={this.state.uploadMultipleVisible} footer={false}
                       onCancel={this.onUploadMultipleClose}>
                    <Dragger accept={"image/*"} multiple customRequest={this.onMultipleSubmit}>
                        <p></p>
                        <p>点击批量上传</p>
                        <p></p>
                    </Dragger>
                </Modal>
                <div className={style.body}>
                    <Row className={style.nav}>
                        <Logo title={'主页'}/>
                        <Col span={6} offset={4} className={style["search-wrapper"]}>
                            <div style={{width: "100%"}}>
                                <Search enterButton size={"large"} className={style["search-input"]}
                                        placeholder={"请输入关键字查询"}/>
                            </div>
                        </Col>
                        <Col span={3} offset={1} className={style["nav-buttons"]}>
                            <Button>
                                <Icon type="plus"/>创建
                            </Button>
                            <Button style={{marginLeft: 30}} onClick={this.onUploadClick}>
                                <Icon type="upload"/>上传
                            </Button>
                            <Button style={{marginLeft: 30}} onClick={this.onMultipleUploadClick}>
                                <Icon type="upload"/>批量上传
                            </Button>
                        </Col>
                        <Col span={1} offset={4} className={style["nav-buttons"]}>
                            username&nbsp;&nbsp;&nbsp;&nbsp;
                            <img className={"mdui-img-fluid mdui-img-circle"}
                                 src={"http://jueinin.oss-cn-hongkong.aliyuncs.com/photo/u113.png"}/>
                        </Col>
                    </Row>
                    <Row className={style["bottom-content"]}>
                        <Col span={2} className={style.height100}>
                            <Menu defaultSelectedKeys={['allFiles']}>
                                <MenuItem key={'allFiles'}>
                                    <Link to={'/albumList'}>全部文件</Link>
                                </MenuItem>
                                <MenuItem key={'share'}>
                                    <Link to={'/albumList/share'}>我的分享</Link>
                                </MenuItem>
                                <MenuItem key={'rubbish'}>
                                    <Link to={'/albumList/recycleBin'}>回收站</Link>
                                </MenuItem>
                            </Menu>
                            <div className={style["left-nav-bottom"]}>
                                <SizeProgress progress={30} height={10}/>
                                30G/500G
                            </div>
                        </Col>
                        <Col span={20} offset={1} className={style.height100}>
                            <Row className={style["right-top-nav"]}>
                                <Button size={"large"}>相册列表</Button>
                                <Button size={"large"} style={{marginLeft: 20}}>智能分类</Button>
                                <Button size={"large"} style={{marginLeft: 20}}>全部图片</Button>
                            </Row>
                            <div>
                                <Switch>
                                    <Route exact path={'/albumList'} component={AlbumList1}/>
                                    <Route path={'/albumList/share'} component={Share}/>
                                    <Route path={'/albumList/recycleBin'} component={RecycleBin}/>
                                </Switch>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Form.create()(AlbumList);
