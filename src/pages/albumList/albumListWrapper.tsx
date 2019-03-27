import React, {Component} from 'react';
import AlbumList from "./albumList";
import {albumListMobx} from "../../mobx/albumListMobx";
import {observer} from "mobx-react";
@observer
class AlbumListWrapper extends Component {
  componentDidMount(): void {
    albumListMobx.getAlbumList();
  }
  
  render() {
    return (
      <AlbumList albumList={albumListMobx.albumList}/>
    );
  }
}

export default AlbumListWrapper;