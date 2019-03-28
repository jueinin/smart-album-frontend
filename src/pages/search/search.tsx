import React, {Component} from 'react';
import {RouteComponentProps} from "react-router";
import Navbar from "../../components/navbar/navbar";
import NavbarLink from "../../components/navbar/navbarLink/navbarLink";
import PhotosShow from "../albumList/phototsShow/photosShow";
import {photoListMobx, PhotoProperties} from "../../mobx/photoListMobx";
import querystring from 'query-string';
interface Props extends RouteComponentProps<{id:string}>{
  photos: PhotoProperties[];
}
interface State {

}
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
          <NavbarLink title={'/个人主页'} path={'/albumlist'}/>
        </Navbar>
        {this.props.photos?<PhotosShow data={photoListMobx.photoList}{...this.props}/>:"没有搜索结果"}
      </div>
    );
  }
}

export default Search;