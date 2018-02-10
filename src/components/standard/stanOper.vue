<template>
  <div class="player-details">
    <m-header
      @back="back"
      :title="formatTime(nowMatchTime)"
      :rightIcon="rightIcon"
      titleIcon="true"
      @titleClick="timeClick"
      @goNext="goNext"></m-header>
    <div class="match-head">
      <p class="item1"
         :style="{background:itemColor[radio1].color}"
         :class="{selectActive:selActive == '1-0'}"
         @click="selectActive(1,0)">{{itemName[0]}}</p>
      <p>{{score1}} : {{score2}}</p>
      <p class="item2"
         :style="{background:itemColor[radio2].color}"
         :class="{selectActive:selActive == '2-0'}"
         @click="selectActive(2,0)">{{itemName[1]}}</p>
    </div>
    <div class="itemInfo">
      <div class="list list1">
        <div class="title-in">
          <p class="clearfix">
            <span class="">犯规</span>
            <span >{{foul1}}</span>
          </p>
          <!--<p class="clearfix">
            <span class="floatL">暂停</span>
            <input type="text" value="0" class="floatL" readonly="readonly">
          </p>-->
        </div>
        <div class="title-name">
          <span>犯规</span>
          <span>姓名</span>
          <span>号码</span>
        </div>
        <ul class="playerList">
          <li v-for="(item,index) in itemPlayer1"
              v-if="item.lineUp"
              :class="{selectActive:selActive == '1-'+(index+1)+''}"
              @click="selectActive(1,index+1)"
              :key="index">
            <span class="span1">{{(player_data[item.id]&&player_data[item.id].foul)?player_data[item.id].foul:0}}</span>
            <span class="span2">{{item.name}}</span>
            <span class="span3">{{item.num}}</span>
          </li>
        </ul>
        <div class="addPlyer" @click="showAddLyer(1)">
          <i>+</i>
          <p>添加球员上场</p>
        </div>
      </div>
      <div class="list list2">
        <ul>
          <li class="li1">
            <p class="p1">{{sectionArr[section-1]}}</p>
            <p class="p2">右划进入下一节</p>
          </li>
          <li class="li"
              v-for="(item,index) in operation"
              @click="operationClick(index,item)"
              :key="index">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="list list3">
        <div class="title-in">
          <p class="clearfix">
            <span >犯规</span>
            <span >{{foul2}}</span>
          </p>
          <!--<p class="clearfix">
            <span class="floatL">暂停</span>
            <input type="text" value="0" class="floatL">
          </p>-->
        </div>
        <div class="title-name">
          <span>犯规</span>
          <span>姓名</span>
          <span>号码</span>
        </div>
        <ul class="playerList">
          <li v-for="(item,index) in itemPlayer2"
              v-if="item.lineUp"
              :class="{selectActive:selActive == '2-'+(index+1)+''}"
              @click="selectActive(2,index+1)"
              :key="index">
            <span class="span1">{{(player_data[item.id]&&player_data[item.id].foul)?player_data[item.id].foul:0}}</span>
            <span class="span2">{{item.name}}</span>
            <span class="span3">{{item.num}}</span>
          </li>
        </ul>
        <div class="addPlyer" @click="showAddLyer(2)">
          <i>+</i>
          <p>添加球员上场</p>
        </div>
      </div>
    </div>
    <div class="operation" @click="showOperRec">
      <div>
        <p v-if="operRecLast">{{formatTime(operRecLast.time||0)}}  {{operRecLast.itemName}} {{operRecLast.num?operRecLast.num+'号':''}} {{operRecLast.name}}</p>
        <p v-if="operRecLast">{{operRecLast.operation}}</p>
      </div>
      <i class="iconfont icon-shanchu"></i>
    </div>
    <!--<major-rec ref="recDet"></major-rec>-->
    <router-view></router-view>
    <toast v-model="toastShow" type="text" :text="toastText"></toast>
    <el-layer ref="layer" @confirm="upData" :text="confirmText" confirmBtnText="确定"></el-layer>
    <el-layer ref="addLayer" @confirm="configAdd" :text="addText" confirmBtnText="确定">
      <p class="layerSlot">
        <input type="text" ref="name" placeholder="名称">
        <input type="number" ref="playerNum" placeholder="球员号码">
      </p>
    </el-layer>
  </div>
