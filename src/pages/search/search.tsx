import React, {Component} from 'react';
import {RouteComponentProps} from "react-router";
import style from './search.module.css';
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import PhotosShow from "../albumList/phototsShow/photosShow";
import {photoListMobx, PhotoProperties} from "../../mobx/photoListMobx";
import querystring from 'query-string';
import {observer} from "mobx-react";
import {PhotoPageType, photoPageTypeMobx} from "../../mobx/PhotoPageTypeMobx";
interface Props extends RouteComponentProps<{id:string}>{
  photos: PhotoProperties[];
}
interface State {

}
@observer
class Search extends Component<Props,State> {
  componentDidMount(): void {
  
  }
  
  render() {
    // let forReturn: any;
    // if (photoListMobx.photoList) {
    //   if ()
    // }
    return (
      <div>
        <Navbar>
          <NavbarLink title={"首页"} path={'/'}/>
          <NavbarLink title={'个人主页'} path={'/albumlist'}/>
        </Navbar>
        <div className={style['body']}>
        {this.props.photos&&this.props.photos.length?<PhotosShow type={photoPageTypeMobx.type} searchShowPage={true} data={photoListMobx.photoPageList}{...this.props}/>:"没有搜索结果"}
        </div>
      </div>
    );
  }
}

export default Search;