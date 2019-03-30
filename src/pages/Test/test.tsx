import React, {Component} from 'react';
import {Button, Tag} from "antd";
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
                <Tag closable>ddddd</Tag>
            </div>
        );
    }
}

export default Test;
