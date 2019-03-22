import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Menu, message, Modal, notification, Radio, Row, Select, Upload} from "antd";
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
import PhotosShow from "./phototsShow/photosShow";
import CustomSpin from "../../components/CustomSpin/CustomSpin";
interface Props extends FormComponentProps{

}
interface AlbumListProps{
    albumId: number;
    name: string;
}
interface State {
    uploadModalVisible: boolean;
    uploadFileNames: string[];
    uploadFiles: UploadFile[];
    uploadMultipleVisible: boolean;
    createAlbumVisible: boolean;
    uploadMultipleFiles: File[];
    albumList: AlbumListProps[];
}
class AlbumList extends Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state={uploadModalVisible: false, uploadFileNames: [], uploadFiles: undefined, uploadMultipleVisible: false,
            uploadMultipleFiles: undefined, createAlbumVisible: false, albumList: undefined}
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
        const albumId = this.props.form.getFieldValue("albumId");
        let formData = new FormData();
        formData.set("name", photoName);
        formData.set("description", photoDescription);
        // @ts-ignore
        formData.set("isPublic", isPublic == "isPublic" ? 1 : 0);
        formData.set("file", file);
        formData.set("albumId", albumId);
        Axios.post("/api/photo/upload", formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
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
        Axios.post("/api/photo/uploads", formData).then(value => {
            if (value.data.successCount !== 1) {
                notification.info({message: "上传失败"});
            } else {
                notification.success({message: "上传成功"})
            }
        }).catch(err=>{
            notification.info({message: "上传失败"});
        })
    }
    onCreateAlbumCancel=()=>{
        this.setState({createAlbumVisible: false})
    }
    onCreateAlbumOpen=()=>{
        this.setState({createAlbumVisible: true})
    }
    onCreateAlbumSubmit=()=>{
        const albumName = this.props.form.getFieldValue("albumName");
        const albumDescription=this.props.form.getFieldValue("albumDescription")
        Axios.post("/api/album/create",{
            name:albumName,
            description: albumDescription
        }).then(value => {
            if (value.data.status === "ok") {
                message.success("相册创建成功!");
            } else {
                message.error("相册创建失败");
            }
        }).catch(err=>{
            message.error("相册创建失败");
        })
        this.setState({createAlbumVisible:false},()=>{
            location.reload();
        })
    }
    getAlbumList=()=>{
        Axios.get("/api/album/getAlbumList").then(value => {
            this.setState({albumList: value.data})
        })
    }
    getPersonalInfo = () => {
        //获取个头像啊什么的  那个存储空间
        
    };

    componentDidMount(): void {
        this.getAlbumList();
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
                            <FormItem label={"选择相册"}>
                                {getFieldDecorator("albumId")(
                                    <Select>
                                        {this.state.albumList?this.state.albumList.map((value, index) => {
                                            return <Select.Option key={index + ""}
                                                                  value={value.albumId}>{value.name}</Select.Option>;
                                        }):<CustomSpin/>}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem className={style["upload-modal-submit"]}>
                                <Button htmlType={"submit"} type={"primary"} onClick={this.onUploadSubmit}>提交</Button>
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
                <Modal destroyOnClose onCancel={this.onCreateAlbumCancel} onOk={this.onCreateAlbumSubmit} visible={this.state.createAlbumVisible}>
                    <Form>
                        <FormItem label={"相册名称"}>
                            {getFieldDecorator("albumName",{})(
                                <Input  type={'text'}/>
                            )}
                        </FormItem>
                        <FormItem label={"相册描述"}>
                            {getFieldDecorator("albumDescription",{})(
                                <Input  type={'text'}/>
                            )}
                        </FormItem>
                    </Form>
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
                            <Button onClick={this.onCreateAlbumOpen}>
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
                                    <Route path={'/albumlist/:id'} component={PhotosShow}/>
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
