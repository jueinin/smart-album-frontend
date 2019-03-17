import React, {Component} from 'react';
import AlbumListItem from "./albumListItem/albumListItem";
import style from './albumList.module.css';
import {Button} from "antd";
class AlbumList extends Component {
    render() {
        const fakeList=[
            {
                cover: "http://jueinin.oss-cn-hongkong.aliyuncs.com/images/BJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAE.jpeg",
                title: "我的相册"
            },
            {
                cover: "http://jueinin.oss-cn-hongkong.aliyuncs.com/images/DwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5c.jpeg",
                title: "我的相册2"
            }
        ]
        return (
            <div>
                <div className={style.body}>
                    {fakeList.map((value, index) => {
                        return <AlbumListItem key={index} cover={value.cover} title={value.title}
                                              className={style["margin-left"]}/>;
                    })}
                </div>
                <div className={style["bottom-body-button"]}>
                    <Button type={"primary"}>编辑相册信息</Button>
                    <Button type={'primary'}>分享</Button>
                    <Button type={"primary"}>删除</Button>
                    <Button type={"primary"}>下载</Button>
                </div>
            </div>
        );
    }
}

export default AlbumList;
