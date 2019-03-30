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
    Axios.get("/api/photo/scopeSearch",{
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
  getAlbumPhotos(albumId: number) {
    Axios.get("/api/album/getAlbumPhotos",{
      params:{
        albumId
      }
    }).then(value => {
      this.photoList = value.data;
    })
  }
  
  @action
  updatePhotos(location: string, albumId?: number) {
    if (location.toLowerCase().startsWith("/albumlist/")) {
      this.getAlbumPhotos(albumId);
    } else {
      this.getAllPhotos();
    }
  }
  
}

let photoListMobx = new PhotoListMobx();
export {photoListMobx}