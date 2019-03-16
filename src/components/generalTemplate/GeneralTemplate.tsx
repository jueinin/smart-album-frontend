import React, {Component} from 'react';
import style from './GeneralTemplate.module.css';
class GeneralTemplate extends Component {
    render() {
        return (
            <div className={style.main}>
                <div className={style.top}>
                    <div className={style["inner-top"]}>
                        <i title={"主菜单"} className={"mdui-icon material-icons " + style.icon}>dehaze</i>
                        <div className={style.logo}>
                            <div className={style["logo-img"]}></div>
                            <span className={style["logo-title"]}>相册</span>
                        </div>
                        <div className={style["top-center"]}>
                            <div className={style["top-center-left"]}>
                                <i className={"mdui-icon material-icons " + style["search-icon"]}>search</i>
                                <input className={style["top-center-input"]} placeholder={"搜索你的照片"}/>
                            </div>
                            <div className={style["top-center-right"]}>
                                <button className={style.button}>
                                    <i className="mdui-icon material-icons">add</i>
                                    创建
                                </button>
                                <button className={style.button}>
                                    <i className="mdui-icon material-icons">file_upload</i>
                                    上传
                                </button>
                            </div>
                        </div>
                        <div>
                            <i className={"mdui-icon material-icons " + style.icon}>dialpad</i>
                        </div>
                    </div>
                </div>
                <div className={style.bottom}>
                    <div className={style.left}>
                        <button className={style["left-button"]}><i className="mdui-icon material-icons">insert_photo</i>照骗</button>
                        <button className={style["left-button"]}><i className="mdui-icon material-icons">photo_library</i>影片</button>
                        <button className={style["left-button"]}><i className="mdui-icon material-icons">help</i>助理</button>
                        <button className={style["left-button"]}><i className="mdui-icon material-icons">share</i>分享</button>
                    </div>
                    <div className={style.right}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default GeneralTemplate;