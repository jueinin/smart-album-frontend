import {action, observable} from "mobx";

export type PhotoPageType = "allPhotos" | "albumPhotos" | "searchPhotos" |"externalSearchPhotos"|"promotionPhotos"; //searchphoto指的是scope search

class PhotoPageTypeMobx {
  @observable type: PhotoPageType = undefined;
  @action
  getPhotoPageType=()=>{
    return this.type;
  }
  @action
  setPhotoPageType=(type:PhotoPageType)=>{
    this.type = type;
  }
}

let photoPageTypeMobx = new PhotoPageTypeMobx();
export {photoPageTypeMobx};