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
import {LocaleProvider} from "antd";
import SignIn from "./pages/signin/signin";
import AlbumList from "./pages/albumList/albumList";
import CustomDialog from "./components/dialog/customDialog";
import Test from "./pages/Test/test";
import PersonalCenter from "./pages/personalCenter/personalCenter";

ReactDOM.render(
    <div>
        <LocaleProvider locale={zhCN}>
            <BrowserRouter>
                <Switch>
                    <Route path={"/signin"} component={SignIn}/>
                    <Route path={"/signup"} component={SignUp}/>
                    <Route path={'/albumlist'} component={AlbumList}/>
                    <Route path={"/personalCenter"} component={PersonalCenter}/>
                    <Route path={'/test'} component={Test}/>
                    <Route path={'/'} component={MainRoute}/>
                </Switch>
            </BrowserRouter>
        </LocaleProvider>
    </div>, document.getElementById('root'));

