import React, {Component} from 'react';
import {Button, message, Table} from "antd";
import Axios from "axios";
import {mockPath} from "../../../index";
import {Data} from "unist";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
import {PhotoProperties} from "../../../mobx/photoListMobx";
import {TableRowSelection} from "antd/lib/table";
interface State {
    data: PhotoProperties[];
    selectedRow: PhotoProperties[];
}
class RecycleBin extends Component<{},State> {
    constructor(props:any) {
        super(props);
        this.state={data: undefined,selectedRow:undefined}
    }

    getRecycleBinData=()=>{
        Axios.get("/api/photo/getRecycleBinPhotos").then(value => {
            this.setState({data:value.data})
        })
    }
    componentDidMount(): void {
        this.getRecycleBinData();
    }
    permanentDeletes=()=>{
        if (!this.state.selectedRow) {
            return;
        }
        let photoIds=this.state.selectedRow.map(value => {
            return value.photoId;
        })
        Axios.post("/api/photo/completelyDelete",{
            photoId:photoIds
        }).then(value => {
            if (value.data.status === "ok") {
                message.success("删除成功");
                this.getRecycleBinData();
            }
        });
    }
    rowSelection:TableRowSelection<PhotoProperties>={
        onChange:(selectedRowKeys, selectedRows) => {
            this.setState({selectedRow: selectedRows})
        }
    }
    recoverPics=()=>{
        if (!this.state.selectedRow) {
            return;
        }
        let photoIds=this.state.selectedRow.map(value => {
            return value.photoId;
        })
        Axios.post("/api/photo/moveOutRecycleBin",{
            photoId: photoIds
        }).then(value => {
            if (value.data.status === 'ok') {
                message.success("恢复成功");
                this.getRecycleBinData();
            }
        })
    }
    render() {
        const Column = Table.Column;
        const that = this;
        return (
            <div>
                <Button htmlType={'button'} onClick={this.recoverPics}>恢复选中</Button><Button htmlType={'button'} onClick={this.permanentDeletes}>完全删除选中</Button>
                {this.state.data?<Table dataSource={this.state.data} rowSelection={this.rowSelection}>
                    <Column title={"文件名"} key={'fileName'} dataIndex={'name'}/>
                    <Column title={"文件大小"} key={'fileSize'} dataIndex={'size'}/>
                    <Column title={'分享时间'} key={'deleteTime'} dataIndex={"deleteTime"}/>
                    <Column title={"操作"} key={'method'} dataIndex={'photoId'} render={(text:any,record)=>{
                        return <div>
                            <Button onClick={() => that.permanentDeletes}>永久删除</Button>
                            <Button htmlType={'button'} >恢复</Button>
                        </div>;
                    }}/>
                </Table>:<CustomSpin/>}
            </div>
        );
    }
}

export default RecycleBin;
