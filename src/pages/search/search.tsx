import React, {Component} from 'react';
import {RouteComponentProps} from "react-router";
import style from './search.module.css';
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import PhotosShow from "../albumList/phototsShow/photosShow";
import {photoListMobx, PhotoPageProperties, PhotoProperties} from "../../mobx/photoListMobx";
import querystring from 'query-string';
import {observer} from "mobx-react";
import {PhotoPageType, photoPageTypeMobx} from "../../mobx/PhotoPageTypeMobx";
interface Props extends RouteComponentProps<{id:string}>{
  photos: PhotoPageProperties;
}
interface State {

}
@observer
class Search extends Component<Props,State> {
  componentDidMount(): void {
    let keyword = querystring.parse(this.props.location.search.substring(1)).keyword as string;
    photoListMobx.getGlobalSearchPhotos(keyword);
    photoPageTypeMobx.setPhotoPageType("externalSearchPhotos");
  }
  
  render() {
    return (
      <div>
        <Navbar>
          <NavbarLink title={"首页"} path={'/'}/>
          <NavbarLink title={'个人主页'} path={'/albumlist'}/>
        </Navbar>
        <div className={style['body']}>
        {<PhotosShow type={"externalSearchPhotos"} searchShowPage promotionPage {...this.props} />}
        </div>
      </div>
    );
  }
}

export default Search;