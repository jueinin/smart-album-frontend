import React, {ChangeEvent, Component} from 'react';
import {Button, Tag} from "antd";
import CustomDialog from "../../components/dialog/customDialog";
import {RouteComponentProps} from "react-router";
import {mockPath} from "../../index";
import Axios from "axios";
import {throttle} from "../../tools/toolFun";
import {observable} from "mobx";
import {observer} from "mobx-react";
interface State {
    show: boolean;
    count: number;
}
class Count {
    @observable count = 0;
}

let count = new Count();
@observer
class Test extends Component<RouteComponentProps<{id?:string}>,State> {
    constructor(props:any) {
        super(props);
        this.state={show: false, count : 0}
    }
    componentDidMount(): void {
        count.count++;
    }
    onCount=()=>{
        count.count++;
    }
    componentWillReceiveProps(nextProps: Readonly<RouteComponentProps<{ id?: string }>>, nextContext: any): void {
        console.log(count.count)
    }
    
    render() {
        return (
          <div>
              <button onClick={this.onCount}>+++++</button>{count.count}
          </div>
        );
    }
}

export default Test;
