import React, {ChangeEvent, Component} from 'react';
import {Link} from "react-router-dom";
import style from './albumListItem.module.css';
import {Button, Dropdown, Form, Icon, Input, Menu, message, Modal, Popconfirm, Radio, Tag, Tooltip} from "antd";
import Axios from "axios";
import {FormComponentProps} from "antd/lib/form";
import PhotoList from "../../photoList/photoList";
import CustomSpin from "../../CustomSpin/CustomSpin";
import {observer} from "mobx-react";
import {albumListMobx} from "../../../mobx/albumListMobx";
import {PhotoProperties} from "../../../mobx/photoListMobx";
import {picThumbnailUrlPrefix} from "../../../index";
interface Props extends FormComponentProps{
    id: number;
    cover:number;//url
    title: string;
    createTime: string;
    description: string;
    className?: string;
    photoAmount: number;
}
interface State {
    editVisible: boolean;
    photoListData: PhotoProperties[];
}
@observer
class AlbumListItem extends Component<Props,State> {
    readonly form: React.RefObject<HTMLFormElement> = React.createRef();
    constructor(props:any) {
        super(props);
        this.state = {                                                                   //那个创建相册 底下不更新问题  到时候mobx解决下
            editVisible: false,
            photoListData: undefined
        };
    }
    onOpenEditModal=()=>{
        this.setState({editVisible: true},()=>{   //这个勉强能用了 可能还要改
            //请求photolist
            Axios.get('/api/album/getAlbumPhotos',{
                params:{albumId: this.props.id}
            }).then(value => {
                this.setState({photoListData: value.data})
            }).catch(err=>{
                message.error("获取相册列表失败")
            })
        })
    }
    onSubmitEditModal=()=>{
        let name = this.props.form.getFieldValue("albumName");
        if (!name) {
            name = "";
        }
        let description = this.props.form.getFieldValue("albumDescription");
        if (!description) {
            description = "";
        }
        let isPublic = this.props.form.getFieldValue("isPublic") === "isPublic" ? 1 : 0;
        let photoId = this.props.form.getFieldValue("cover");
        let albumId = this.props.id;
        Axios.post("/api/album/edit",{
            name,description,albumId, photoId, isPublic
        }).then(value => {
            if (value.data.status === 'ok') {
                message.success("修改成功!");
                this.setState({editVisible:false})
                albumListMobx.getAlbumList()
            }
        })
        
    }
    onCloseEditModal=()=>{
        this.setState({editVisible: !this.state.editVisible})
    }
    onDeleteClick=()=>{
        albumListMobx.deleteAlbum(this.props.id);
    }
    onSelectCoverClick=()=>{
        //this.setState({showPhotoList: true})
    }
    onDownloadClick=()=>{
        // let formData = new FormData();
        // formData.append("albumId", this.props.id+"");
        // Axios.post("/api/album/download",formData)
        this.form.current.submit();
    }
    render() {
        const MenuItem = Menu.Item;
        const FormItem = Form.Item;
        const RadioGroup = Radio.Group;
        const getFieldDecorator = this.props.form.getFieldDecorator;
        const overlay = <Menu>
            <MenuItem onClick={this.onOpenEditModal}>编辑相册</MenuItem>
            <MenuItem>分享</MenuItem>
            <MenuItem>
                <Popconfirm title={"确定删除吗"} onConfirm={this.onDeleteClick}>
                    删除相册
                </Popconfirm>
            </MenuItem>
            <MenuItem onClick={this.onDownloadClick}>下载相册</MenuItem>
        </Menu>;
        return (
          <div className={this.props.className}>
              <div className={style.wrapper}>
                  <Link to={'/albumlist/' + this.props.id}>
                      <img className={style.img} src={"/api/photo/show?photoId=" + this.props.cover}/>
                      <h3 style={{marginTop: 15}}>{this.props.title}</h3>
                  </Link>
                  <Dropdown overlay={overlay}>
                      <Link to={'#'} className={style["more-icon"]}><Icon type="more"/></Link>
                  </Dropdown>
                  <div className={style['photo-amount']}>
                      {this.props.photoAmount}张
                  </div>
              </div>
              <Modal destroyOnClose visible={this.state.editVisible} onCancel={this.onCloseEditModal}
                     onOk={this.onSubmitEditModal}>
                  <Form className={style['edit-modal-form']}>
                      <FormItem label={'相册名'}>
                          {getFieldDecorator("albumName", {
                              initialValue: albumListMobx.albumList.length !== 0 ? albumListMobx.albumList.filter((value, index) => {
                                  return value.albumId === this.props.id
                              })[0].name : ""
                          })(
                            <Input type={"text"}/>
                          )}
                      </FormItem>
                      <FormItem label={"相册描述"}>
                          {getFieldDecorator("albumDescription", {
                              initialValue: albumListMobx.albumList.length !== 0 ? albumListMobx.albumList.filter((value, index) => {
                                  return value.albumId === this.props.id
                              })[0].description : ""
                          })(
                            <Input type={"text"}/>
                          )}
                      </FormItem>
                      <FormItem label={'隐私设置'}>
                          {getFieldDecorator("isPublic", {initialValue: "isPublic"})(
                            <RadioGroup>
                                <Radio value={'isPublic'}>公开</Radio>
                                <Radio value={'isPrivate'}>私密</Radio>
                            </RadioGroup>
                          )}
                      </FormItem>
                      {this.state.photoListData ? <FormItem label={'选择封面'}>
                          {getFieldDecorator("cover", {
                              initialValue: albumListMobx.albumList.length !== 0 ? albumListMobx.albumList.filter((value, index) => {
                                  return value.albumId === this.props.id
                              })[0].cover : ""
                          })(
                            <RadioGroup className={style["photo-list"]}>
                                {this.state.photoListData.map(value => {
                                    return <Radio key={value.photoId} value={value.photoId}>
                                        <img style={{maxWidth: "100%"}} src={picThumbnailUrlPrefix + value.photoId}/>
                                    </Radio>
                                })}
                            </RadioGroup>
                          )}
                      </FormItem> : <CustomSpin/>}
                  </Form>
              </Modal>
              <form ref={this.form} action={'/api/album/download'} method={'post'} style={{display: "none"}} target={'_blank'} >
                  <input name={'albumId'} value={this.props.id}/>
              </form>
          </div>
        );
    }
}

export default Form.create()(AlbumListItem);
