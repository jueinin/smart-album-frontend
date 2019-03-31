import React, {Component, DragEventHandler, FormEvent} from 'react';
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
    notification, Progress,
    Radio,
    Row,
    Select, Tag,
    Upload
} from "antd";
import Logo from '../../components/logo/logo';
import style from './albumList.module.css';
import SizeProgress from "../../components/sizeProgress/sizeProgress";
import {Route, RouteComponentProps, Switch} from "react-router";
import AlbumList1 from '../../components/albumLIst/albumList';
import Share from "./share/share";
import {Link, NavLink} from "react-router-dom";
import RecycleBin from "./recycleBin/recycleBin";
import {UploadChangeParam} from "antd/lib/upload";
import {RcFile, UploadFile} from "antd/lib/upload/interface";
import {FormComponentProps} from "antd/lib/form";
import Axios from "axios";
import PhotosShow from "./phototsShow/photosShow";
import CustomSpin from "../../components/CustomSpin/CustomSpin";
import PhotoShowWrapper, {getPhotoData} from "./phototsShow/photoShowWrapper";
import {albumListMobx, AlbumProperties} from "../../mobx/albumListMobx";
import {observer} from "mobx-react";
import Navbar from "../../components/navbar/navbar";
import {userInfoMobx, UserProperties} from "../../mobx/userMobx";
import NavbarAvatar from "../../components/navbar/navbarAvatar/navbarAvatar";
import {selectDownloadMobx} from "../../mobx/selectDownloadMobx";
import SearchComponent from './search/search';
import CustomNavLink from "../../components/navbar/customNavLink/customNavLink";
import {photoListMobx, PhotoProperties} from "../../mobx/photoListMobx";
import {elseError} from "../signup/signup";
import Test from "../Test/test";
import {PhotoPageType} from "../../mobx/PhotoPageTypeMobx";

