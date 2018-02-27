<template>
  <div class="major-details" @click.stop="hideDataDet">
    <div class="screen-y screen-x" ref="changeScr">
      <div class="majorContent">
        <!--<span class="iconfont back icon-fanhui" @click="back"></span>-->
        <div class="itemInfo">
          <div class="list list1">
            <p class="item1" @click="selectActive(1,0)"
               :style="{background:itemColor[radio1].color}"
               :class="{selectActive:selActive == '1-0'}">{{itemName[0]}}</p>
            <div class="list-title">
              <div class="title-in">
                <p class="clearfix">
                  <span class="floatL">犯规</span>
                  <span class="floatL">{{foul1}}</span>
                  <!--<input type="text" :value="foul1" class="floatL" readonly="readonly">-->
                </p>
                <p class="clearfix">
                  <span class="floatL">暂停</span>
                  <span class="floatL">{{pauseNum1}}</span>
                  <!--<input type="text" :value="pauseNum1" class="floatL" readonly="readonly">-->
                </p>
              </div>
              <div class="title-name">
                <span>犯规</span>
                <span>姓名</span>
                <span>号码</span>
              </div>
            </div>
            <div class="playDown">
              <div class="playerList">
                <ul>
                  <li v-for="(item,index) in itemPlayer1"
                      v-if="item.lineUp"
                      :class="{selectActive:selActive == '1-'+(index+1)+''}"
                      @click.prevent="selectActive(1,index+1)"
                      v-longtap="{fn:showDataDet,it:item,name:'longTab',index:'1-'+(index+1)+''}"
                      :player_id="item.id"
                      :key="index">
                    <span class="span1">{{(player_data[item.id]&&player_data[item.id].foul)?player_data[item.id].foul:0}}</span>
                    <span class="span2">{{item.name}}</span>
                    <span class="span3">{{item.num}}</span>
                  </li>
                </ul>
              </div>
              <div class="addPlyer" @click="showAddLyer(1)">
                <i>+</i>
                <p>添加球员上场</p>
              </div>
            </div>
          </div>
          <div class="list list2">
            <ul>
              <li class="li1">
                <span class="bgColor">{{score1}}</span>
                <span @click.prevent="timeClick">{{formatTime(nowMatchTime)}}</span>
                <span>{{sectionArr[section-1]}}</span>
                <span class="bgColor">{{score2}}</span>
              </li>
              <li v-for="(item,index) in operation"
                  v-if="item.length==4"
                  class="li'+(index+2)+'" :key="index">
                <span v-if="index==2"
                      class="bgRed"
                      v-longtap="{fn:vuetapFoul,name:'longTab'}"
                      v-tap="{fn:vuetapFoul,name:'tap',index:index,i:0,it:item[0]}">
                  <i class="iCenter">犯规</i>
                  <i class="iCenter iTitle">长按选择其他犯规</i>
                </span>
                <span v-for="(it,i) in item"
                      v-if="index==2&&i!=0"
                      :class="{bgRed:i==1}"
                      @click.prevent="operationClick(index,i,it)"
                      :key="i">{{it.name}}</span>
                <span v-for="(it,i) in item"
                      v-if="index!=2"
                      :class="{bgRed:index==1&&i==3}"
                      @click.prevent="operationClick(index,i,it)"
                      :key="i">{{it.name}}</span>
                <div class="liFoul" v-if="index==2" v-show="liFoul" ref="liFoul">
                  <b @click.prevent="liFoulHide">返回</b>
                  <b @click.prevent="operationClick(2,0,itDet)" v-for="itDet in item[0].foulDet">{{itDet.name}}</b>
                </div>
              </li>
              <li v-for="(item,index) in operation"
                  v-if="item.length==2"
                  class="li5" :key="index">
                <span class="bgRed"
                  v-longtap="{fn:vuetap,name:'longTab'}"
                  v-tap="{fn:vuetap,name:'tap',index:index,i:0,it:item[0]}">
                  <i class="iCenter">{{item[0].name}}</i>
                  <i class="iCenter iTitle">长按选择暂停时间</i>
                </span>
                <div class="operation" @click="showOperRec">
                  <div>
                    <p v-show="operRecLast">{{operRecLast.itemName}} {{operRecLast.name}}
                      {{operRecLast.num?operRecLast.num+'号':''}} </p>
                    <p v-show="operRecLast">{{operRecLast.operation}}</p>
                  </div>
                  <b>
                    <i class="i1">{{formatTime(operRecLast.time||0)}}</i>
                    <i></i>
                  </b>
                </div>
                <span @click.prevent="operationClick(index,1,item[1])">{{item[1].name}}</span>
                <div class="liFoul" v-show="liPause" ref="liPause">
                  <b @click.prevent="liPauseHide">返回</b>
                  <b v-for="itDet in item[0].pauseDet"
                     @click.prevent="operationClick(index,0,itDet)">{{itDet.time}}</b>
                </div>
              </li>
            </ul>
          </div>
          <div class="list list3">
            <p class="item2" @click.stop="selectActive(2,0)"
               :style="{background:itemColor[radio2].color}"
               :class="{selectActive:selActive == '2-0'}">{{itemName[1]}}
              <i class="goNext" @click.stop="goNext"></i>
            </p>
            <div class="list-title">
              <div class="title-in">
                <p class="clearfix">
                  <span class="floatL">犯规</span>
                  <span class="floatL">{{foul2}}</span>
                </p>
                <p class="clearfix">
                  <span class="floatL">暂停</span>
                  <span class="floatL">{{pauseNum2}}</span>
                </p>
              </div>
              <div class="title-name">
                <span>号码</span>
                <span>姓名</span>
                <span>犯规</span>
              </div>
            </div>
            <div class="playDown">
              <div class="playerList" v-if="itemPlayer2.length">
                <ul>
                  <li v-for="(item,index) in itemPlayer2"
                      v-if="item.lineUp"
                      :class="{selectActive:selActive == '2-'+(index+1)+''}"
                      @click.prevent="selectActive(2,index+1)"
                      v-longtap="{fn:showDataDet,name:'longTab',it:item,index:'2-'+(index+1)+''}"
                      :player_id="item.id"
                      :key="index">
                    <span class="span3">{{item.num}}</span>
                    <span class="span2">{{item.name}}</span>
                    <span class="span1">{{(player_data[item.id]&&player_data[item.id].foul)?player_data[item.id].foul:0}}</span>
                  </li>
                </ul>
              </div>
              <div class="addPlyer" @click="showAddLyer(2)">
                <i>+</i>
                <p>添加球员上场</p>
              </div>
            </div>
          </div>
        </div>
        <!---->
      </div>
      <!--<major-rec ref="recDet"></major-rec>-->
      <router-view></router-view>
      <data-layer ref="dataLayer"></data-layer>
      <toast v-model="toastShow" type="text" :text="toastText"></toast>
      <el-layer ref="layer" @confirm="upData" :text="confirmText" confirmBtnText="立即结束"></el-layer>
      <el-layer ref="layerSection" @confirm="confimSection" :text="confimSectionText" confirmBtnText="确定"></el-layer>
    </div>
    <el-layer ref="addLayer" @confirm="configAdd" :text="addText" confirmBtnText="确定">
      <p class="layerSlot">
        <input type="text" ref="name" placeholder="名称">
        <input type="number" ref="playerNum" placeholder="球员号码">
      </p>
    </el-layer>
  </div>
