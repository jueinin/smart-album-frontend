import React, {Component} from 'react';
import {Button} from "antd";
import CustomDialog from "../../components/dialog/customDialog";
import {RouteComponentProps} from "react-router";
import {mockPath} from "../../index";
import Axios from "axios";
interface State {
    show: boolean;
}
class Test extends Component<RouteComponentProps,State> {
    onClick=()=>{
        Axios.get(`${mockPath}/api/test`).then(value => {
            console.log(value);
        }).catch(error=>{
            console.log("test",error)
        })
    }

    constructor(props:any) {
        super(props);
        this.state={show: false}
    }

    render() {
        return (
            <div>
                <Button onClick={this.onClick}>打开或者关闭</Button>
                <CustomDialog dialogShow={this.state.show} onOk={this.onClick} onCancel={this.onClick}/>
            </div>
        );
    }
}

export default Test;
