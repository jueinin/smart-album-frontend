import {action, observable} from "mobx";
import Axios from "axios";
import {message} from "antd";
export interface AlbumProperties {
  albumId: number;
  name: string;
  userId: number;
  cover: number;
  createTime: string;
  lastEditTime: string;
  description: string;
  isDefaultAlbum: number;
  photoAmount: number;
}
class AlbumListMobx {
  @observable albumList: AlbumProperties[]=[];
  @action
  getAlbumList(callback?:any){
    Axios.get("/api/album/getAlbumList").then(value => {
      this.albumList = value.data;
    })
    if (callback) {
      callback();
    }
  }
  
  @action
  deleteAlbum(albumId: number) {
    Axios.post("/api/album/delete",{
      albumId
    }).then(value => {
      if (value.data.status === 'ok') {
        message.success("删除成功");
        albumListMobx.getAlbumList();
      }
    }).catch(err=>{
      let msg = err.data.message;
      if (msg === 'forbidden edit') {
        message.error("禁止编辑");
      }
    })
  }
}

export let albumListMobx = new AlbumListMobx();