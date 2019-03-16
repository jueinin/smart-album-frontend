import React, {Component} from 'react';
import {Button} from "antd";
import CustomDialog from "../../components/dialog/customDialog";
interface State {
    show: boolean;
}
class Test extends Component<{},State> {
    onClick=()=>{
        this.setState({show:!this.state.show})
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
