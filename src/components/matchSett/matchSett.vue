<template>
  <div class="matchSett">
        <m-header
          @goNext="goNext"
          :rightText = "rightText"></m-header>
        <switches :switches="switches" @select="selectItem"
                  :currentIndex="currentIndex"></switches>
        <div class="list">
          <div class="setting" :class="{active: currentIndex == 0}">
            <ul>
              <li @click="dataLayerShow"><p>比赛时间</p><span>{{matchStartTime}}</span></li>
              <li><p>比赛地点</p><input type="text"  v-model="address"></li>
              <li @click="operTypeShow"><p>统计模式</p><span>{{operType==1?'标准版':'专业版'}}</span></li>
            </ul>
            <el-layer ref="dataLayer"
                      @confirm="setNowTime"
                      :NoPadd="NoPadd">
              <div class="dataLayer">
                <group>
                  <datetime-view ref="datetime" :format="format" v-model="nowTime"></datetime-view>
                </group>
              </div>
            </el-layer>
            <el-layer ref="operType" :layerType="layerType" :NoPadd="NoPadd">
              <div class="layerSlot">
                <p class="p1" :class="{active:operType==1}" @click="changeOperType(1)">标准版</p>
                <p :class="{active:operType==2}" @click="changeOperType(2)">专业版</p>
              </div>
            </el-layer>
          </div>
          <div class="item1" :class="{active: currentIndex == 1}">
            <itemSet :Players="itemPlayer1"
                     :radio="radio1"
                     :itemType="itemType1"
                     @changeExit="changeExit"
                     @delePlayer="delePlayer"
                     @changeRadio="changeRadio"
                     @inputChange="inputChange"
                     @changeLineUp="changeLineUp"
                     @waiverFn="waiverFn"
                     @addPlayer="addPlayer"></itemSet>
          </div>
          <div class="item2" :class="{active: currentIndex == 2}">
            <itemSet :Players="itemPlayer2"
                     :radio="radio2"
                     :itemType="itemType2"
                     @changeRadio="changeRadio"
                     @changeExit="changeExit"
                     @changeLineUp="changeLineUp"
                     @inputChange="inputChange"
                     @delePlayer="delePlayer"
                     @waiverFn="waiverFn"
                     @addPlayer="addPlayer"></itemSet>
          </div>
        </div>
        <router-view></router-view>
  </div>
</template>

