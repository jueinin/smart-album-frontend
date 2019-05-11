import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MainRoute from "./MainRoute";
import './index.css'
import SignUp from "./pages/signup/signup";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider, Modal} from "antd";
import SignIn from "./pages/signin/signin";
import AlbumList from "./pages/albumList/albumList";
import Test from "./pages/Test/test";
import Axios from "axios";
import PersonalCenterWrapper from "./pages/personalCenter/personalCenterWrapper";
import ResetPassword from "./pages/resetPassword/resetPassword";
import RetrievePassword from "./pages/retrievePassword/retrievePassword";
import SearchWrapper from "./pages/search/searchWrapper";
import BackendRoute from "./pages/backend/backendRoute";
import Search from "./pages/search/search";
export const mockPath = "http://120.79.239.103:8080/mock/16/mockapi";
export const picUrlPrefix = "/api/photo/show?photoId=";
export const picThumbnailUrlPrefix = "/api/photo/showThumbnail?photoId=";
export const avatarUrl = () => '/api/user/showAvatar?time=' + Math.random();
                                                                                                 //弄清楚冒泡捕获  还有那些狗屎高度    mobx的异步没有回调可能需要手动在请求里添加回调函数

Axios.interceptors.response.use(value => {//mobx里的数据  要是state和
    return value;
},(err:any)=>{
    console.log("inmdex",err);
    if (err.response.data.message==='not logged in') {
        Modal.error({title:"您的会话已过期,请重新登录",
                cancelText: "",
                okText:"好的",
                onOk:()=>{
                    window.location.href = "/signin";
                }
            })
        return Promise.reject(err.response);
    }
    return Promise.reject(err.response)
})
ReactDOM.render(
  <div>
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route path={'/backend'} component={BackendRoute}/>
          <Route path={"/signin"} component={SignIn}/>
          <Route path={"/signup"} component={SignUp}/>
          <Route path={'/albumlist'} render={props => <AlbumList/>}/>  {/* mobx 可以直接套render  就是最外层需要个wrapper*/}
          <Route path={"/personalCenter"} component={PersonalCenterWrapper}/>
          <Route path={'/resetPassword'} component={ResetPassword}/>
          <Route path={'/retrievePassword'} component={RetrievePassword}/>
          <Route path={'/search'} component={Search}/>
          <Route path={'/test'} component={Test}/>
          <Route path={'/'} component={MainRoute}/>
        </Switch>
      </BrowserRouter>
    </LocaleProvider>
  </div>, document.getElementById('root'));

