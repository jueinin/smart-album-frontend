import React, {Component} from 'react';
import PhotosShow from "./photosShow";
import {RouteComponentProps} from "react-router";
import {photoListMobx} from "../../../mobx/photoListMobx";

class PhotoShowWrapper extends Component<RouteComponentProps<{ id: string}>> {
  render() {
    return (
      <div>
        <PhotosShow data={photoListMobx.photoList} {...this.props}/>
      </div>
    );
  }
}

export default PhotoShowWrapper;