</template>
<script>
  import {itemColor, matchLength,sectionArr,operation} from '@/common/js/config'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import MHeader from '@/base/m-header/m-header'
  import ElLayer from '@/base/elLayer/elLayer.vue'
  import DataLayer from '@/base/elLayer/dataLayer.vue'
  import MajorRec from './majorRec.vue'
  import {formatTime,filterFn,copy} from '@/common/js/util'
  import {addClass, removeClass} from '@/common/js/dom'
  import {setOperRecMixin,operMixin} from '@/common/js/mixin'
  import {Toast} from 'vux'
  export default {
    mixins: [setOperRecMixin,operMixin],
    data() {
      return {
        headTitle: '',
        liFoul:false,
        liPause:false,
        isShow:'',
        operation: operation,
        pauseNum1: 0,
        pauseNum2: 0,
        score1: 0,
        score2: 0,
      }
    },
    mounted() {
      var _this = this;
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        _this.orientationFun();
      }, false);
      _this.orientationFun();
    },
    methods: {
      orientationFun() {
        var _this = this;
        var _width = screen.width;
        var _height = screen.height;
        if (window.orientation == 180 || window.orientation == 0||_height>_width) {
          addClass(_this.$refs.changeScr, 'changeScr')
          removeClass(_this.$refs.changeScr, 'changeHcr')
          if(_this.$refs.changeScr){
            _this.$refs.changeScr.style = `width:${_height}px; height:${_width}px;transform-origin:center center;
            transform:rotate(90deg) translate(${(_height-_width)/2}px,${(_height-_width)/2}px);`;
          }
          setTimeout(() => {
            var htmlWidth = document.body.offsetWidth;
            var htmlHeight = document.body.offsetHeight;
            if(_this.$refs.changeScr){
              _this.$refs.changeScr.style = `width:${htmlHeight}px; height:${_width}px;transform-origin:center center;
            transform:rotate(90deg) translate(${(htmlHeight-_width)/2}px,${(htmlHeight-_width)/2}px);`;
            }
          },100)
        }
        if (window.orientation == 90 || window.orientation == -90||_height<_width) {
          removeClass(_this.$refs.changeScr, 'changeScr')
          addClass(_this.$refs.changeScr, 'changeHcr')
          if(_this.$refs.changeScr){
            _this.$refs.changeScr.style = `width:${_width}px; height:${_height}px;`;
          }
          setTimeout(() => {
            var htmlWidth = document.body.offsetWidth;
            var htmlHeight = document.body.offsetHeight;
            if(_this.$refs.changeScr){
              _this.$refs.changeScr.style = `width:${_width}px; height:${htmlHeight}px;`;
            }
          },100)
        }
      },
      vuetap(s){
        if(s.name=='longTab'){
          this.liPause=true;
        }else{
          this.operationClick(s.index,s.i,s.it)
        }
      },
      vuetapFoul(s){
        if(s.name=='longTab'){
          this.liFoul=true;
          return false;
        }else{
          this.operationClick(s.index,s.i,s.it)
        }
      },
      liFoulHide(){
        this.liFoul=false;
      },
      liPauseHide(){
        this.liPause=false;
      },
      selectActive(itemType, inex){
        this.isShow = '';
        this.selActive = `${itemType}-${inex}`
      },
      showDataDet(s,ev){
        /*this.isShow = s.index;*/
        //this.$refs.dataLayer.show(s,ev);
      },
      hideDataDet(){
        this.isShow = '';
      },
      showOperRec(){
        this.selActive='';
        //this.$refs.recDet.show();
        this.$router.push({path:'/matchSett/major/majorRec'})
      },
      operationClick(index, i, item){
        this.liPause = false;
        this.liFoul = false;
        if(this.isShow){return;}
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
        if (index == 3 && i == 0) {
          if(this.matchStatus==0){
            this.toastShow = true;
            this.toastText = '比赛已暂停';
            return;
          }
          this.pause();
        } else {this.start();}
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
    },

    components: {
      MHeader,
      ElLayer,
      MajorRec,
      Toast,
      DataLayer
    }
  }
