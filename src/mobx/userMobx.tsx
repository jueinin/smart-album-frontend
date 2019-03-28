import {action, observable} from "mobx";
import Axios from "axios";
import {message} from "antd";
export interface UserProperties {
  username: string;
  email: string;
  gender: number;
  avatar: string;
  signature: string;
  nickname: string;
  storeSpace: number;
  usedSpace: number;
  photoAmount: number;
  photoInRecycleAmount: number;
  albumAmount: number;
}
class UserMobx {
  @observable userInfo: UserProperties;
  
  @action
  getUserInfo() {
    Axios.get("/api/user/getInfo").then(value => {
      this.userInfo = value.data;
    })
  }
}

export let userInfoMobx = new UserMobx();