import React, {Component} from 'react';
import AlbumListItem from "./albumListItem/albumListItem";
import style from './albumList.module.css';
import {Button, message} from "antd";
import Axios from "axios";
import CustomSpin from "../CustomSpin/CustomSpin";
import {AlbumProperties} from "../../mobx/albumListMobx";
import {observer} from "mobx-react";
interface State {

}
interface Props{
    data: AlbumProperties[];
}
@observer
class AlbumList extends Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state={data: undefined}
    }
    componentDidMount(): void {
    }

    render() {
        return (
            <div>
                <div className={style.body}>
                    {this.props.data?<React.Fragment>
                            {this.props.data.map((value, index) => {
                                return <AlbumListItem key={index} id={value.albumId} cover={value.cover}
                                                      title={value.name}
                                                      createTime={value.createTime} description={value.description}
                                                      photoAmount={value.photoAmount}/>;
                            })}
                    </React.Fragment>:<CustomSpin/>}
                </div>
            </div>
        );
    }
}

export default AlbumList;
