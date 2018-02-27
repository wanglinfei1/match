/**
 * Created by wanglinfei on 2017/9/8.
 */
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {filterFn,formatTime,copy} from '@/common/js/util'
import {itemColor, matchLength,sectionArr,operation} from '@/common/js/config'
import {loadStorage,setStorage} from '@/common/js/cache'

export const setOperRecMixin = {
  computed: {
    ...mapGetters([
      'radio1',
      'radio2',
      'itemPlayer1',
      'itemPlayer2',
      'operationRec',//操作记录
      'player_data',//球员数据
      'itemName',//球队名称
      'matchStartTime'//比赛开始时间，年月日时分
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
    /*处理数据*/
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
      backcount:0,
      confirmText:'数据上传成功，是否结束比赛？',
      confimSectionText:'确定进入下一节比赛吗？',
      addText:'',
      timer:null,
      nowMatchTime:'0',
      formatTime:formatTime,
      selActive: '',
      itemColor:itemColor,
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
      'section',
      'matchStatus',
    ])
  },
  created(){
    this.nowMatchTime = this.matchTime[this.section] || 0;
    var length1 = filterFn(this.itemPlayer1,'lineUp',true).length;
    var length2 = filterFn(this.itemPlayer2,'lineUp',true).length;
    if(length1==0||length2==0){
      this.$router.push({path:'/matchSett'})
    }
  },
  methods:{
    changeSection(section){
      if(this.matchStatus == 1){this.pause()}
      this.setSection(section);
      var matchTime = loadStorage('matchTime',{});
      var timeNow = matchTime[this.section];
      if(!timeNow&&timeNow!==0){
        this.nowMatchTime = 0;
        this.addOneRec({section:section-1,time:matchTime[section-1],operation: `比赛结束`, type: 'end'});
        this.addOneRec({operation: '开始比赛', type: 'start'});
      }
      this.nowMatchTime = timeNow || 0;
      this.saveMatchTime(this.section,this.nowMatchTime);
    },
    confimSection(section){
      this.changeSection(section);
      this.$refs.layerSection.hide()
    },
    nextSection(){
      var matchTime = loadStorage('matchTime',{});
      if(!matchTime||!matchTime[1]){
        this.$vux.toast.text('请开始比赛');
        return;
      }
      var section = this.section+1;
      if(section >=4){
        return;
      }else if(section >=3){

      }
      this.confimSectionText='确定进入下一节比赛吗？';
      this.$refs.layerSection.show(section)
    },
    preSection(){
      var section = this.section-1;
      if(section <= 0){
        return;
      }
      this.confimSectionText='确定进入上一节比赛吗？';
      this.$refs.layerSection.show(section)
    },
    start(){
      if(this.timer&&this.matchStatus == 1){return;}
      this.setMatchStatus(1);
      clearInterval(this.timer);
      if (this.nowMatchTime >= matchLength * 60) {
        this.toastShow = true;
        this.toastText = '请进入下节比赛';
        this.setMatchStatus(0);
        return;
      }
      var matchTime = loadStorage('matchTime',{});
      this.nowMatchTime = (matchTime[this.section]) || 0;
      matchTime[this.section]= this.nowMatchTime;
      this.saveMatchTime(this.section,matchTime);
      this.timer = setInterval(() => {
        this.nowMatchTime++;
      }, 1e3)
    },
    pause(){
      if(this.matchStatus == 0){return;}
      this.setMatchStatus(0);
      var matchTime = loadStorage('matchTime',{});
      matchTime[this.section]= this.nowMatchTime||0;
      this.saveMatchTime(this.section,matchTime);
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
          var itemName = this.itemName[itemType - 1];
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
      /*if (this.nowMatchTime >matchLength * 60) {return;}*/
      rec.section=rec.section||this.section;
      rec.time = rec.time||this.nowMatchTime;
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
    toastBack(){
     var _this = this;
      if(this.backcount>0){
        this.back();
        return;
      }
      this.pause();
      this.$vux.toast.text('再次点击退出比赛');
      this.backcount++;
      setTimeout(function () {
        _this.backcount = 0;
      }, 1800);
    },
    ...mapMutations({
      'setMatchTime': 'SET_MATCHTIME',
      'setMatchStatus': 'SET_MATCHSTATUS',
      'setSection':'SET_SECTION'
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
  watch: {
    nowMatchTime(newData,oldData){
      /*if (newData >= matchLength * 60) {
        this.pause();
      }*/
      var matchTime = loadStorage('matchTime',{});
      matchTime[this.section] = Math.floor(this.nowMatchTime);
      setStorage('matchTime', matchTime)
    }
  },
}

export const recMiXin = {
  data() {
    return {
      record:'操作记录',
      showFlag:true,
      rightIcon:'',
      itemColor:itemColor,
      sectionArr: sectionArr,
      operRecTab:['全部','得分','犯规'],
      currentIndex:0,
      formatTime:formatTime,
      scrollToEndFlag:false
    }
  },
  computed: {
    ...mapGetters([
      'radio1',
      'radio2',
      'operationRec',
      'section'
    ]),
    operRec() {
      var operationRec = this.operationRec.slice();
      operationRec.sort(function(n,m){
        return ((m.section -1)*matchLength*60+m.time) - ((n.section -1)*matchLength*60+n.time)
      })
      return operationRec;
    },
    scoreOperRec(){
      var operationRec = this.operationRec;
      var scoreOperRec = [];
      for(var i =0;i<operationRec.length;i++){
        if(operationRec[i].type == 'score'||operationRec[i].type == 'start'||operationRec[i].type == 'end'){
          scoreOperRec.push(operationRec[i])
        }
      }
      scoreOperRec.sort(function(n,m){
        return ((m.section -1)*matchLength*60+m.time) - ((n.section -1)*matchLength*60+n.time)
      })
      return scoreOperRec;
    },
    foulOperRec(){
      var operationRec = this.operationRec;
      var foulOperRec = [];
      for(var i =0;i<operationRec.length;i++){
        if(operationRec[i].type == 'foul'||operationRec[i].type == 'start'||operationRec[i].type == 'end'){
          foulOperRec.push(operationRec[i])
        }
      }
      foulOperRec.sort(function(n,m){
        return ((m.section -1)*matchLength*60+m.time) - ((n.section -1)*matchLength*60+n.time)
      })
      return foulOperRec;
    }
  },
  methods:{
    deleOperRec(item){
      this.deleOneOperRec(item);
    },
    selectItem(item,index){
      this.currentIndex = index;
    },
    ...mapActions([
      'deleOneOperRec'
    ]),
  }
}
