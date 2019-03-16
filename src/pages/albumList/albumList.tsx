import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Menu, Modal, Radio, Row} from "antd";
import Logo from '../../components/logo/logo';
import style from './albumList.module.css';
import SizeProgress from "../../components/sizeProgress/sizeProgress";
import {Route, Switch} from "react-router";
import AlbumList1 from '../../components/albumLIst/albumList';
import Share from "./share/share";
import {Link} from "react-router-dom";
import RecycleBin from "./recycleBin/recycleBin";
interface Props {

}
interface State {
    uploadModalVisible: boolean;
}
class AlbumList extends Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state={uploadModalVisible: false}
    }
    onUploadClick=()=>{
        this.setState({uploadModalVisible: true})//图片名称 图片描述 是否公开默认不公开
    }
    onUploadModalClose=()=>{
        this.setState({uploadModalVisible:false})
    }
    render() {
        const Search = Input.Search;
        const SubMenu = Menu.SubMenu;
        const MenuItem = Menu.Item;
        const FormItem = Form.Item;
        if (this.state.uploadModalVisible) {
            console.log("fdd");
        }
        return (
            <div>
                <Modal footer={false} visible={this.state.uploadModalVisible} onOk={this.onUploadModalClose}
                       onCancel={this.onUploadModalClose}>
                    <div>
                        <Form>
                            <FormItem label={"图片名称"}>
                                <Input placeholder={"请输入图片名称"}/>
                            </FormItem>
                            <FormItem label={"图片描述"}>
                                <Input placeholder={'请输入图片描述'}/>
                            </FormItem>
                            <FormItem label={'是否公开'}>
                                <Radio.Group>
                                    <Radio value={'public'}>公开</Radio>
                                    <Radio value={'private'}>私密</Radio>
                                </Radio.Group>
                            </FormItem>
                        </Form>
                    </div>
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

export default AlbumList;
