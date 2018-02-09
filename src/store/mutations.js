/**
 * Created by wanglinfei on 2017/8/10.
 */
import * as type from './mutations-type'
import {saverRadio,saveMatchStartTime,saveSection} from '../common/js/cache'
const moutations = {
  [type.SET_ITEMPLAYER1](state, itemPlayer1) {
    state.itemPlayer1 = itemPlayer1
  },
  [type.SET_ITEMPLAYER2](state, itemPlayer2) {
    state.itemPlayer2 = itemPlayer2
  },
  [type.SET_RADIO](state, {radio,itemType}) {
    if(itemType == 1){
      state.radio1 = radio
      saverRadio('radio1',radio)
    }else{
      state.radio2 = radio
      saverRadio('radio2',radio)
    }
  },
  [type.SET_ID](state, ID) {
    state.ID = ID
  },
  [type.SET_MATCHTIME](state, matchTime) {
    state.matchTime = matchTime
  },
  [type.SET_MATCHSTATUS](state, matchStatus) {
    state.matchStatus = matchStatus
  },
  [type.SET_OPERREC](state, operationRec) {
    state.operationRec = operationRec
  },
  [type.SET_ITEMNAME](state, itemName) {
    state.itemName = itemName
  },
  [type.SET_PLAYER_DATA](state, player_data) {
    state.player_data = player_data
  },
  [type.SET_MATCH_START_TIME](state, matchStartTime) {
    saveMatchStartTime(matchStartTime);
    state.matchStartTime = matchStartTime
  },
  [type.SET_SECTION](state, section) {
    saveSection(section);
    state.section = section
  },
}

export default moutations
