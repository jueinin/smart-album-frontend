import React, {Component} from 'react';
import PhotosShow from "../phototsShow/photosShow";
import {photoListMobx, PhotoProperties} from "../../../mobx/photoListMobx";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import {photoPageTypeMobx} from "../../../mobx/PhotoPageTypeMobx";

interface Props extends RouteComponentProps<{id:string}>{
}
interface State {
  keyword: string;
}
@observer
class Search extends Component<Props,State> {
  componentDidMount(): void {
    let keyword = this.props.location.search.substring(1).split("=")[1];
    //this.setState({keyword: keyword});
    photoListMobx.getScopeSearchPhotos(keyword);
    console.log("external search");
  }
  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    let keyword = nextProps.location.search.substring(1).split("=")[1];
    //this.setState({keyword: keyword})
    photoListMobx.getScopeSearchPhotos(keyword);
  }
  
  render() {
    return <div>
      <PhotosShow type={"externalSearchPhotos"} searchShowPage {...this.props}/>
    </div>;
  }
}

export default Search;