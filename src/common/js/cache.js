/**
 * Created by wanglinfei on 2017/9/12.
 */
import storage from 'good-storage'

function insetItem(arr, val, methods, maxLen) {
  const index = arr.findIndex(methods)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.push(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
export function changeItem(arr, val, methods){
  const index = arr.findIndex(methods)
  if (index > -1) {
    arr[index] = val
  }
  return arr;
}
export function pushItem(arr,val,methods){
  const index = arr.findIndex(methods)
  if (index > -1) {
    arr.splice(index, 1)
  }
  arr.push(val)
}
function deleteItem(arr, methods) {
  const index = arr.findIndex(methods)
  arr.splice(index, 1)
}
export function savePlayers(key,item) {
  var players = storage.get(key, [])
  insetItem(players, item, (player) => {
    return player.id === item.id
  })
  storage.set(key, players)
  return players
}

export function loadStorage(key,type) {
  return storage.get(key, type)
}
export function setStorage(key,item) {
  return storage.set(key, item)
}
export function delePlayer(key,item) {
  var players = storage.get(key, [])
  deleteItem(players, (player) => {
    return player.id === item.id
  })
  storage.set(key, players)
  return players
}
export function changePlayer(key,item){
  var players = storage.get(key, [])
  changeItem(players, item, (player) => {
    return player.id === item.id
  })
  storage.set(key, players)
  return players
}
export function saveID(ID) {
  var ID = storage.get('ID', '')+1;
  storage.set('ID', ID)
  return ID;
}
export function saverRadio(key,val) {
  storage.set(key, val)
  return val;
}
export function saveMatchStartTime(val) {
  storage.set('matchStartMatch',val)
  return val;
}
export function saveTime(section,time) {
  var matchTime = storage.get('matchTime', {});
  matchTime.section = section;
  matchTime.time = time;
  storage.set('matchTime', matchTime)
  return matchTime;
}
export function saveSection(section) {
  storage.set('section', section)
  return section;
}
export function saveRec(operRec) {
  var operationRecs = storage.get('operationRec', []);
  pushItem(operationRecs, operRec, (item) => {
    return operRec.id === item.id
  });
  storage.set('operationRec', operationRecs)
  return operationRecs;
}
export function deleOneRec(operRec) {
  var operationRecs = storage.get('operationRec', []);
  deleteItem(operationRecs, (item) => {
    return operRec.id === item.id
  });
  storage.set('operationRec', operationRecs)
  return operationRecs;
}
