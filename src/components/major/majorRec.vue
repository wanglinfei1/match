<template>
  <transition name="slide">
    <div class="operRec-details" v-if="showFlag" ref="operdetails">
      <!--<m-header
        @back="back"
        class="record"
        :title="record"
        :rightIcon="rightIcon"></m-header>-->
      <div @click="back" class="back"><i></i></div>
      <switches :switches="operRecTab"
                @select="selectItem"
                swHeight="41px"
                :currentIndex="currentIndex"></switches>
      <div class="recordList" ref="recordList">
        <div :data="operRec" :scrollToEndFlag="scrollToEndFlag"
                class="scroll" ref="scroll1" v-if="currentIndex == 0">
          <ul class="recList1">
            <li v-for = "(item,index) in operRec"
                :style="{color:item.itemType&&(item.itemType == 1?itemColor[radio1].color:itemColor[radio2].color)}"
                :key="index">
              <p class="time">
                <span>{{sectionArr[(item.section||1)-1]}}</span>
                <span>{{formatTime(item.time)}}</span>
              </p>
              <p>{{item.itemName}}</p>
              <p class="name"><span>{{item.num?`${item.num}号`:''}}</span>  <span>{{item.name}}</span></p>
              <p>{{item.operation}}</p>
              <i class="del" v-if="item.type == 'start'"></i>
              <i class="iconfont icon-shanchu del"
                 @click ="deleOperRec(item)"
                 v-else="item.type == 'start'"></i>
            </li>
          </ul>
        </div>
        <div :data="scoreOperRec" :scrollToEndFlag="scrollToEndFlag"
                class="scroll" ref="scroll2"  v-if="currentIndex == 1">
          <ul class="recList2">
            <li v-for = "(item,index) in scoreOperRec"
                v-if="item.type === 'score'"
                :style="{color:item.itemType&&(item.itemType == 1?itemColor[radio1].color:itemColor[radio2].color)}"
                :key="index">
              <p class="time">
                <span>{{sectionArr[(item.section||1)-1]}}</span>
                <span>{{formatTime(item.time)}}</span>
              </p>
              <p>{{item.itemName}}</p>
              <p class="name"><span>{{item.num?`${item.num}号`:''}}</span>  <span>{{item.name}}</span></p>
              <p>{{item.operation}}</p>
              <i class="del" v-if="item.type == 'start'"></i>
              <i class="iconfont icon-shanchu del"
                 @click ="deleOperRec(item)"
                 v-else="item.type == 'start'"></i>
            </li>
          </ul>
        </div>
        <div :data="foulOperRec" :scrollToEndFlag="scrollToEndFlag"
                class="scroll" ref="scroll3" v-if="currentIndex == 2">
          <ul class="recList3">
              <li v-for = "(item,index) in foulOperRec"
                  v-if="item.type === 'foul'"
                  :style="{color:item.itemType&&(item.itemType == 1?itemColor[radio1].color:itemColor[radio2].color)}"
                  :key="index">
                <p class="time">
                  <span>{{sectionArr[(item.section||1)-1]}}</span>
                  <span>{{formatTime(item.time)}}</span>
                </p>
                <p>{{item.itemName}}</p>
                <p class="name"><span>{{item.num?`${item.num}号`:''}}</span>  <span>{{item.name}}</span></p>
                <p>{{item.operation}}</p>
                <i class="del" v-if="item.type == 'start'"></i>
                <i class="iconfont icon-shanchu del"
                   @click ="deleOperRec(item)"
                   v-else="item.type == 'start'"></i>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import Scroll from '../../base/scroll/scroll.vue'
  import MHeader from '../../base/m-header/m-header'
  import ElLayer from '../../base/elLayer/elLayer.vue'
  import Switches from '../../base/switches/switches.vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {formatTime} from '../../common/js/util'
  import {itemColor,sectionArr,matchLength} from '../../common/js/config'
  export default {
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
        'operationRec'
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
          if(operationRec[i].type == 'score'){
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
          if(operationRec[i].type == 'foul'){
            foulOperRec.push(operationRec[i])
          }
        }
        foulOperRec.sort(function(n,m){
          return ((m.section -1)*matchLength*60+m.time) - ((n.section -1)*matchLength*60+n.time)
        })
        return foulOperRec;
      }
    },
    created() {},
    mounted(){
    },
    methods: {
      deleOperRec(item){
        this.deleOneOperRec(item);
      },
      selectItem(item,index){
        this.currentIndex = index;
      },
      back(){
        if(window.history.length){
          this.$router.go(-1)
        }else{
          this.$router.push({path:'/matchSett/major'})
        }
      },
      ...mapActions([
          'deleOneOperRec'
      ]),
    },
    components: {
      MHeader,
      Switches,
      Scroll
    }
  }
</script>
<style scoped>
  .back{
    width:41px; height:41px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:0; left:0;
    z-index: 121;
  }
  .back i{
    width:12px; height:20px;
    background: url("../../common/image/header-l.png") no-repeat;
    background-size: contain;
  }
  .recordList{
   flex: 1; height:calc(100% - 42px);
  }
  .recordList ul li{
    display: flex;
    border-bottom:1px solid #eee;
    margin:0 10px;
    height:40px;
  }
  .scroll{
    height: 100%; overflow: auto;
  }
  .recordList ul li .del{
    line-height:40px;
    width:20px;
    text-align: center;
  }
  .recordList ul li p{
    flex:1;
    text-align: center;
    height:40px;
    line-height:40px;
  }
  .recordList ul li p.name span{
    width:40px; text-align: center;
    display: inline-block;
  }
  .recordList ul li p.time span{
    width:50px; text-align: center;
    display: inline-block;
  }
  .operRec-tab p{
    flex:1;
    text-align: center;
    color:#666;
  }
  .operRec-details{
    position: fixed;
    z-index: 110;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
