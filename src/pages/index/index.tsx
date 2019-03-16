import React, {ChangeEvent, Component, DragEventHandler} from 'react';
import style from './index.module.css';
class Index extends Component {
    onChange=(event:ChangeEvent<HTMLInputElement>)=>{
        let fileList=event.target.files
        if (fileList!=null&&fileList.length > 0) {
            // @ts-ignore
            console.log(fileList.item(0).name);
        }

    }
    onDrag=(ev:DragEventHandler<HTMLDivElement>)=>{
        console.log(ev);
    }
    render() {
        return (
            <div className={style.outer} onDragLeave={()=>this.onDrag}>
                图片拖过来就能上传  或者<input type='file' accept={"image/gif,image/jpeg,image/jpg,image/png"} multiple onChange={this.onChange}/>
            </div>
        );
    }
}

export default Index;
