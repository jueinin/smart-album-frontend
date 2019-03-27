import React, {Component} from 'react';
import {RouteComponentProps} from "react-router";
import Axios from "axios";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
import {Col, Dropdown, Form, Icon, Input, Menu, message, Modal, Popconfirm, Radio, Row} from "antd";
import {Link} from "react-router-dom";
import style from './photosShow.module.css';
import {FormComponentProps} from "antd/lib/form";
import {photoListMobx, PhotoProperties} from "../../../mobx/photoListMobx";
import {picThumbnailUrlPrefix, picUrlPrefix} from "../../../index";
interface RouteParams{
    id: string;
}
interface Props extends RouteComponentProps<RouteParams>,FormComponentProps{
    data: PhotoProperties[];
}
interface State {
    editVisible: boolean;
    selectedPhotoId: number;
}

class PhotosShow extends Component<Props, State> {
    constructor(props:any) {
        super(props);
        this.state={editVisible: false, selectedPhotoId: undefined}
    }
    onEditSubmit=()=>{
        const photoName = this.props.form.getFieldValue("photoName");
        const photoDescription = this.props.form.getFieldValue("photoDescription");
        const isPublic = this.props.form.getFieldValue("isPublic") == "isPublic" ? 1 : 0;
        const photoId = this.state.selectedPhotoId;
        const albumId = this.props.match.params.id;
        Axios.post("/api/photo/edit",{
            photoId,
            albumId,
            name: photoName,
            description: photoDescription,
            isPublic
        }).then(value => {
            if (value.data.status === "ok") {
                message.success("编辑成功!");
                this.setState({editVisible:false})
            } else {
                message.error("编辑失败,请检查");
            }
        }).catch(err=>{
            message.error("网络异常")
        })
    }
    onEditClick = (index: number) => {
        this.setState({editVisible: true, selectedPhotoId: index})
    };
    onEditCancel=()=>{
        this.setState({editVisible: false})
    }
    onDeletePhoto=(photoId:number)=>{
        Axios.post("/api/photo/moveToRecycleBin", [{
            photoId
        }]).then(value => {
            if (value.data.status === "ok") {
                message.success("删除成功");
                //添加更新
                photoListMobx.updatePhotos(this.props.location.pathname);
            } else {
                message.error("删除失败");
            }
        }).catch(err => {
            message.error("网络异常请重试");
        });
    }
    render() {
        const that = this;
        const MenuItem = Menu.Item;
        const getFieldDecorator = this.props.form.getFieldDecorator;
        let Item = function (index: number, photoId: number) {
            const overlay = <Menu>
                <MenuItem onClick={() => that.onEditClick(photoId)}>编辑</MenuItem>
                <MenuItem>
                    <Popconfirm title={"确定删除吗"} onConfirm={() => that.onDeletePhoto(photoId)}>
                        删除
                    </Popconfirm>
                </MenuItem>
                <MenuItem>下载相册</MenuItem>
            </Menu>;
            return <Col key={photoId + ""} span={8} className={style["img-col"]}>
                <a href={picUrlPrefix + photoId} target={"_blank"}>
                    <img style={{width: "100%"}} src={picThumbnailUrlPrefix + photoId}/>
                </a>
                <Dropdown overlay={overlay}>
                    <Link to={'#'} className={style["more-icon"]}><Icon type="more"/></Link>
                </Dropdown>
            </Col>;
        };
        return (
            <div>
                <Modal destroyOnClose onOk={this.onEditSubmit} visible={this.state.editVisible}
                       onCancel={this.onEditCancel}>
                    <Form>
                        <Form.Item label={"编辑图片名称"}>
                            {getFieldDecorator("photoName")(
                                <Input type={'text'}/>
                            )}
                        </Form.Item>
                        <Form.Item label={"编辑图片描述"}>
                            {getFieldDecorator("photoDescription")(
                                <Input type={'text'}/>
                            )}
                        </Form.Item>
                        <Form.Item label={"是否公开"}>
                            {getFieldDecorator("isPublic",{
                                initialValue: "isPrivate"
                            })(
                                <Radio.Group>
                                    <Radio value={"isPublic"}>公开</Radio>
                                    <Radio value={"isPrivate"}>私密</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
                <Row gutter={32}>
                    {this.props.data ? <React.Fragment>
                        {this.props.data.map((value, index) => {
                            return Item(index, value.photoId)
                        })}
                    </React.Fragment> : <CustomSpin/>}
                </Row>
            </div>
        );
    }
}

export default Form.create()(PhotosShow);
