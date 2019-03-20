import React, {Component} from 'react';
import {Button, message, Table} from "antd";
import Axios from "axios";
import {mockPath} from "../../../index";
import {Data} from "unist";
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
interface Columns {
    fileName: string;
    fileSize: string;
    deleteTime: string;
}
interface DataItem extends Columns{
    photoId: number;
}
interface State {
    data: DataItem[];
}
class RecycleBin extends Component<{},State> {
    constructor(props:any) {
        super(props);
        this.state={data: undefined}
    }

    getRecycleBinData=()=>{
        Axios.get(mockPath+"/recyclebin").then(value => {
            this.setState({data:value.data})
        })
    }
    componentDidMount(): void {
        this.getRecycleBinData();
    }
    permanentDelete=(photoId:number)=>{
        Axios.post(mockPath+"/delete",{
            photoId
        }).then(value => {
            if (value.data.status === "ok") {
                message.success("删除成功");
                this.getRecycleBinData();
            }
        })
    }
    render() {
        const Column = Table.Column;
        const that = this;
        return (
            <div>
                {this.state.data?<Table dataSource={this.state.data}>
                    <Column title={"文件名"} key={'fileName'} dataIndex={'fileName'}/>
                    <Column title={"文件大小"} key={'fileSize'} dataIndex={'fileSize'}/>
                    <Column title={'分享时间'} key={'deleteTime'} dataIndex={"deleteTime"}/>
                    <Column title={"操作"} key={'method'} dataIndex={'photoId'} render={(text:any,record)=>{
                        return <div>
                            <Button onClick={() => that.permanentDelete(text)}>永久删除</Button>
                        </div>;
                    }}/>
                </Table>:<CustomSpin/>}
            </div>
        );
    }
}

export default RecycleBin;
