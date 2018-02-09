/**
 * Created by wanglinfei on 2017/8/7.
 */
function findIndex(list, str) {
  return list.findIndex((item) => {
    return item === str
  })
}
export function deleArr(arr,item){
  var index = findIndex(arr,item);
  var newArr =arr.slice();
  if(index>-1){
    newArr.splice(index, 1)
  }
  return newArr;
}
export function hasClass(el, className) {
  if(!el){return;}
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if(!el){return;}
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el, className) {
  if(!el){return;}
  if (!hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  var classNow=deleArr(newClass,className)
  el.className = classNow.join(' ')
}
export function getData(el, name, val) {
  name = 'data-' + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

var ElementStyle = document.createElement('div').style

var vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (var key in transformNames) {
    if (ElementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (!vendor) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
