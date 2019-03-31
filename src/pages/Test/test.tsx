import React, {ChangeEvent, Component} from 'react';
import {Button, Tag} from "antd";
import CustomDialog from "../../components/dialog/customDialog";
import {RouteComponentProps} from "react-router";
import {mockPath} from "../../index";
import Axios from "axios";
import {throttle} from "../../tools/toolFun";
interface State {
    show: boolean;
    count: number;
}

class Test extends Component<RouteComponentProps<{id?:string}>,State> {
    constructor(props:any) {
        super(props);
        this.state={show: false, count : 0}
    }
    countup=(i)=>{
        this.setState({count: this.state.count+i})
    }
    onChange=(e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e.currentTarget.files);
    }
    componentDidMount(): void {
        //setInterval(throttle(()=>this.countup(10),1000),10)
        console.log(this.props.match.params.id)
    }
    
    render() {
        return (
          <div>
              <input type={'file'} multiple onChange={this.onChange}/>
          </div>
        );
    }
}

export default Test;
