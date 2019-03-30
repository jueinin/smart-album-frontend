import React, {Component} from 'react';
import PhotosShow from "../phototsShow/photosShow";
import {photoListMobx} from "../../../mobx/photoListMobx";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
interface Props extends RouteComponentProps<{id:string}>{

}
interface State {
  keyword: string;
}
@observer
class Search extends Component<Props,State> {
  state: State = {
    keyword: undefined
  };
  componentDidMount(): void {
    let keyword = this.props.location.search.substring(1).split("=")[1];
    //this.setState({keyword: keyword});
    photoListMobx.getScopeSearchPhotos(keyword);
  }
  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    let keyword = nextProps.location.search.substring(1).split("=")[1];
    //this.setState({keyword: keyword})
    photoListMobx.getScopeSearchPhotos(keyword);
  }
  
  render() {
    let forReturn: any;
    if (!this.state.keyword || photoListMobx.photoList.length == 0) {
      forReturn = "没有搜索结果";
    } else {
      forReturn=<PhotosShow data={photoListMobx.photoList} {...this.props}/>
    }
    return <div>
      {forReturn}
    </div>;
  }
}

export default Search;