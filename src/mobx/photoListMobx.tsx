import {action, observable} from "mobx";
import Axios from "axios";
import {mockPath} from "../index";
export interface PhotoProperties {
  photoId: number;
  name: string;
  description: string;
  albumId: number;
  likes: number;
  isPublic: number;
  size: number;
  width: number;
  height: number;
  tags: string[];
  originalTime: string;
}
export interface PhotoPageProperties {
  pages: number;
  photos: PhotoProperties[];
}
let defaultPhotoPageList={pages:1, photos: []};
class PhotoListMobx {
  @observable photoList: PhotoProperties[]=[];
  @observable photoPageList: PhotoPageProperties = defaultPhotoPageList;
  
  @action
  getScopeSearchPhotos(keyword: string,page?:number) {
    if (!page) {
      Axios.get("/api/photo/personalSearch", {
        params: {
          keyword, page: 1
        }
      }).then(value1 => {
        this.photoPageList = value1.data;
      }).catch(err=>{
        if (err.status === 404) {
          this.photoPageList = defaultPhotoPageList;
        }
      })
    } else {
      Axios.get("/api/photo/personalSearch",{
        params:{
          keyword,
          page
        }
      }).then(value1 => {
        this.photoPageList = {
          pages: value1.data.pages,
          photos: [...this.photoPageList.photos, ...value1.data.photos]
        }
      })
    }
  }
  
  @action
  getGlobalSearchPhotos(keyword:string,page?:number) {
    if (!page) {
      Axios.get("/api/photo/globalSearch", {
        params: {
          keyword, page: 1
        }
      }).then(value1 => {
        this.photoPageList = value1.data;
      }).catch(err=>{
        if (err.status === 404) {
          this.photoPageList = defaultPhotoPageList;
        }
      })
    } else {
      Axios.get("/api/photo/globalSearch",{
        params:{
          keyword,
          page
        }
      }).then(value1 => {
        this.photoPageList = {
          pages: value1.data.pages,
          photos: [...this.photoPageList.photos, ...value1.data.photos]
        }
      })
    }
  }
  
  @action
  getAllPhotos(page?: number) {
    if (!page) {
      Axios.get(`/api/photo/getPhotos`, {
        params: {
          page: 1
        }
      }).then(value => {
        this.photoPageList = value.data;
      }).catch(err=>{
        if (err.status === 404) {
          this.photoPageList = defaultPhotoPageList;
        }
      })
    } else {
      Axios.get(`/api/photo/getPhotos`,{
        params:{
          page
        }
      }).then(value => {
        this.photoPageList = {
          pages: value.data.pages,
          photos: [...this.photoPageList.photos, ...value.data.photos]
        }
      })
    }
  }
  
  @action
  getAlbumPhotos(albumId: number,page?:number) {
    let path = "/api/album/getAlbumPhotos";
    if (!page) {
      Axios.get(path, {
        params: {
          albumId, page: 1
        }
      }).then(value => {
        this.photoPageList = value.data;
      }).catch(err=>{
        if (err.status === 404) {
          this.photoPageList = defaultPhotoPageList;
        }
      })
    } else {
      Axios.get(path,{
        params:{
          albumId,
          page
        }
      }).then(value => {
        this.photoPageList = {
          pages: value.data.pages,
          photos: [...this.photoPageList.photos, ...value.data.photos]
        }
      })
    }
  }
}

let photoListMobx = new PhotoListMobx();
export {photoListMobx}