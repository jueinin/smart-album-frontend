import React, {Component} from 'react';
import PhotosShow from "./photosShow";
import {RouteComponentProps} from "react-router";
import {photoListMobx} from "../../../mobx/photoListMobx";
import {observer} from "mobx-react";
import {Button} from "antd";
@observer
class PhotoShowWrapper extends Component<RouteComponentProps<{ id: string}>> {
  componentDidMount(): void {
    photoListMobx.updatePhotos(this.props.location.pathname.toString(), parseInt(this.props.match.params.id));
  }
  componentWillReceiveProps(nextProps: Readonly<RouteComponentProps<{ id: string }>>, nextContext: any): void {
    photoListMobx.updatePhotos(nextProps.location.pathname.toString(), parseInt(this.props.match.params.id));
  }
  render() {
    return (
      <div>
        <PhotosShow data={photoListMobx.photoList} {...this.props}/>
      </div>
    );
  }
}

export default PhotoShowWrapper;