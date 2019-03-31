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
@observer
class PhotoShowWrapper extends Component<Props,{}> {
  getData=(props:Props)=>{
    if (props.type === "allPhotos") {
      photoListMobx.getAllPhotos();
      photoPageTypeMobx.setPhotoPageType("allPhotos");
    }else if (props.type === "albumPhotos") {
      let id = parseInt(props.match.params.id);
      console.log(props);
      photoListMobx.getAlbumPhotos(id);
      photoPageTypeMobx.setPhotoPageType("albumPhotos");
    }else if (props.type === "searchPhotos") {
      let keyword = queryString.parse(props.location.search.substring(1)).keyword as string;
      photoListMobx.getGlobalSearchPhotos(keyword);
      photoPageTypeMobx.setPhotoPageType("searchPhotos");
    }
  }
  componentDidMount(): void {
    console.log(this.props.match.params.id);
    this.getData(this.props);
  }
  componentWillReceiveProps(nextProps:Props, nextContext: any): void {
    this.getData(nextProps);
  }
  componentWillUnmount(): void {
    photoListMobx.photoList = [];
  }
  
  render() {
    return (
      <PhotosShow data={photoListMobx.photoList} {...this.props}/>
    );
  }
}

export default PhotoShowWrapper;