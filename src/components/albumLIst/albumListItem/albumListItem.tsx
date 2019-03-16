import React, {ChangeEvent, Component} from 'react';
import {Link} from "react-router-dom";
import style from './albumListItem.module.css';
import {Dropdown, Form, Icon, Input, Menu, Modal, Radio, Tag} from "antd";
interface Props {
    cover:string;//url
    title: string;
    className?: string;
}
interface State {
    editVisible: boolean;
    tags: string[];
    inputVisible: boolean;
    inputValue: string;
}
class AlbumListItem extends Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state = {
            editVisible: false, tags: ["tag1", "tag2", "tag3"],
            inputValue: "", inputVisible: false
        };
    }
    onOpenEditModal=()=>{
        this.setState({editVisible: true})
    }
    onCloseEditModal=()=>{
        this.setState({editVisible: !this.state.editVisible})
    }
    onTagPlusClick=()=>{
        this.setState({inputVisible: true})
    }
    onConfirm=()=>{
        let newTag = this.state.inputValue;
        if (newTag && this.state.tags.indexOf(newTag) === -1) {
            this.setState({inputValue:"", tags:[...this.state.tags,newTag], inputVisible: false})
        }
    }
    onTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value})
    };
    render() {
        const MenuItem = Menu.Item;
        const FormItem = Form.Item;
        const RadioGroup = Radio.Group;
        const overlay = <Menu>
            <MenuItem onClick={this.onOpenEditModal}>编辑相册</MenuItem>
            <MenuItem>分享</MenuItem>
            <MenuItem>删除相册</MenuItem>
            <MenuItem>下载相册</MenuItem>
        </Menu>;
        return (
            <div className={this.props.className}>
                <div className={style.wrapper}>
                    <Link to={'/'}>
                        <img className={style.img} src={this.props.cover}/>
                        <h3 style={{marginTop: 15}}>{this.props.title}</h3>
                    </Link>
                    <Dropdown overlay={overlay} trigger={['click']}>
                        <Link to={'#'} className={style["more-icon"]}><Icon type="more"/></Link>
                    </Dropdown>
                </div>
                <Modal visible={this.state.editVisible} onCancel={this.onCloseEditModal}>
                    <Form>
                        <FormItem label={'创建时间'}>
                            2019年1月22日 19：45
                        </FormItem>
                        <FormItem label={'最后修改时间'}>
                            2019年1月22日 19：45
                        </FormItem>
                        <FormItem label={'相册名'}>
                            <Input defaultValue={"我的相册"}/>
                        </FormItem>
                        <FormItem label={'隐私设置'}>
                            <RadioGroup>
                                <Radio value={'public'}>公开</Radio>
                                <Radio value={'private'}>私密</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label={'相册标签'}>
                            {this.state.tags.map((value, index) => {
                                return <Tag closable key={index}>{value}</Tag>;
                            })}
                            {this.state.inputVisible ? <Input size={"small"} type={'text'} className={style["edit-input-tag"]}
                                onChange={this.onTagInputChange} value={this.state.inputValue} onBlur={this.onConfirm} onPressEnter={this.onConfirm}/> :
                                <Tag onClick={this.onTagPlusClick}>
                                    <Icon type={'plus'}/>
                                </Tag>
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default AlbumListItem;
