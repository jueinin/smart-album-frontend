import React, {Component} from 'react';
import style from "./photoList.module.css";
import {List, Radio} from "antd";
interface Item {
    photoId: string;
    photoSrc: string;
}
interface Props {
    style?: React.CSSProperties;
}
class PhotoList extends Component<Props,{}> {
    render() {
        let data=[
            {
                photoId: 1,
                photoSrc: "http://jueinin.oss-cn-hongkong.aliyuncs.com/images/x16Uh2qMFevWq9qyZYKnfQomEo3UHZpGhlYZVc4.jpeg"
            },
            {
                photoId: 1,
                photoSrc: "http://jueinin.oss-cn-hongkong.aliyuncs.com/images/x16Uh2qMFevWq9qyZYKnfQomEo3UHZpGhlYZVc4.jpeg"
            },
            {
                photoId: 1,
                photoSrc: "http://jueinin.oss-cn-hongkong.aliyuncs.com/images/x16Uh2qMFevWq9qyZYKnfQomEo3UHZpGhlYZVc4.jpeg"
            },
            {
                photoId: 1,
                photoSrc: "http://jueinin.oss-cn-hongkong.aliyuncs.com/images/x16Uh2qMFevWq9qyZYKnfQomEo3UHZpGhlYZVc4.jpeg"
            }
        ]
        return (
            <div className={style.body} style={this.props.style}>
                <Radio.Group>
                    <List dataSource={data} grid={{gutter:16,span:4}} renderItem={(item: Item) => {
                        return  <Radio>
                            <img style={{width:"100%"}} src={item.photoSrc}/>
                        </Radio>
                    }}/>
                </Radio.Group>
            </div>
        );
    }
}

export default PhotoList;
