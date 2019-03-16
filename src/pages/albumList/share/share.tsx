import React, {Component} from 'react';
import {Button, Table} from "antd";
import {ColumnProps} from "antd/lib/table";
interface Columns {
    filename: string;
    filesize: string;
    shareTime: string;
    method: string;
    key:any
}
class Share extends Component {
    datasource: Columns[] = [
        {
            filename: "test.jpeg",
            filesize: "133.6kb",
            shareTime: "2019-3-14",
            method:"删除",
            key:"33"
        }
    ];
    render() {
        const Column = Table.Column;
        return (
            <div>
                <Table dataSource={this.datasource}>
                    <Column title={"文件名"} key={'filename'} dataIndex={'filename'}/>
                    <Column title={"文件大小"} key={'filesize'} dataIndex={'filesize'}/>
                    <Column title={'分享时间'} key={'shareTime'} dataIndex={"shareTime"}/>
                    <Column title={"操作"} key={'method'} dataIndex={'method'} render={(text:any,record)=>{
                        return <div>
                            <Button>{text}</Button>
                        </div>
                    }}/>
                </Table>
            </div>
        );
    }
}

export default Share;
