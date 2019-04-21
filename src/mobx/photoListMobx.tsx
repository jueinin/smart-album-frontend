import {action, autorun, computed, observable, reaction} from "mobx";
import Axios from "axios";
import {mockPath} from "../index";
import {bool} from "prop-types";
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
  checked?: boolean;
  userLike?: number;
  
}

export interface PhotoPageProperties {
  pages: number;
  photos: PhotoProperties[];
}
let defaultPhotoPageList={pages:1, photos: []};
class PhotoListMobx {
  //@observable photoList: PhotoProperties[]=[];
  @observable photoPageList: PhotoPageProperties = defaultPhotoPageList;
  
  // @ts-ignore
  @observable photoWithChecked: PhotoPageProperties = {
    pages: this.photoPageList.pages,
    photos: this.photoPageList.photos.map(value => {
      value.checked = false;
      return value;
    })
  };
  
  a=autorun(() => {
    this.photoWithChecked = {
      pages: this.photoPageList.pages,
      photos: this.photoPageList.photos.map(value => {
        value.checked = false;
        return value;
      })
    }
  })
  
  
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
  @action
  getPromotionPhotos(){
    Axios.get("/api/photo/recommend").then(value => {
      this.photoPageList.photos = value.data;
    })
  }
}

let photoListMobx = new PhotoListMobx();
export {photoListMobx}