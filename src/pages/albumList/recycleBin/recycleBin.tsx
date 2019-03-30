import React, {Component} from 'react';
import {Button, message, Table} from "antd";
import Axios from "axios";
import {mockPath} from "../../../index";
import style from './recycleBin.module.css';
import CustomSpin from "../../../components/CustomSpin/CustomSpin";
import {PhotoProperties} from "../../../mobx/photoListMobx";
import {TableRowSelection} from "antd/lib/table";

interface Data extends PhotoProperties {

}
interface State {
    data: Data[];
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
    
    permanentDeletes = (photoId?: number) => {
        let photoIds: { photoId: number; }[];
        if (photoId) {
            photoIds = [{
                photoId
            }];
        } else if (!this.state.selectedRow) {
            return;
        } else {
            //a按 state 来
            photoIds = this.state.selectedRow.map(value => {
                return {
                    photoId: value.photoId
                }
            });
        }
        Axios.post("/api/photo/completelyDelete", photoIds).then(value => {
            if (value.data.status === 'ok') {
                message.success("删除成功");
                this.getRecycleBinData();
            }
        })
    };
    rowSelection:TableRowSelection<PhotoProperties>={
        onChange:(selectedRowKeys, selectedRows) => {
            this.setState({selectedRow: selectedRows})
        }
    }
    recoverPics = (photoId?: number) => {//如果传了个photoid  单个删除 没有就按state删除
        let photoIds: { photoId: number; }[];
        if (photoId) {
            photoIds = [{
                photoId
            }];
        } else if (!this.state.selectedRow) {
            return;
        } else {
            //a按 state 来
            photoIds = this.state.selectedRow.map(value => {
                return {
                    photoId: value.photoId
                }
            });
        }
        Axios.post("/api/photo/moveOutRecycleBin", photoIds).then(value => {
            if (value.data.status === 'ok') {
                message.success("恢复成功");
                this.getRecycleBinData();
            }
        })
    };
    render() {
        const Column = Table.Column;
        const that = this;
        return (
          <div>
              <div className={style['all-button']}>
                  <Button htmlType={'button'} size={"large"} onClick={() => this.recoverPics()}>恢复选中</Button><Button
                size={"large"} htmlType={'button'}
                onClick={() => this.permanentDeletes()}>完全删除选中</Button>
              </div>
              {this.state.data ? <Table dataSource={this.state.data} rowSelection={this.rowSelection}
                                        rowKey={(record: PhotoProperties) => record.photoId + ""}>
                  <Column title={"文件名"} key={'fileName'} dataIndex={'name'}/>
                  <Column title={"文件大小"} key={'fileSize'} dataIndex={'size'}
                          render={(text: PhotoProperties['size'], record: any) => {
                            return (text/1024/1024).toFixed(2)+"MB"
                          }}/>
                  <Column title={'到期时间'} key={'deleteTime'} dataIndex={"deleteTime"} render={(text:string,record)=>{
                      let date = new Date(text.substring(0, 10));
                      date.setMonth(date.getMonth() + 2);
                      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                  }
                  }/>
                  <Column title={"操作"} key={'method'} dataIndex={'photoId'} render={(text: any, record) => {
                      return <div>
                          <Button onClick={() => that.permanentDeletes(text)}>永久删除</Button>
                          <Button htmlType={'button'} onClick={() => that.recoverPics(text)}>恢复</Button>
                      </div>;
                  }}/>
              </Table> : <CustomSpin/>}
          </div>
        );
    }
}

export default RecycleBin;
