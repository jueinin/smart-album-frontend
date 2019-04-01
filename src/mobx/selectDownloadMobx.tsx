import {action, observable} from "mobx";

class SelectDownloadMobx {
  @observable downloadClick: boolean = false;
}//目前没用

export let selectDownloadMobx = new SelectDownloadMobx();