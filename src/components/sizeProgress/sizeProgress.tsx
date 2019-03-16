import React, {Component} from 'react';
import style from './sizeProgress.module.css';
interface Props {
    progress: number;
    height: number;
}
class SizeProgress extends Component<Props,{}> {
    render() {
        return (
            <div className={style.wrapper} style={{height:this.props.height}}>
                <div className={style.progress} style={{width:this.props.progress+"%"}}></div>
            </div>
        );
    }
}

export default SizeProgress;
