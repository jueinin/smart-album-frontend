import React, {Component} from 'react';
import style from './customDialog.module.css';
import {Button} from "antd";
interface Props {
    dialogShow: boolean;
    onCancel:()=>void;
    onOk:()=>void
}
interface State {
    dialogShow: boolean;
}
class CustomDialog extends Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state={dialogShow: this.props.dialogShow}
    }
    render() {
        return (
            <div>
                <div className={style.body} style={{display: this.props.dialogShow ? "block" : "none"}}>
                    <div style={{textAlign:"center"}}>
                        <h2>title</h2>
                    </div>
                    <div>
                        <p>content</p>
                        <p>content</p>
                        <p>content</p>
                    </div>
                    <div>
                        <Button className={style.cancel} onClick={this.props.onCancel}>取消</Button>
                        <Button className={style.confirm} onClick={this.props.onOk}>确定</Button>
                    </div>
                </div>
                <div className={style.overlay} onClick={this.props.onCancel}></div>
            </div>
        );
    }
}

export default CustomDialog;
