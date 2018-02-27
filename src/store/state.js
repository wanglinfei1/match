/**
 * Created by wanglinfei on 2017/8/10.
 */
const state = {
  itemPlayer1: [],//球队1成员
  itemPlayer2:[],//球队2成员
  radio1:0, //球队1队服颜色
  radio2:1,//球队2队服颜色
  matchTime:{}, //比赛时间
  section:1, //比赛节数
  matchStatus:0, //比赛状态开始暂停
  operationRec:[], //球队球员操作记录
  itemName:[], //球队名称
  player_data:{}, //球员数据
  matchStartTime:'' //比赛开始日期
}
export default state
