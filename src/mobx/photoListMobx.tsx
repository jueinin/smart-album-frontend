import {action, observable} from "mobx";
import Axios from "axios";
import {mockPath} from "../index";
export interface PhotoProperties {
  photoId: number;
  name: string;
  description: string;
  albumId: number;
  likes: number;
  isPublic: string;
  size: number;
  width: number;
  height: number;
  tags: string[];
  originalTime: string;
}

class PhotoListMobx {
  @observable photoList: PhotoProperties[]=[];
  
  @action
  getScopeSearchPhotos(keyword: string) {
    Axios.get("/api/photo/personalSearch",{
      params:{
        keyword
      }
    }).then(value1 => {
      this.photoList = value1.data;
    })
  }
  
  @action
  getGlobalSearchPhotos(keyword:string) {
    Axios.get("/api/photo/globalSearch",{
      params:{
        keyword
      }
    }).then(value1 => {
      this.photoList = value1.data;
    })
  }
  @action
  getAllPhotos(){
    Axios.get(`/api/photo/getPhotos`).then(value => {
      this.photoList = value.data;
    })
  }
  
  @action
  getAlbumPhotos(albumId: number,page?:number) {
    Axios.get("/api/album/getAlbumPhotos"+page?`/${page}`:"",{
      params:{
        albumId
      }
    }).then(value => {
      // page ? this.photoList = [...this.photoList, ...value.data] : this.photoList = value.data;
      console.log(this.photoList)
    })
  }
  
  @action
  updatePhotos(location: string, albumId?: number) {
    if (location.toLowerCase().startsWith("/albumlist/")) {
      if (!albumId) {
        this.getAllPhotos();//什么路径该更新什么 傻傻分不清
      } else {
        this.getAlbumPhotos(albumId);
      }
    } else {
      this.getAllPhotos();
    }
  }
  
}

let photoListMobx = new PhotoListMobx();
export {photoListMobx}