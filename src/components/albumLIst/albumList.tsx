import React, {Component} from 'react';
import AlbumListItem from "./albumListItem/albumListItem";
import style from './albumList.module.css';
import {Button, message} from "antd";
import Axios from "axios";
import CustomSpin from "../CustomSpin/CustomSpin";
interface dataItem{
    albumId: string;
    name: string;
    cover: string;
    createTime: string;
    description: string;
    photoAmount: string;
}
interface State {
    data: dataItem[];
}
class AlbumList extends Component<{},State> {
    constructor(props:any) {
        super(props);
        this.state={data: undefined}
    }

    getAlbumList=()=>{
        Axios.get("/api/album/getAlbumList").then(value => {
            this.setState({data: value.data})
        }).catch(err=>{
            message.error("获取内容失败,请重试")
        })
    }
    componentDidMount(): void {
        this.getAlbumList();
    }

    onDeleteAlbumItem = (id: any) => {
        this.setState({data:this.state.data.filter((value, index) => {
                return value.albumId !== id;
            })})
    };

    render() {
        return (
            <div>
                <div className={style.body}>
                    {this.state.data?<React.Fragment>
                            {this.state.data.map((value, index) => {
                                return <AlbumListItem key={index} id={value.albumId} cover={value.cover}
                                                      onDeleteCallback={this.onDeleteAlbumItem} title={value.name}
                                                      createTime={value.createTime} description={value.description}
                                                      photoAmount={value.photoAmount}/>;
                            })}
                    </React.Fragment>:<CustomSpin/>}
                </div>
                <div className={style["bottom-body-button"]}>

                </div>
            </div>
        );
    }
}

export default AlbumList;
