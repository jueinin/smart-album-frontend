import React, {Component} from 'react';
import Search from './search';
import {RouteComponentProps} from "react-router";
import querystring from "query-string";
import {photoListMobx} from "../../mobx/photoListMobx";

class SearchWrapper extends Component<RouteComponentProps<{id:string}>,{}> {
  componentDidMount(): void {
    let keyword = querystring.parse(this.props.location.search.substring(1)).keyword as string;
    photoListMobx.getGlobalSearchPhotos(keyword);
  }
  
  render() {
    return (
      <div>
        <Search {...this.props} photos={photoListMobx.photoList} />
      </div>
    );
  }
}

export default SearchWrapper;