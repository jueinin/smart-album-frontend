import {observable} from "mobx";

class IsLoginMobx {
  @observable login: boolean = false;
}

export let isLoginMobx = new IsLoginMobx();