</template>
<script>
  import OperRec from './operRec.vue'
  import MajorRec from '../major/majorRec.vue'
  import {itemColor, matchLength,sectionArr,operation2} from '../../common/js/config'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import MHeader from '../../base/m-header/m-header'
  import ElLayer from '../../base/elLayer/elLayer.vue'
  import {formatTime,filterFn} from '../../common/js/util'
  import {setStorage} from '../../common/js/cache'
  import {setOperRecMixin,operMixin} from '../../common/js/mixin'
  import {Toast} from 'vux'
  export default {
    mixins: [setOperRecMixin,operMixin],
    data() {
      return {
        rightIcon:true,
        operation:operation2,
      }
    },
    created() {},
    mounted(){},
    methods: {
      selectActive(itemType,inex){
        this.selActive =`${itemType}-${inex}`
      },
      operationClick(index,item){
        if (this.section == 1 && !this.nowMatchTime) {
          this.toastShow = true;
          this.toastText = '请选择球队开始比赛';
          return;
        }
        if (!this.selActive) {
          this.toastShow = true;
          this.toastText = '请选择球员';
          return;
        }
        if (index == 4) {this.pause();} else {this.start();}
        var itemType = this.selActive.split('-')||0;
        var itemName = this.itemName[itemType[0] - 1]||0;
        var name = '',num = '',playerId ='';
        if (itemType[1] > 0) {
          var itemPlayer1 = this.itemPlayer1[itemType[1] - 1];
          var itemPlayer2 = this.itemPlayer2[itemType[1] - 1];
          name = itemType[0] == 1 ? itemPlayer1.name : itemPlayer2.name;
          num = itemType[0] == 1 ? itemPlayer1.num : itemPlayer2.num;
          playerId = itemType[0] == 1 ? itemPlayer1.id : itemPlayer2.id;
        }
        this.addOneRec({
          itemType: itemType[0],
          name: name,
          playerId:playerId,
          itemName: itemName,
          num: num,
          score: item.score,
          foul: item.foul,
          operation: item.name,
          type: item.type,
          pause:item.pause
        })
      },
      showOperRec(){
        this.selActive='';
        //this.$refs.recDet.show();
        this.$router.push({path:'/matchSett/standard/operRec'})
      },
    },
    components: {
      MHeader,
      ElLayer,
      Toast,
      MajorRec
    }
  }
</script>
<style scoped>
  .player-details .selectActive{
    background: #cecece!important;
  }
  .layerSlot{
    display: flex;
    text-align: center;
    justify-content:space-between;
    align-items: center;
  }
  .layerSlot input{
    width:50%;
    border:1px solid #ccc;
    padding:0 4px;
    box-sizing: border-box;
    height:30px;
    margin:6px 5px;
  }
  .operation{
    height:60px;
    background: #eee;
    display: flex;
  }
  .operation div{
    flex:1;
    font-size: 14px;
    color:#666;
    flex-direction: column;
    display: flex;
    padding-left:0.3rem;
    line-height: 22px;
    justify-content: center;
    align-items: left;
  }
  .operation i{
    width:68px;
    font-size:24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .addPlyer{
    margin-left:10px;
    display: flex;
    line-height:45px;
    color:#999; font-size: 12px;
  }
  .addPlyer i{
    text-align: center;
    width:30px;
    display: inline-block;
  }
  .list2 li{
    color:#fff;
    background: #ff8201;
    height:44px;
    font-size: 14px;
    border-bottom:1px solid #fff;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
  }
  .list2 .li1{
    height:74px;
    flex-direction: column;
  }
  .list2 .li1 .p2{
    margin-top:8px;
    font-size: 12px;
  }
  .playerList li{
    margin:0 10px;
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    color:#999;
    border-bottom: 1px solid #e6e6e6;
    height:34px;
  }
  .playerList li span{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .playerList li .span1{
    flex:1;
  }
  .playerList li .span2{
    flex:2; color:#333333;
    font-weight: 500; font-size: 14px;
  }
  .playerList li .span3{
    flex:1;color:#ff6501;
  }
  .title-name{
    display: flex;
    margin:0 10px;
    justify-content: center;
    align-items: center;
    height:32px;
    border-bottom: 1px solid #e6e6e6;
  }
  .title-name span{
    font-size: 12px;
    color:#999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title-name span:nth-of-type(1){
    flex:1
  }
  .title-name span:nth-of-type(2){
    flex:2
  }
  .title-name span:nth-of-type(3){
    flex:1
  }
  .title-in{
    display: flex;
    height:52px;
    justify-content: center;
    align-items: center;
    background: #eeeeee;
  }
  .title-in p{
    flex:1; justify-content: center;
    align-items: center;
    display: flex;
    color:#333;
  }
  .title-in p span{
    background:#fff;
    font-size: 12px;
    width:0.98rem;
    height:31px;
    line-height: 31px;
    border:1px solid #e6e6e6;
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
  }
  .title-in p span:nth-of-type(2){
    margin-left: -1px;
  }
  .match-head{
    display: flex;
  }
  .match-head p{
    flex: 1;
    text-align: center;
    line-height:47px;
    font-size: 14px;
    font-weight: 500;
    color:#333333;
  }
  .match-head p:nth-of-type(2){
    font-size: 18px;
  }
  .match-head .item1,.match-head .item2{
    color:#fff;
  }
  .itemInfo{
    display: flex;
  }
  .itemInfo .list{
    flex: 1;
  }
  .player-details{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    overflow-y: auto;
  }
</style>
