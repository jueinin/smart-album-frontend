//函数节流
export const throttle=(func:Function,gapTime:number)=>{
  let lastTime = null;
  return ()=>{
    let nowTime = +new Date();
    if (nowTime - lastTime > gapTime || !lastTime) {
      func();
      lastTime = nowTime;
    }
  }
}