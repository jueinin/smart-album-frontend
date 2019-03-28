import React, {Component} from 'react';
import {
    Button,
    Col,
    Dropdown,
    Form,
    Icon,
    Input,
    Menu,
    message,
    Modal,
    notification,
    Radio,
    Row,
    Select,
    Upload
} from "antd";
import Logo from '../../components/logo/logo';
import style from './albumList.module.css';
import SizeProgress from "../../components/sizeProgress/sizeProgress";
import {Route, RouteComponentProps, Switch} from "react-router";
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
import PhotoShowWrapper from "./phototsShow/photoShowWrapper";
import {albumListMobx, AlbumProperties} from "../../mobx/albumListMobx";
import {observer} from "mobx-react";
import Navbar from "../../components/navbar/navbar";
import {UserProperties} from "../../mobx/userMobx";
import NavbarAvatar from "../../components/navbar/navbarAvatar/navbarAvatar";
interface Props extends FormComponentProps,RouteComponentProps{
    albumList: AlbumProperties[];
    userInfo: UserProperties;
}
interface State {
    uploadModalVisible: boolean;
    uploadFileNames: string[];
    uploadFiles: UploadFile[];
    uploadMultipleVisible: boolean;
    createAlbumVisible: boolean;
    uploadMultipleFiles: File[];
}
@observer
class AlbumList extends Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state={uploadModalVisible: false, uploadFileNames: [], uploadFiles: undefined, uploadMultipleVisible: false,
            uploadMultipleFiles: undefined, createAlbumVisible: false}
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
        let photoName = this.props.form.getFieldValue("photoName");
        if (!photoName) {
            photoName = "";
        }
        let photoDescription = this.props.form.getFieldValue("photoDescription");
        if (!photoDescription) {
            photoDescription = "";
        }
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
                this.setState({uploadModalVisible: false})
                albumListMobx.getAlbumList();
            } else {
                notification.info({message: "上传失败"})
            }
        })
    }
    onMultipleSubmit=(file:any)=>{                //要改  体验不好
        console.log(file.file)
        let formData = new FormData();
        let multiAlbumId = this.props.form.getFieldValue("multiAlbumId");
        formData.set("files", file.file);
        formData.set("albumId", multiAlbumId);
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
                albumListMobx.getAlbumList();
            } else {
                message.error("相册创建失败");
            }
        }).catch(err=>{
            message.error("相册创建失败");
        })
        this.setState({createAlbumVisible:false},()=>{
            albumListMobx.getAlbumList();
        })
    }
    
    render() {
        const Search = Input.Search;
        const SubMenu = Menu.SubMenu;
        const MenuItem = Menu.Item;
        const FormItem = Form.Item;
        const Dragger = Upload.Dragger;
        const getFieldDecorator = this.props.form.getFieldDecorator;
        let nickname = "", avatar = "", storeSpace:number = 0, usedSpace = 0;
        if (this.props.userInfo) {
            nickname = this.props.userInfo.nickname;
            avatar = this.props.userInfo.avatar;
            storeSpace = parseFloat((this.props.userInfo.storeSpace / 1024 / 1024 / 1024).toFixed(2));
            usedSpace=parseFloat((this.props.userInfo.usedSpace / 1024 / 1024 / 1024).toFixed(2))
        }
        return (
            <div>
                <Modal destroyOnClose footer={false} visible={this.state.uploadModalVisible}
                       onOk={this.onUploadModalClose}
                       onCancel={this.onUploadModalClose}>
                    <div>
                        <Form>
                            <FormItem label={"图片名称"}>
                                {getFieldDecorator("photoName", {
                                    //
                                })(<Input placeholder={"请输入图片名称"}/>)}
                            </FormItem>
                            <FormItem label={"图片描述"}>
                                {getFieldDecorator("photoDescription", {})(<Input placeholder={'请输入图片描述'}/>)}
                            </FormItem>
                            <FormItem label={'是否公开'}>
                                {getFieldDecorator("isPublic", {initialValue:"isPrivate"})(<Radio.Group>
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
                                {getFieldDecorator("albumId",{
                                    initialValue: this.props.albumList.length === 0 ? null : this.props.albumList[0].albumId
                                })(
                                  <Select>
                                      {this.props.albumList?this.props.albumList.map((value, index) => {
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
                    <FormItem label={"选择相册"}>
                        {getFieldDecorator("multiAlbumId",{
                            initialValue: this.props.albumList.length === 0 ? null : this.props.albumList[0].albumId
                        })(
                          <Select>
                              {this.props.albumList?this.props.albumList.map((value, index) => {
                                  return <Select.Option key={index + ""}
                                                        value={value.albumId}>{value.name}</Select.Option>;
                              }):<CustomSpin/>}
                          </Select>
                        )}
                    </FormItem>
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
                    <Navbar>
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
                        <NavbarAvatar avatar={avatar} nickname={nickname}{...this.props}/>
                    </Navbar>
                    <Row className={style["bottom-content"]}>
                        <Col span={2} className={style.height100}>
                            <Menu defaultSelectedKeys={['allFiles']}>
                                <MenuItem key={'allPics'}>
                                    <Link to={'/albumList'}>全部图片</Link>
                                </MenuItem>
                                <MenuItem key={'albumlist'}>
                                    <Link to={'/albumList/albums'}>我的相册</Link>
                                </MenuItem>
                                <MenuItem key={'share'}>
                                    <Link to={'/albumList/share'}>我的分享</Link>
                                </MenuItem>
                                <MenuItem key={'rubbish'}>
                                    <Link to={'/albumList/recycleBin'}>回收站</Link>
                                </MenuItem>
                            </Menu>
                            <div className={style["left-nav-bottom"]}>
                                <SizeProgress progress={usedSpace/storeSpace} height={10}/>
                                {usedSpace}GB/{storeSpace}GB
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
                                    <Route exact path={'/albumList'} component={PhotoShowWrapper}/>
                                    <Route path={'/albumList/albums'} render={()=><AlbumList1 data={albumListMobx.albumList}/>} />
                                    <Route path={'/albumList/share'} component={Share}/>
                                    <Route path={'/albumList/recycleBin'} component={RecycleBin}/>
                                    <Route path={'/albumlist/:id'} component={PhotoShowWrapper}/>
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
