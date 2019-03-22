import React, {ChangeEvent, Component} from 'react';
import {Link} from "react-router-dom";
import style from './albumListItem.module.css';
import {Button, Dropdown, Form, Icon, Input, Menu, message, Modal, Popconfirm, Radio, Tag, Tooltip} from "antd";
import Axios from "axios";
import {FormComponentProps} from "antd/lib/form";
import PhotoList from "../../photoList/photoList";
import CustomSpin from "../../CustomSpin/CustomSpin";
interface Props extends FormComponentProps{
    id: string;
    cover:string;//url
    title: string;
    createTime: string;
    description: string;
    className?: string;
    photoAmount: string;
    onDeleteCallback:(id:any)=>void
}
interface State {
    editVisible: boolean;
    photoListData: { photoId: string,path: string }[];
}
class AlbumListItem extends Component<Props,State> {
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
            Axios.get('/api/album/photos',{
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
        let description = this.props.form.getFieldValue("albumDescription");
        let isPublic = this.props.form.getFieldValue("isPublic");
    }
    onCloseEditModal=()=>{
        this.setState({editVisible: !this.state.editVisible})
    }
    onDeleteClick=()=>{
        Axios.post("/api/album/delete",{
            albumId: this.props.id
        }).then(value => {
            if (value.data.status === "ok") {
                message.success("删除成功");
                this.props.onDeleteCallback(this.props.id);
            }
        })
    }
    onSelectCoverClick=()=>{
        //this.setState({showPhotoList: true})
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
            <MenuItem>下载相册</MenuItem>
        </Menu>;
        return (
            <div className={this.props.className}>
                <div className={style.wrapper}>
                    <Link to={'/albumlist/'+this.props.id}>
                        <img className={style.img} src={"/api/photo/show?photoId="+this.props.cover}/>
                        <h3 style={{marginTop: 15}}>{this.props.title}</h3>
                    </Link>
                    <Dropdown overlay={overlay}>
                        <Link to={'#'} className={style["more-icon"]}><Icon type="more"/></Link>
                    </Dropdown>
                </div>
                <Modal destroyOnClose visible={this.state.editVisible} onCancel={this.onCloseEditModal} onOk={this.onSubmitEditModal}>
                    <Form>
                        <FormItem label={'相册名'}>
                            {getFieldDecorator("albumName")(
                                <Input type={"text"}/>
                            )}
                        </FormItem>
                        <FormItem label={"相册描述"}>
                            {getFieldDecorator("albumDescription")(
                                <Input type={"text"}/>
                            )}
                        </FormItem>
                        <FormItem label={'隐私设置'}>
                            {getFieldDecorator("isPublic",{initialValue:"isPublic"})(
                                <RadioGroup>
                                    <Radio value={'isPublic'}>公开</Radio>
                                    <Radio value={'isPrivate'}>私密</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        {this.state.photoListData?<FormItem label={'选择封面'}>
                            {getFieldDecorator("cover")(
                                <RadioGroup className={style["photo-list"]}>
                                    {this.state.photoListData.map(value => {
                                        return <Radio key={value.photoId} value={value.photoId}>
                                            <img style={{width:"100%"}} src={value.path}/>
                                        </Radio>
                                    })}
                                </RadioGroup>
                            )}
                        </FormItem>:<CustomSpin/>}
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(AlbumListItem);
