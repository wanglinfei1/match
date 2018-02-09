/**
 * Created by wanglinfei on 2017/9/8.
 */
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {filterFn,formatTime} from '../../common/js/util'
import {itemColor, matchLength,sectionArr,operation} from '../../common/js/config'

export const setOperRecMixin = {
  computed: {
    ...mapGetters([
      'radio1',
      'radio2',
      'itemPlayer1',
      'itemPlayer2',
      'operationRec',
      'player_data',
      'itemName',
      'matchStartTime'
    ])
  },
  mounted() {},
  created(){
    this.filterData()
  },
  activated() {},
  watch: {
    operationRec(newData,oldData){
      this.filterData()
    }
  },
  methods: {
    setPlayerData(player_data,operItem){
      if(operItem.playerId){
        var id=operItem.playerId;
      }else{
        var id = 'other'+operItem.itemType;
      }
      var operType = operItem.type;
      if(!player_data[id]){
        player_data[id]={}
      }
      var player_type_data = player_data[id][operType]||0;
      if(operType!='score'){
        player_data[id][operType]=player_type_data+1;
      }else{
        player_data[id][operType]=player_type_data+operItem.score;
      }
    },
    filterData(){
      var pauseNum1 = 0,pauseNum2 = 0,score1 = 0,score2 = 0,foul1 = 0,foul2 = 0;
      var player_data ={};
      var operationRec = this.operationRec;
      for (var i = 0; i < operationRec.length; i++) {
        var operItem = operationRec[i];
        this.setPlayerData(player_data,operItem);
        if (operItem.itemType == 1) {
          if (operItem.type == 'pause') {
            pauseNum1++;
          } else if (operItem.type == 'score') {
            score1 = score1 + operItem.score
          }else if (operItem.type == 'foul') {
            foul1++;
          }
        }
        if (operItem.itemType == 2) {
          if (operItem.type == 'pause') {
            pauseNum2++;
          } else if (operItem.type == 'score') {
            score2 = score2 + operItem.score
          }else if (operItem.type == 'foul') {
            foul2++;
          }
        }
      }
      this.pauseNum1 = pauseNum1;
      this.pauseNum2 = pauseNum2;
      this.score1 = score1;
      this.score2 = score2;
      this.foul1 = foul1;
      this.foul2 = foul2;
      this.set_player_data(player_data);
    },
    ...mapMutations({
      'set_player_data': 'SET_PLAYER_DATA',
    }),
  }
}

export const operMixin ={
  data(){
    return{
      toastShow:false,
      toastText:'',
      confirmText:'数据上传成功，是否结束比赛？',
      addText:'',
      timer:null,
      nowMatchTime:'0',
      formatTime:formatTime,
      selActive: '',
      itemColor:itemColor,
      section:1,
      sectionArr: sectionArr,
    }
  },
  computed: {
    operRecLast(){
      var max = this.operationRec.length;
      return this.operationRec[max - 1] || ''
    },
    ...mapGetters([
      'matchTime',
      'matchStatus',
    ])
  },
  created(){
    this.nowMatchTime = this.matchTime.time || 0;
    this.section = this.matchTime.section || 1;
    var length1 = filterFn(this.itemPlayer1,'lineUp',true).length;
    var length2 = filterFn(this.itemPlayer2,'lineUp',true).length;
    if(length1==0||length2==0){
      this.$router.push({path:'/matchSett'})
    }
  },
  methods:{
    start(){
      if(this.timer&&this.matchStatus == 1){return;}
      this.setMatchStatus(1);
      clearInterval(this.timer);
      if (this.nowMatchTime >= matchLength * 60) {
        this.toastShow = true;
        this.toastText = '进入下节比赛';
        this.nowMatchTime = 0;
        this.section = this.section +1 ;
      }
      this.saveMatchTime({time: this.nowMatchTime, section: this.section});
      this.timer = setInterval(() => {
        this.nowMatchTime++;
      }, 1e3)
    },
    pause(){
      if(this.matchStatus == 0){return;}
      this.setMatchStatus(0);
      this.saveMatchTime({time: this.nowMatchTime, section: this.section});
      clearInterval(this.timer)
    },
    configAdd(type){
      var name = this.$refs.name.value;
      var playerNum = this.$refs.playerNum.value + '';
      if (name && playerNum) {
        this.$refs.addLayer.hide();
        this.$refs.name.value = '';
        this.$refs.playerNum.value = '';
        if (type == 1) {
          var newPlayer = {exist: true, lineUp: true, name: name, num: playerNum};
          this.addPlayerAct(newPlayer)
        } else {
          var newPlayer = {exist: true, lineUp: true, name: name, num: playerNum};
          this.addPlayerAct2(newPlayer)
        }
      }
    },
    timeClick(){
      if (this.section == 1 && !this.nowMatchTime) {
        if (!this.selActive) {
          this.$vux.toast.text('请选择球队开始比赛');
          return;
        } else {
          this.start();
          var itemType = this.selActive.split('-')[0];
          var itemName = this.itemName[itemType - 1]
          this.addOneRec({itemName: itemName, operation: '开始比赛', type: 'start', itemType: itemType})
        }
      } else {
        if (this.matchStatus) {
          this.pause();
        } else {
          this.start();
        }
      }
    },
    addOneRec(rec){
      rec.section=this.section;
      rec.time = this.nowMatchTime;
      rec.matchStartTime = this.matchStartTime;
      this.savOperRec(rec);
    },
    showAddLyer(type){
      this.$refs.addLayer.show(type);
    },
    upData(){
      this.$refs.layer.hide();
      this.$router.push({
        path: '/matchSett'
      })
    },
    goNext(){
      this.$refs.layer.show();
    },
    back(){
      if(window.history.length){
        this.$router.go(-1)
      }else{
        this.$router.push({path: '/matchSett'})
      }
    },
    ...mapMutations({
      'setMatchTime': 'SET_MATCHTIME',
      'setMatchStatus': 'SET_MATCHSTATUS',
    }),
    ...mapActions([
      'addPlayerAct',
      'addPlayerAct2',
      'saveMatchTime',
      'savOperRec'
    ])
  },
  beforeDestroy(){
    this.pause()
  },
}
