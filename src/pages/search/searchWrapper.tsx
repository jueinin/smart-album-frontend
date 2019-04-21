import React, {Component} from 'react';
import Search from './search';
import {RouteComponentProps} from "react-router";
import querystring from "query-string";
import {photoListMobx} from "../../mobx/photoListMobx";
import {observer} from "mobx-react";
import {photoPageTypeMobx} from "../../mobx/PhotoPageTypeMobx";
@observer
class SearchWrapper extends Component<RouteComponentProps<{id:string}>,{}> {
  componentDidMount(): void {
  
  }
  
  render() {
    return (
      <div>
        <Search {...this.props} photos={photoListMobx.photoPageList}/>
      </div>
    );
  }
}

export default SearchWrapper;