interface Props extends FormComponentProps,RouteComponentProps{
    albumList: AlbumProperties[];
    userInfo: UserProperties;
  type: PhotoPageType;
}
interface State {
    uploadModalVisible: boolean;
    uploadUploading: boolean;
    uploadFileNames: string[];
    uploadFiles: UploadFile[];
    uploadMultipleVisible: boolean;
    createAlbumVisible: boolean;
    uploadMultipleFiles: File[];
    uploadProgress: number;
    tags: string[];
    tagInputShow: boolean;
}
@observer
class AlbumList extends Component<Props,State> {
    tagInput: React.RefObject<Input> = React.createRef();
  fileInput: React.RefObject<HTMLInputElement> = React.createRef();
  dragDiv: React.RefObject<HTMLDivElement> = React.createRef();
    constructor(props:any) {
        super(props);
        this.state={uploadModalVisible: false, uploadFileNames: [], uploadFiles: undefined, uploadMultipleVisible: false,
            uploadMultipleFiles: undefined, createAlbumVisible: false,uploadUploading:false,uploadProgress:0, tags: [],
            tagInputShow: false}
    }
    onUploadClick=()=>{
        this.setState({uploadModalVisible: true})//图片名称 图片描述 是否公开默认不公开
    }
    onMultipleUploadClick=()=>{
        this.setState({uploadMultipleVisible: true})
    }
    onUploadModalClose=()=>{
        this.setState({uploadModalVisible:false, uploadFileNames: [],tags:[],tagInputShow:false})
    }
    onUploadMultipleClose=()=>{
        this.setState({uploadMultipleVisible: false,uploadMultipleFiles:[],tags:[], tagInputShow: false            })
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
        this.setState({uploadUploading: true})
        let photoName = this.props.form.getFieldValue("photoName");
        if (!photoName) {
            photoName = "";
        }
        let photoDescription = this.props.form.getFieldValue("photoDescription");
        if (!photoDescription) {
            photoDescription = "";
        }
        let tags = this.state.tags;
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
        if (tags.length !== 0) {
            tags.forEach(value => {
                formData.append('tags', value);
            });
        } else {
            formData.append("tags", null);
        }
        
        Axios.post("/api/photo/upload", formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then(value => {
            if (value.data.status === "ok") {
                notification.info({
                    message: "上传成功"
                });
                this.setState({uploadModalVisible: false, uploadUploading: false})
                //getPhotoData(this.props)
              albumListMobx.getAlbumList();
            }
        }).catch(err=>{
            let msg = err.response.data.message;
            if (msg === 'empty file error') {
                message.error("空文件");
            }else if (msg === 'file is not an image') {
                message.error("文件不是图片,请确认");
            }else if (msg === 'available space already full') {
                message.error("空间已满,请检查你的容量");
            }else if (msg === 'suffix error') {
                message.error("文件后缀名错误");
            } else if (msg === 'upload failed') {
                message.error('上传失败');
            } else {
                elseError();
            }
        });
    }
    onMultiUploadProgress=(e:ProgressEvent)=>{
        let result = ((e.loaded / e.total) * 100).toFixed(2);
        this.setState({uploadProgress: parseFloat(result)})
    }
    onMultipleSubmit=(e:FormEvent)=>{                //要改  体验不好
        e.preventDefault();
        if (!this.state.uploadMultipleFiles) {
            return;
        }
        if (this.state.uploadMultipleFiles.length === 0) {
            return;
        }
      if (!this.state.uploadMultipleFiles.every(value => {
        return value.type.startsWith("image/");
      })) {
        message.error("请确认上传文件类型全部为图片")
        return;
      }
        this.setState({uploadUploading:true});
        let formData = new FormData();
        let multiAlbumId = this.props.form.getFieldValue("multiAlbumId");
        this.state.uploadMultipleFiles.forEach((value, index) => {
            formData.append("files", value);
        });
        formData.set("albumId", multiAlbumId);
        Axios.post("/api/photo/uploads", formData,{
            onUploadProgress:this.onMultiUploadProgress
        }).then(value => {
            if (value.data.successCount === this.state.uploadMultipleFiles.length) {//
                notification.info({message: "上传失败"});
                this.setState({uploadUploading: false})
            } else {
              notification.success({message: "上传成功"})
              this.setState({uploadUploading: false, uploadMultipleVisible: false})
              albumListMobx.getAlbumList();
              getPhotoData(this.props)
              userInfoMobx.getUserInfo();
            }
        }).catch(err=>{
            notification.info({message: "上传失败"});
            this.setState({uploadUploading: false})
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
    onSearch=(value:any,e:any)=>{
        this.props.history.push("/albumlist/search?keyword=" + value);
    }
    onTagClose = (value: string,e) => {
        e.preventDefault();
        let filterTag = this.state.tags.filter(value1 => {
            return value1 !== value;
        });
        this.setState({tags: filterTag})
    };
    onPlusTagClick=()=>{
        this.setState({tagInputShow: true})
    }
    onTagInputEnter=(e)=>{
        let value = this.tagInput.current.input.value;
        if (!value) {
            return;
        }
        this.setState({tags: [...this.state.tags, value], tagInputShow: false})
    }
    onDragDivClick=()=>{
      let input = this.fileInput.current;
      input.click();
      input.addEventListener("change",()=>{
        if (input.files.length === 0) {
          return;
        }
        let files = [];
        for (let i = 0; i < input.files.length; i++) {
          files.push(input.files.item(i));
        }
        this.setState({uploadMultipleFiles:files})
      })
    }
    // @ts-ignore
  onDragDrop=(e:DragEvent<HTMLDivElement>)=>{
      e.preventDefault();
    let files = e.dataTransfer.files;
    let fileList = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        fileList.push(files.item(i));
      }
    } else {
      let items = e.dataTransfer.items;
      for (let j = 0; j < items.length; j++) {
        fileList.push(items.item(j).getAsFile());
      }
    }
    this.setState({uploadMultipleFiles: fileList})
    }
    onPreventDefault=(e:any)=>{
      e.preventDefault();
      e.stopPropagation();
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
        let nickname = "", avatar = "", storeSpace: number | string = 0, usedSpace: number | string = 0, signature = "";
        let progress = 0;
        if (this.props.userInfo) {
            nickname = this.props.userInfo.nickname;
            avatar = this.props.userInfo.avatar;
            signature = this.props.userInfo.signature;
            storeSpace = parseFloat((this.props.userInfo.storeSpace / 1024 / 1024 / 1024).toFixed(2));
            usedSpace=parseFloat((this.props.userInfo.usedSpace / 1024 / 1024 / 1024).toFixed(2))
            if (usedSpace === 0) {
                usedSpace = (usedSpace * 1024).toFixed(2) + "MB";
            } else {
                usedSpace = usedSpace + "GB";
            }
            let temp = parseInt(usedSpace.substring(0, usedSpace.length - 2));
            progress = temp / storeSpace;
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
                {getFieldDecorator("isPublic", {initialValue: "isPrivate"})(<Radio.Group>
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
              <FormItem label={'添加标签'}>
                {this.state.tags.map((value, index) => {
                  return <Tag key={value} closable onClose={(e) => this.onTagClose(value, e)}>{value}</Tag>
                })}{this.state.tagInputShow ? <React.Fragment><Input className={style['tag-input']} autoFocus
                                                                     ref={this.tagInput}/>
                  <Button onClick={this.onTagInputEnter}>确定</Button>
                </React.Fragment> :
                <Tag onClick={this.onPlusTagClick}><Icon type={'plus'}/> </Tag>}
              </FormItem>
              <FormItem label={"选择相册"}>
                {getFieldDecorator("albumId", {
                  initialValue: this.props.albumList.length === 0 ? null : this.props.albumList[0].albumId
                })(
                  <Select>
                    {this.props.albumList ? this.props.albumList.map((value, index) => {
                      return <Select.Option key={index + ""}
                                            value={value.albumId}>{value.name}</Select.Option>;
                    }) : <CustomSpin/>}
                  </Select>
                )}
              </FormItem>
              <FormItem className={style["upload-modal-submit"]}>
                <Button htmlType={"submit"} type={"primary"} disabled={this.state.uploadUploading}
                        loading={this.state.uploadUploading} onClick={this.onUploadSubmit}>提交</Button>
              </FormItem>
            </Form>
          </div>
        </Modal>
        <Modal destroyOnClose visible={this.state.uploadMultipleVisible} footer={false}
               onCancel={this.onUploadMultipleClose}>
          <Form onSubmit={(e) => this.onMultipleSubmit(e)}>
            <FormItem label={"选择相册"}>
              {getFieldDecorator("multiAlbumId", {
                initialValue: this.props.albumList.length === 0 ? null : this.props.albumList[0].albumId
              })(
                <Select style={{width: "100%"}}>
                  {this.props.albumList ? this.props.albumList.map((value, index) => {
                    return <Select.Option key={index + ""}
                                          value={value.albumId}>{value.name}</Select.Option>;
                  }) : <CustomSpin/>}
                </Select>
              )}
            </FormItem>
            <div className={style['drag-div']} ref={this.dragDiv} onClick={this.onDragDivClick} onDrop={this.onDragDrop}
                 onDragEnter={this.onPreventDefault}
                 onDragOver={this.onPreventDefault} onDragLeave={this.onPreventDefault}>
              点击或者拖动上传
            </div>
            <input type={'file'} ref={this.fileInput} multiple accept={'image/*'} style={{display: "none"}}/>
            {this.state.uploadMultipleFiles ? `你选择了${this.state.uploadMultipleFiles.length}张图` : ""}
            <div style={{textAlign: "center"}}>
              <Progress type={"circle"} percent={this.state.uploadProgress}
                        style={{display: this.state.uploadUploading ? "inline-block" : "none"}}/>
            </div>
            <FormItem style={{textAlign: "right"}}>
              <Button htmlType={'submit'} disabled={this.state.uploadUploading}
                      loading={this.state.uploadUploading}>批量上传</Button>
            </FormItem>
          </Form>
        </Modal>
        <Modal destroyOnClose onCancel={this.onCreateAlbumCancel} onOk={this.onCreateAlbumSubmit}
               visible={this.state.createAlbumVisible}>
          <Form>
            <FormItem label={"相册名称"}>
              {getFieldDecorator("albumName", {})(
                <Input type={'text'}/>
              )}
            </FormItem>
            <FormItem label={"相册描述"}>
              {getFieldDecorator("albumDescription", {})(
                <Input type={'text'}/>
              )}
            </FormItem>
          </Form>
        </Modal>
        <div className={style.body}>
          <Navbar>
            <Col span={6} offset={4} className={style["search-wrapper"]}>
              <div style={{width: "100%"}}>
                <Search enterButton size={"large"} className={style["search-input"]}
                        placeholder={"请输入关键字查询"} onSearch={this.onSearch}/>
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
            <NavbarAvatar signature={signature} avatar={avatar} nickname={nickname}{...this.props}/>
          </Navbar>
          <Row className={style["bottom-content"]}>
            <Col span={2} className={style.height100}>
              <Menu defaultSelectedKeys={['allFiles']} className={style['menu']}>
                <MenuItem key={'allPics'}>
                  <CustomNavLink exact to={'/albumList'}>全部图片</CustomNavLink>
                </MenuItem>
                <MenuItem key={'albumlist'}>
                  <CustomNavLink exact to={'/albumList/albums'}>我的相册</CustomNavLink>
                </MenuItem>
                <MenuItem key={'share'}>
                  <CustomNavLink to={'/albumList/share'}>我的分享</CustomNavLink>
                </MenuItem>
                <MenuItem key={'rubbish'}>
                  <CustomNavLink to={'/albumList/recycleBin'}>回收站</CustomNavLink>
                </MenuItem>
              </Menu>
              <div className={style["left-nav-bottom"]}>
                <SizeProgress progress={progress} height={10}/>
                {usedSpace}/{storeSpace}GB
              </div>
            </Col>
            <Col span={20} offset={1} className={`${style.height100} ${style['right-bottom']}`}>
              <Switch>
                <Route path={'/albumList/search'}
                       render={(props) => <PhotoShowWrapper type={"searchPhotos"} {...props}/>}/>  {/*特么的render有个props参数的   我说老出问题*/}
                <Route exact path={'/albumList'} render={(props) => <PhotoShowWrapper type={"allPhotos"} {...props}/>}/>
                <Route path={'/albumList/albums'}
                       render={() => <AlbumList1 data={albumListMobx.albumList}/>}/>
                <Route path={'/albumList/share'} component={Share}/>
                <Route path={'/albumList/recycleBin'} component={RecycleBin}/>
                <Route path={'/albumList/dd/:id'} render={(props)=><Test {...props}/>}/>
                <Route path={'/albumlist/:id'} render={(props) => <PhotoShowWrapper type={"albumPhotos"} {...props}/>}/>
              </Switch>
            </Col>
          </Row>
        </div>
      </div>
    );
    }
}

export default Form.create()(AlbumList);