<script>
  import MHeader from '../../base/m-header/m-header'
  import Switches from '../../base/switches/switches.vue'
  import ElLayer from '../../base/elLayer/elLayer.vue'
  import { DatetimeView,Group } from 'vux'
  import itemSet from './itemSet'
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import Player from '../../common/js/player'
  import {copy,formatDate,filterFn,debounce} from  '../../common/js/util'
  import {data} from '../../common/js/data'
  import {loadStorage,setStorage} from '../../common/js/cache'
  import {setOperRecMixin} from '../../common/js/mixin'
  export default {
    mixins: [setOperRecMixin],
    data () {
      return {
        rightText :'录入',
        operType:2,//1为标准版，2为专业版
        NoPadd:true,
        layerType:false,
        format:'YYYY-MM-DD HH:mm',
        nowTime:'',
        currentIndex:0, //tab当前选项
        itemType1:1, //球队类型，球队1
        itemType2:2, //球队类型，球队2
        address:data.address
      }
    },
    computed: {
      ...mapGetters([]),
      switches(){
        return ["比赛设置",this.itemName[0],this.itemName[1]]
      },
    },
    created(){
      var itemPlayer1 = loadStorage('itemPlayer1',[]);
      var itemPlayer2 = loadStorage('itemPlayer2',[]);
      var matchTime =loadStorage('matchTime','')||data.matchTime;
      var section = loadStorage('section')||data.section||1;
      var operationRec = loadStorage('operationRec',[]);
      var matchStartTime = loadStorage('matchStartTime','')||data.matchStartTime||formatDate(new Date(),'YYYY-MM-DD hh:mm');;
      if(!itemPlayer1.length){
        setStorage('itemPlayer1',data.itemPlayer1)
        var player1=data.itemPlayer1;
      }else{
        var player1=itemPlayer1;
      }
      if(!itemPlayer2.length){
        setStorage('itemPlayer2',data.itemPlayer2)
        var player2=data.itemPlayer2;
      }else{
        var player2=itemPlayer2;
      }
      this.setItemPlayer1(player1);
      this.setItemPlayer2(player2);
      this.setRadio({radio:loadStorage('radio1','')||data.radio1,itemType:1});
      this.setRadio({radio:loadStorage('radio2','')||data.radio2,itemType:2});
      this.saveMatchTime(matchTime);
      this.setOperRec(operationRec);
      this.setItemName(data.itemName)
      this.setMatchStartTime(matchStartTime)
      this.setSection(section)
    },
    mounted(){
      this.$watch('address',debounce(function(newVal){
        console.log(newVal)
      },800))
    },
    methods:{
      waiverFn(itemType){
        console.log(itemType+'弃权')
      },
      changeRadio(item,index,itemType){
        this.setRadio({radio:index,itemType:itemType})
      },
      dataLayerShow(){
        this.nowTime=this.matchStartTime;
        this.$refs.dataLayer.show();
        this.$refs.datetime.render()
      },
      setNowTime(){
        this.setMatchStartTime(this.nowTime);
        this.$refs.dataLayer.hide();
      },
      operTypeShow(){
        this.$refs.operType.show();
      },
      changeOperType(type){
        this.operType = type;
        this.$refs.operType.hide();
      },
      inputChange(item,type,val,itemType){
        if(!val){this.$vux.toast.text('内容不能为空');return;}
        var newIem =copy(item);
        newIem[type] = val;
        this.changeItem({player:newIem,itemType:itemType})
      },
      goNext(){
        var length1 = filterFn(this.itemPlayer1,'lineUp',true).length;
        var length2 = filterFn(this.itemPlayer2,'lineUp',true).length;
        if(!length1||!length2){
          this.$vux.toast.text('请选择首发球员');
          return;
        }else if(length1<3||length2<3){
          this.$vux.toast.text('球队首发球员不满3人');
          return;
        }
        if(this.operType == 1){
          this.$router.push({
            path: `/matchSett/standard`
          })
        }else{
          this.$router.push({
            path: `/matchSett/major`
          })
        }
      },
      delePlayer(item,itemType){
        if(this.player_data[item.id]){
          this.$vux.toast.text('该球员有数据不能删除！');return;
        }
        this.deleItem({player:item,itemType:itemType})
      },
      changeExit(item,itemType){
        var newIem =copy(item)
        var Boolean = newIem.exist
        if(Boolean){newIem.lineUp = false;}
        newIem.exist = !Boolean
        this.changeItem({player:newIem,itemType:itemType})
      },
      changeLineUp(item,itemType){
        var newIem =copy(item)
        var Boolean = newIem.lineUp
        if(!Boolean){newIem.exist = true;}
        newIem.lineUp = !Boolean;
        this.changeItem({player:newIem,itemType:itemType})
      },
      selectItem(item, index) {
        this.currentIndex = index;
      },
      addPlayer(name,playerNum,itemType){
        if(itemType==this.itemType1){
          var newPlayer = {exist:true,lineUp:false,name:name,num:playerNum};
          this.addPlayerAct(newPlayer)
        }else{
          var newPlayer = {exist:true,lineUp:false,name:name,num:playerNum};
          this.addPlayerAct2(newPlayer)
        }
      },
      ...mapMutations({
        'setItemPlayer1': 'SET_ITEMPLAYER1',
        'setItemPlayer2': 'SET_ITEMPLAYER2',
        'setRadio':'SET_RADIO',
        'setOperRec':'SET_OPERREC',
        'setItemName':'SET_ITEMNAME',
        'setMatchStartTime':'SET_MATCH_START_TIME',
        'setSection':'SET_SECTION'
      }),
      ...mapActions([
        'addPlayerAct',
        'addPlayerAct2',
        'changeItem',
        'deleItem',
        'saveMatchTime',
        'savOperRec'
      ])
    },
    components: {
      MHeader,
      itemSet,
      Switches,
      ElLayer,
      DatetimeView,
      Group
    }
  }
</script>
<style scoped>
  .dataLayer{
    height:96px;
    overflow-y: hidden;
    position: relative;
  }
  .layerSlot p{
    line-height:40px;
  }
  .layerSlot p.active{
    background:#eee;
    border-radius: 10px;
  }
  .list>div{
    display: none;
  }
  .list .active{
    display: block;
  }
  .setting ul li{
    display: flex;
    font-size:14px;
    justify-content:space-between;
    line-height:40px;
    border-bottom:1px solid #e6e6e6;
    margin:0 0.14rem;
  }
  .setting ul li p{
    color:#333333;
  }
  .setting ul li span {
    color:#999;
  }
  .setting ul li input {
    color:#999;
    border:none;
    width:50%;
    text-align: right;
  }
  .matchSett{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    overflow-y: auto;
  }
</style>
