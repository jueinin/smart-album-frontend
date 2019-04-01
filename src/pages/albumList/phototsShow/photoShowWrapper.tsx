import React, {Component} from 'react';
import PhotosShow from "./photosShow";
import {RouteComponentProps} from "react-router";
import {photoListMobx} from "../../../mobx/photoListMobx";
import {observer} from "mobx-react";
import {Button} from "antd";
import * as queryString from "querystring";
import {PhotoPageType, photoPageTypeMobx} from "../../../mobx/PhotoPageTypeMobx";
interface Props extends RouteComponentProps<{ id?: string}>{
  type:PhotoPageType
}

export let getPhotoData = (propsWithType: Props,page?:number,callback?:any) => {
  if (propsWithType.type === "allPhotos") {
    photoListMobx.getAllPhotos(page);
    photoPageTypeMobx.setPhotoPageType("allPhotos");
  } else if (propsWithType.type === "albumPhotos") {
    let id = parseInt(propsWithType.match.params.id);
    photoListMobx.getAlbumPhotos(id,page);
    photoPageTypeMobx.setPhotoPageType("albumPhotos");
  } else if (propsWithType.type === "searchPhotos") {
    let keyword = queryString.parse(propsWithType.location.search.substring(1)).keyword as string;
    photoListMobx.getScopeSearchPhotos(keyword,page);
    photoPageTypeMobx.setPhotoPageType("searchPhotos");
  }else if (propsWithType.type === "externalSearchPhotos") {
    let keyword = queryString.parse(propsWithType.location.search.substring(1)).keyword as string;
    photoListMobx.getGlobalSearchPhotos(keyword, page);
    photoPageTypeMobx.setPhotoPageType("externalSearchPhotos");
  }
  if (callback) {
    callback();
  }
};
@observer
class PhotoShowWrapper extends Component<Props,{}> {
  
  componentDidMount(): void {
    console.log(this.props.match.params.id);
    getPhotoData(this.props);
  }
  componentWillReceiveProps(nextProps:Props, nextContext: any): void {
    getPhotoData(nextProps);
  }
  // componentWillUnmount(): void {
  //   photoListMobx.photoList = [];
  // }
  
  render() {
    return (
      <PhotosShow data={photoListMobx.photoPageList} {...this.props} type={photoPageTypeMobx.type}/>
    );
  }
}

export default PhotoShowWrapper;