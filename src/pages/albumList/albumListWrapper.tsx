import React, {Component} from 'react';
import AlbumList from "./albumList";
import {albumListMobx} from "../../mobx/albumListMobx";
import {observer} from "mobx-react";
import {userInfoMobx} from "../../mobx/userMobx";
import {RouteComponentProps} from "react-router";
import {photoPageTypeMobx} from "../../mobx/PhotoPageTypeMobx";

@observer
class AlbumListWrapper extends Component<RouteComponentProps,{}> {
  componentDidMount(): void {
    albumListMobx.getAlbumList();
    userInfoMobx.getUserInfo();
  }
  
  render() {
    return (
      <AlbumList albumList={albumListMobx.albumList} userInfo={userInfoMobx.userInfo} {...this.props} type={photoPageTypeMobx.type}/>
    );
  }
}

export default AlbumListWrapper;