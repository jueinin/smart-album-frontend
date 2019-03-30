import React, {Component} from 'react';
import {Tag} from "antd";
interface Props {
  tags: string[];
  getTags:(tags:string[])=>void
}

interface State {
  tagInputShow: boolean;
  
}
class UploadTag extends Component<Props,State> {
  render() {
    return (
      <div>
      
      </div>
    );
  }
}

export default UploadTag;