import {action, observable} from "mobx";

class SelectDownloadMobx {
  @observable downloadClick: boolean = false;
}

export let selectDownloadMobx = new SelectDownloadMobx();