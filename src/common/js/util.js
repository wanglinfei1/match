/**
 * Created by wanglinfei on 2017/9/7.
 */
export function copy(obj1) {
  var obj2 = {};
  for (var i in obj1) {
    obj2[i] = obj1[i];
  }
  return obj2;
}
function getRandom(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}
export function shuffle(arr) {
  let _arr = arr.slice()
  for (var i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i)
    let Newarr = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = Newarr
  }
  return _arr
}

export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function addOnePlayer(arr,player){
  var newArr = arr.slice()
  newArr.push(player);
  return newArr;
}
export function formatDate(date, fmt) {
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
export function formatTime(time) {
  var min = parseInt(time/60);
  var sec = Math.floor(time%60);
  var str = (min>=10?min+'':'0'+min)+':'+(sec>=10?sec+'':'0'+sec)
  return str
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function filterFn(arr,name,val) {
  var newArr = [];
  for(var i=0; i<arr.length;i++){
    if(arr[i][name] == val){
      newArr.push(arr[i])
    }
  }
  return newArr;
}
