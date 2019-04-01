import React, {Component} from 'react';
import {RouteComponentProps} from "react-router";
import Axios from "axios";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
import {
    Button,
    Checkbox,
    Col,
    Dropdown,
    Form,
    Icon,
    Input,
    Menu,
    message,
    Modal,
    Popconfirm,
    Radio,
    Row,
    Tag
} from "antd";
import {Link} from "react-router-dom";
import style from './photosShow.module.css';
import {FormComponentProps} from "antd/lib/form";
import {photoListMobx, PhotoPageProperties, PhotoProperties} from "../../../mobx/photoListMobx";
import { picThumbnailUrlPrefix, picUrlPrefix} from "../../../index";
import {observer} from "mobx-react";
// @ts-ignore
import {PhotoSwipe} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import {getPhotoData} from "./photoShowWrapper";
import {PhotoPageType} from "../../../mobx/PhotoPageTypeMobx";
import {albumListMobx} from "../../../mobx/albumListMobx";
interface RouteParams{
    id?: string;
}
interface Props extends RouteComponentProps<RouteParams>,FormComponentProps{
    data: PhotoPageProperties;
    searchShowPage?: boolean;
    type:PhotoPageType
}
interface State {
    editVisible: boolean;
    selectedPhotoId: number;//编辑选中的photo
    selectedPhotosId: number[];//多选删除啥的
    editing: boolean;//正在多选状态
    checkALl: boolean;
    photoSwipeOpen: boolean;
    tags: string[];
    tagInputShow: boolean;
}
@observer
class PhotosShow extends Component<Props, State> {
    tagInput: React.RefObject<Input> = React.createRef();
    scrollPending: boolean = false;//是否处于底部ajax状态
    currentPage: number = 1;//瀑布流
    constructor(props:any) {
        super(props);
        this.state={editVisible: false, selectedPhotoId: undefined, photoSwipeOpen: false,tags:[], tagInputShow: false,
            selectedPhotosId: [], editing: false, checkALl: false}
    }
    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    
    }
    componentDidMount(): void {
    
    }
    
    onEditSubmit = () => {
        let photoName = this.props.form.getFieldValue("photoName");
        if (!photoName) {
            photoName = "";
        }
        
        let photoDescription = this.props.form.getFieldValue("photoDescription");
        if (!photoDescription) {
            photoDescription = "";
        }
        const isPublic = this.props.form.getFieldValue("isPublic") == "isPublic" ? 1 : 0;
        const photoId = this.state.selectedPhotoId;
        const albumId = this.props.match.params.id;
        const tags = this.state.tags;
        Axios.post("/api/photo/edit", {
            photoId,
            albumId,
            name: photoName,
            description: photoDescription,
            isPublic,
            tags
        }).then(value => {
            if (value.data.status === "ok") {
                message.success("编辑成功!");
                this.setState({editVisible: false})
                getPhotoData(this.props)
            } else {
                message.error("编辑失败,请检查");
            }
        }).catch(err => {
            message.error("网络异常")
        })
    };
    onEditClick = (index: number) => {
        this.setState({editVisible: true, selectedPhotoId: index},()=>{
            this.setState({
                tags:
                this.props.data.photos.filter(value => {
                    return value.photoId === this.state.selectedPhotoId;
                })[0].tags})
        })
    };
    onEditCancel = () => {
        this.setState({editVisible: false, tags: []})
    };
    onImgClick = (index: number,e:any) => {
        e.preventDefault();
        this.setState({selectedPhotoId: index,photoSwipeOpen:true})
    };
    onCancelPhotoswipe = () => {
        this.setState({photoSwipeOpen: false})
    };
    onDeletePhoto = (photoId: number) => {
        Axios.post("/api/photo/moveToRecycleBin", [{
            photoId
        }]).then(value => {
            if (value.data.status === "ok") {
                message.success("删除成功");
                //添加更新
                getPhotoData(this.props)
                albumListMobx.getAlbumList();
            } else {
                message.error("删除失败");
            }
        }).catch(err => {
            message.error("网络异常请重试");
        });
    };
    onDownloadPhoto = (photoId:number) => {
        Axios.post('/api/photo/downloads',
          [{
              photoId: photoId
          }],
          {
              responseType:"blob"
          }
        ).then(value => {
            let blob = new Blob([value.data]);
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            let photoIndex = this.props.data.photos.findIndex(value1 => {
                return photoId === value1.photoId;
            });
            let photo = this.props.data[photoIndex];
            link.setAttribute("download", `${photo.name || "图片"}.jpeg`);
            link.click();
        });
    };
    onTagClose = (value: string) => {
        let filterTag = this.state.tags.filter(value1 => {
            return value !== value1;
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
    onScroll=(e:any)=>{
        let ref: HTMLDivElement = e.currentTarget;
        console.log(ref.clientHeight);
        console.log(ref.scrollHeight);
        console.log(ref.scrollTop);
        if (ref.scrollHeight - ref.scrollTop < 2.5 * ref.clientHeight &&!this.scrollPending) {
            if (this.currentPage > photoListMobx.photoPageList.pages && photoListMobx.photoPageList.pages > 1) {
                message.info('已经到底了哦');
                this.scrollPending = true;
                return;
            }
            this.currentPage++;
            console.log(`现在是第${this.currentPage}页`)
            //z这里应该只触发一次
            this.scrollPending = true;
            //start ajax  end set false
            setTimeout(() => {
                this.scrollPending = false;
            }, 1000);
            getPhotoData(this.props, this.currentPage);
        }
    }
    onMultipleEditClick=()=>{
        this.setState({editing: true})
    }
    onCheckboxChange=(e,photoId:number)=>{
        let checked: boolean = e.target.checked;
        if (checked) {
            this.setState({selectedPhotosId: [...this.state.selectedPhotosId, photoId]});
        } else {
            this.setState({selectedPhotosId: this.state.selectedPhotosId.filter(value => value !== photoId)})
        }
    }
    onMultipleDeleteClick = () => {
        if (this.state.selectedPhotosId.length === 0) {
            return;
        }
        let arr = [];
        this.state.selectedPhotosId.forEach(value => {
            arr.push({
                photoId: value
            })
        })
        Axios.post("/api/photo/moveToRecycleBin", arr).then(value => {
            if (value.data.status === "ok") {
                message.success("删除成功");
                //添加更新
                getPhotoData(this.props)
                albumListMobx.getAlbumList();
            } else {
                message.error("删除失败");
            }
        }).catch(err => {
            message.error("网络异常请重试");
        });
    };
    onSelectAll=()=>{
        this.setState({checkALl: true,selectedPhotosId:this.props.data.photos.map(value => value.photoId)})
    }
    render() {
        const that = this;
        const MenuItem = Menu.Item;
        const getFieldDecorator = this.props.form.getFieldDecorator;
        let Item = function (index: number, photoId: number) {
            let overlay = <Menu>
                <MenuItem onClick={() => that.onEditClick(photoId)}>编辑</MenuItem>
                <MenuItem>
                    <Popconfirm title={"确定删除吗"} onConfirm={() => that.onDeletePhoto(photoId)}>
                        删除
                    </Popconfirm>
                </MenuItem>
                <MenuItem onClick={()=>that.onDownloadPhoto(photoId)}>下载</MenuItem>
            </Menu>;
    
            return <Col key={photoId + ""} span={4} className={style["img-col"]}>
                <span className={style['img-wrapper']}>
                    <img className={`${style['img']}`}
                         onClickCapture={(e) => that.onImgClick(photoId, e)}
                         src={picThumbnailUrlPrefix + photoId}/>
                    {that.state.editing ? <Checkbox defaultChecked={that.state.checkALl}  onChange={(e) => that.onCheckboxChange(e, photoId)}
                                                    className={style['checkbox']}/> : null}
                </span>
                {that.props.searchShowPage ? null : <Dropdown overlay={overlay}>
                    <Link to={'#'} className={style["more-icon"]}><Icon type="more"/></Link>
                </Dropdown>}
            </Col>;
        };
        let name = "";
        let description = "";
        let isPublic = "isPublic";
        if (this.state.selectedPhotoId) {
            let item = this.props.data.photos.filter(value => {
                return value.photoId === this.state.selectedPhotoId;
            })[0];
            name = item.name;
            description =item.description;
            console.log(item.isPublic);
            isPublic = item.isPublic === 1 ? "isPublic" : "isPrivate";
        }
        let options={
            index: this.props.data.photos.findIndex((value, index) => {
                return value.photoId===this.state.selectedPhotoId
            })
        };
        let items=this.props.data.photos.map((value, index) => {
            return {
                src: picUrlPrefix + value.photoId,
                w: value.width,
                h: value.height,
                title: value.name
            }
        });
        let FormItem = Form.Item;
        return (
          <React.Fragment>
              <Modal destroyOnClose onOk={this.onEditSubmit} visible={this.state.editVisible}
                     onCancel={this.onEditCancel}>
                  <Form>
                      <Form.Item label={"编辑图片名称"}>
                          {getFieldDecorator("photoName", {
                              initialValue: name
                          })(
                            <Input type={'text'}/>
                          )}
                      </Form.Item>
                      <Form.Item label={"编辑图片描述"}>
                          {getFieldDecorator("photoDescription", {
                              initialValue: description
                          })(
                            <Input type={'text'}/>
                          )}
                      </Form.Item>
                      <Form.Item label={"是否公开"}>
                          {getFieldDecorator("isPublic", {
                              initialValue: isPublic
                          })(
                            <Radio.Group>
                                <Radio value={"isPublic"}>公开</Radio>
                                <Radio value={"isPrivate"}>私密</Radio>
                            </Radio.Group>
                          )}
                      </Form.Item>
                      <FormItem label={'修改标签'}>
                          {this.state.tags.map((value, index) => {
                              return <Tag key={index + ""} closable
                                          onClose={() => this.onTagClose(value)}>{value}</Tag>;
                          })}{this.state.tagInputShow ? <React.Fragment><Input className={style['tag-input']} autoFocus
                                                                               ref={this.tagInput}/>
                            <Button onClick={this.onTagInputEnter}>确定</Button>
                        </React.Fragment> :
                        <Tag onClick={this.onPlusTagClick}><Icon type={'plus'}/> </Tag>}
                      </FormItem>
                  </Form>
              </Modal>
              <Row>
                  <Col offset={18} span={4}>
                      <Button htmlType={'button'} onClick={this.onMultipleEditClick}>编辑</Button>
                      <Button htmlType={'button'} onClick={this.onMultipleDeleteClick}>多选删除</Button>
                      <Button htmlType={'button'} onClick={this.onSelectAll}>全选</Button>
                  </Col>
              </Row>
              <Row gutter={32} className={style['root-row']} onScroll={this.onScroll}>
                  {this.props.data.photos.length !== 0 ? <React.Fragment>
                      {this.props.data.photos.map((value, index) => {
                          return Item(index, value.photoId)
                      })}
                  </React.Fragment> : <Col span={24} className={style['no-photo']}>
                      这里没有图片呢
                  </Col>}
              </Row>
              <PhotoSwipe items={items} options={options} isOpen={this.state.photoSwipeOpen}
                          onClose={this.onCancelPhotoswipe}/>
          </React.Fragment>
        );
    }
}

export default Form.create()(PhotosShow);
