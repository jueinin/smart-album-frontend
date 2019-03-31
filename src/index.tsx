import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MainRoute from "./MainRoute";
import 'mdui/dist/css/mdui.css';
import 'mdui/dist/js/mdui';
import 'antd/dist/antd.css'
import './index.css'
import SignUp from "./pages/signup/signup";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider, Modal} from "antd";
import SignIn from "./pages/signin/signin";
import AlbumList from "./pages/albumList/albumList";
import CustomDialog from "./components/dialog/customDialog";
import Test from "./pages/Test/test";
import PersonalCenter from "./pages/personalCenter/personalCenter";
import Axios from "axios";
import {albumListMobx} from "./mobx/albumListMobx";
import AlbumListWrapper from "./pages/albumList/albumListWrapper";
import PersonalCenterWrapper from "./pages/personalCenter/personalCenterWrapper";
import ResetPassword from "./pages/resetPassword/resetPassword";
import RetrievePassword from "./pages/retrievePassword/retrievePassword";
import Search from "./pages/search/search";
import SearchWrapper from "./pages/search/searchWrapper";
import BackendRoute from "./pages/backend/backendRoute";
export const mockPath = "http://120.79.239.103:8080/mock/16/mockapi";
export const picUrlPrefix = "/api/photo/show?photoId=";
export const picThumbnailUrlPrefix = "/api/photo/showThumbnail?photoId=";
                                                                                                 //弄清楚冒泡捕获  还有那些狗屎高度
Axios.interceptors.response.use(value => {
    return value;
},(err:any)=>{
    console.log("inmdex",err);
    if (err.response.status===401) {
        Modal.error({title:"您的会话已过期,请重新登录",
                cancelText: "",
                okText:"好的",
                onOk:()=>{
                    window.location.href = "/";
                }
            })
        return;
    }
    return Promise.reject(err)
    // Modal.error({title:"您的会话已过期,请重新登录",
    //     cancelText: "",
    //     okText:"好的",
    //     onOk:()=>{
    //         window.location.href = "/";
    //     }
    // })
})
ReactDOM.render(
  <div>
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route path={'/backend'} component={BackendRoute}/>
          <Route path={"/signin"} component={SignIn}/>
          <Route path={"/signup"} component={SignUp}/>
          <Route path={'/albumlist'} component={AlbumListWrapper}/>  {/* mobx 可以直接套render  就是最外层需要个wrapper*/}
          <Route path={"/personalCenter"} component={PersonalCenterWrapper}/>
          <Route path={'/resetPassword'} component={ResetPassword}/>
          <Route path={'/retrievePassword'} component={RetrievePassword}/>
          <Route path={'/search'} component={SearchWrapper}/>
          <Route path={'/test'} component={Test}/>
          <Route path={'/'} component={MainRoute}/>
        </Switch>
      </BrowserRouter>
    </LocaleProvider>
  </div>, document.getElementById('root'));