</script>
<style scoped>
  .major-details .selectActive {
    background: #cecece !important;
  }

  .majorContent .back {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    font-size: 20px;
    color: #fff;
    line-height: 50px;
    width: 30px;
    text-align: center;
  }

  .majorContent .goNext {
    position: absolute;
    top: 50%;
    right: 15px;
    z-index: 10;
    width:20px;
    height:20px;
    margin-top:-10px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background: url("../../common/image/bofang.png") no-repeat;
    background-size: contain;
  }

  .majorContent {
    height: 100%;
    background: #fff;
    position: relative;
    z-index: 1;
  }

  .fixHead {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .layerSlot {
    display: flex;
    text-align: center;
    justify-content: space-between;
    margin: 0 auto;
  }

  .layerSlot input {
    padding: 3px;
    width:50%;
    border: 1px solid #ccc;
    margin:0 8px;
    line-height: 24px;
  }

  .major-details .operation {
    height: 100%;
    background: #fff;
    margin-right: 3px;
    padding-left:3px;
    box-sizing: border-box;
    display: flex;
    flex: 2;
  }

  .major-details .operation div {
    flex: 1;
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    line-height: 2;
    padding-left:5px;
    box-sizing: border-box;
  }
  .major-details .operation b{
    width:60px; display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
    align-items: flex-end;
    padding-right: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color:#666666;
    line-height: 2;
  }
  .major-details .operation b i:nth-of-type(2){
    width:16px; height:16px;
    background: url("../../common/image/delete.png") no-repeat;
    background-size: contain;
    margin:6px 0;
  }
  .playDown{
    background: #fff;
    height:67.5%;
    display: flex;
    flex-direction: column;
  }

  .major-details .addPlyer {
    display: flex;
    height:17.7%;
    color: #666;
    font-size: 13px;
    box-sizing: border-box;
    border-top:1px solid #e6e6e6;
    border-bottom:1px solid #e6e6e6;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
    background: #fff;
    margin-top:-1px;
    margin-left:5px;
    margin-right:7px;
  }
  .list3 .addPlyer{
    margin-left:7px;
    margin-right:5px;
  }
  .major-details .addPlyer p {
    overflow: hidden;
    white-space: nowrap;
  }

  .major-details .addPlyer i {
    text-align: center;
    width: 15px;
    display: inline-block;
  }
  .major-details .playerList{
    max-height:79.25%;overflow: auto;
  }
  .major-details .playerList li {
    height:40px;
    position: relative;
    display: flex;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: #999;
    margin-left: 5px;
    margin-right:7px;
    border-bottom: 1px solid #e6e6e6;
  }
  .major-details .list3 .playerList li{
    margin-right:5px;
    margin-left:7px;
    display:flex;
    text-align: center;
  }
  .major-details .playerList li span{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .major-details .playerList li .span1 {
    flex:1;  color:#999;
  }
  .major-details .playerList li .span2 {
    flex: 2;font-size: 15px; color:#333;
    font-weight: 600;
  }
  .major-details .playerList li .span3 {
    flex: 1;color:#ff6600;
  }

  .major-details .title-name {
    display: flex; height:41.3%;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding-left:3px;
    padding-right:3px;
  }
  .list3 .title-name{
    padding-left:3px; padding-right:3px;
  }
  .major-details .title-name span {
    text-align: center;
    font-size: 12px;
    display: inline-block;
    color: #999;
  }
  .major-details .title-name span:nth-of-type(1){
    flex: 1;
  }
  .major-details .title-name span:nth-of-type(2){
    flex: 2;
  }
  .major-details .title-name span:nth-of-type(3){
    flex: 1;
  }
  .major-details .title-in {
    display: flex;
    height:58.7%;
    justify-content: center;
    align-items: center;
  }

  .major-details .title-in p {
    flex:1; display: flex;
    justify-content: center;
    box-sizing: border-box;
    margin:0 2px;
    align-items: center;
  }
  .major-details .title-in input,.major-details .title-in p span {
    background: #fff;
    font-size: 12px;
    width: 50%;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    line-height: 21px;
    text-align: center;
    display: inline-block;
    color: #999999;
    border: 1px solid #e6e6e6;
  }
  .major-details .title-in p span:nth-of-type(2){
    margin-left: -1px;color:#333;
  }
  .major-details .list-title {
    height:19.2%;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }
  .major-details {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    overflow: hidden;
  }
  .major-details .itemInfo {
    display: flex; width:100%;
    height:100%; background: #eeeeee;
  }

  .major-details .itemInfo .list2 {
    flex: 1; height: 99%;
    padding-top:3px; box-sizing: border-box;;
    display: flex;
  }
  .major-details .list2 ul {
    display: flex;
    margin-left:3px;
    /*margin-right:3px;*/
    box-sizing: border-box;
    width: 100%;
    flex-direction: column;
  }
  .major-details .list2 ul li {
    position: relative;
    height:20%;
    margin-bottom:3px;
    box-sizing: border-box;
    display: flex;
  }
  .major-details .itemInfo .list1, .itemInfo .list3 {
    width: 18.67%;
  }
  p.item1, p.item2 {
    margin-top:3px; box-sizing: border-box;
    height:13.3%; position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: relative;
    z-index: 1; font-size: 15px; font-weight: bold;
  }

  .bgRed {
    background: #dd0000;
  }

  .bgBlue {
    background: #3174c6;
  }
  .liFoul{
    position: absolute;
    display: flex;
    top:0; left:0;
    width:100%; height:100%;
    justify-content: center;
  }
  .liFoul{
    background: #fff;
  }
  .liFoul b{
    flex: 1;
    color:#fff;
    justify-content: center;
    font-weight: normal;
    display: flex;
    font-size: 15px;
    align-items: center;
    background: #ffba00;
    text-align: center;
    border-right:3px solid #fff;
  }
  .liFoul b:hover{

  }
  .major-details .list2 ul .li5 {
    border-bottom: none;
    position: relative;
  }
  .major-details .list2 ul li span {
    font-family: 'SourceHanSansCN';
    margin-right:3px;
    flex: 1;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background: #ff9000;
    flex-direction: column;
    color: #fff;
    font-size: 15px;
  }
  .iTitle{
    font-size: 10px;
    margin-top:10px;
  }
  .major-details .list2 ul li span:active{

  }
  .major-details .list2 ul li span.bgRed{
    background: #ffba00;
  }
  .major-details .list2 ul li span.bgRed:active{

  }
  .major-details .list2 ul li span.bgColor {
    background: #fff;
    color: #333333; font-size: 20px;
    font-weight: bold;
    font-family: 'PingFang SC';
    border:1px solid #ff8201;
    box-sizing: border-box;
  }

</style>
