/**
 * Created by wanglinfei on 2017/8/10.
 */
import * as type from './mutations-type'
import {savePlayers,delePlayer,changePlayer,saveID,saveTime,saveRec,deleOneRec} from '../common/js/cache'
import UUID from '../common/js/uuid-v4'
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const addPlayerAct = function ({commit, state}, player) {
  var uuid = UUID();
  player.id = uuid;
  commit(type.SET_ITEMPLAYER1, savePlayers('itemPlayer1',player))
}
export const addPlayerAct2 = function ({commit, state}, player) {
  var uuid = UUID();
  player.id = uuid;
  commit(type.SET_ITEMPLAYER2, savePlayers('itemPlayer2',player))
}
export const changeItem = function ({commit, state},{player,itemType}) {
  if(itemType ==1){
    commit(type.SET_ITEMPLAYER1, changePlayer('itemPlayer1',player))
  }else{
    commit(type.SET_ITEMPLAYER2, changePlayer('itemPlayer2',player))
  }
}
export const deleItem = function ({commit, state},{player,itemType}) {
  if(itemType ==1){
    commit(type.SET_ITEMPLAYER1, delePlayer('itemPlayer1',player))
  }else{
    commit(type.SET_ITEMPLAYER2, delePlayer('itemPlayer2',player))
  }
}
export const saveMatchTime = function ({commit, state},{section,time}) {
  commit(type.SET_MATCHTIME, saveTime(section,time))
}

export const savOperRec =function ({commit, state},operRec) {
  var uuid = UUID();
  operRec.id = uuid;
  commit(type.SET_OPERREC, saveRec(operRec))
}
export const deleOneOperRec =function ({commit, state},operRec) {
  commit(type.SET_OPERREC, deleOneRec(operRec))
}
