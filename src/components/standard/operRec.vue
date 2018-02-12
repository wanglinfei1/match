<template>
  <transition name="slide">
    <div class="operRec-details" v-if="showFlag" ref="operdetails">
      <div @click="back" class="back"><i></i></div>
      <switches :switches="operRecTab"
                @select="selectItem"
                swHeight="41px"
                :currentIndex="currentIndex"></switches>
      <div class="recordList" ref="recordList">
        <Scroll :data="operRec" :scrollToEndFlag="scrollToEndFlag"
                class="scroll" ref="scroll1" v-if="currentIndex == 0">
          <ul class="recList1">
            <li v-for = "(item,index) in operRec"
                :key="index">
              <p class="time">
                <!--<span></span>-->
                <span>{{formatTime(item.time)}}</span>
                <span>{{item.itemName?item.itemName+'队':''}}</span>
              </p>
              <p class="name">
                <!--<span>{{item.num?`${item.num}号`:''}}</span>-->
                <span v-if="item.type == 'start'||item.type == 'end'">{{sectionArr[(item.section||1)-1]}}</span>
                <span v-else="item.type == 'start'||item.type == 'end'">{{item.name}}</span>
              </p>
              <p class="oper">
                <span v-if="item.type !== 'start'&&item.type !== 'end'">{{item.operation}}</span>
                <span v-if="item.type == 'start'">开始</span>
                <span v-if="item.type == 'end'">结束</span>
              </p>
              <p class="delIcon">
                <i class="del" v-if="item.type == 'start'||item.type == 'end'"></i>
                <i class="del delete"
                   @click ="deleOperRec(item)"
                   v-else="item.type == 'start'||item.type == 'end'"></i>
              </p>
            </li>
          </ul>
        </Scroll>
        <Scroll :data="scoreOperRec" :scrollToEndFlag="scrollToEndFlag"
                class="scroll" ref="scroll2"  v-if="currentIndex == 1">
          <ul class="recList2">
            <li v-for = "(item,index) in scoreOperRec"
                :key="index">
              <p class="time">
                <!--<span></span>-->
                <span>{{formatTime(item.time)}}</span>
                <span>{{item.itemName?item.itemName+'队':''}}</span>
              </p>
              <p class="name">
                <!--<span>{{item.num?`${item.num}号`:''}}</span>-->
                <span v-if="item.type == 'start'||item.type == 'end'">{{sectionArr[(item.section||1)-1]}}</span>
                <span v-else="item.type == 'start'||item.type == 'end'">{{item.name}}</span>
              </p>
              <p class="oper">
                <span v-if="item.type !== 'start'&&item.type !== 'end'">{{item.operation}}</span>
                <span v-if="item.type == 'start'">开始</span>
                <span v-if="item.type == 'end'">结束</span>
              </p>
              <p class="delIcon">
                <i class="del" v-if="item.type == 'start'||item.type == 'end'"></i>
                <i class="del delete"
                   @click ="deleOperRec(item)"
                   v-else="item.type == 'start'||item.type == 'end'"></i>
              </p>
            </li>
          </ul>
        </Scroll>
        <Scroll :data="foulOperRec" :scrollToEndFlag="scrollToEndFlag"
                class="scroll" ref="scroll3" v-if="currentIndex == 2">
          <ul class="recList3">
            <li v-for = "(item,index) in foulOperRec"
                :key="index">
              <p class="time">
                <!--<span></span>-->
                <span>{{formatTime(item.time)}}</span>
                <span>{{item.itemName?item.itemName+'队':''}}</span>
              </p>
              <p class="name">
                <!--<span>{{item.num?`${item.num}号`:''}}</span>-->
                <span v-if="item.type == 'start'||item.type == 'end'">{{sectionArr[(item.section||1)-1]}}</span>
                <span v-else="item.type == 'start'||item.type == 'end'">{{item.name}}</span>
              </p>
              <p class="oper">
                <span v-if="item.type !== 'start'&&item.type !== 'end'">{{item.operation}}</span>
                <span v-if="item.type == 'start'">开始</span>
                <span v-if="item.type == 'end'">结束</span>
              </p>
              <p class="delIcon">
                <i class="del" v-if="item.type == 'start'||item.type == 'end'"></i>
                <i class="del delete"
                   @click ="deleOperRec(item)"
                   v-else="item.type == 'start'||item.type == 'end'"></i>
              </p>
            </li>
          </ul>
        </Scroll>
      </div>
    </div>
  </transition>
</template>
<script>
  import Scroll from '../../base/scroll/scroll.vue'
  import ElLayer from '../../base/elLayer/elLayer.vue'
  import Switches from '../../base/switches/switches.vue'
  import {recMiXin} from '../../common/js/mixin'
  export default {
    mixins: [recMiXin],
    data() {
      return {

      }
    },
    created() {},
    mounted(){

    },
    methods: {
      back(){
        if(window.history.length){
          this.$router.go(-1)
        }else{
          this.$router.push({path:'/matchSett/standard'})
        }
      }
    },
    components: {
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

  .scroll{
    height: 100%; overflow: auto;
  }
  .recordList ul{
    padding:0 10px;
  }
  .recordList ul li{
    display: flex;
    border-bottom:1px solid #eee;
    width: 100%;
    box-sizing: border-box;
    height:40px;
    justify-content: flex-start;
    align-items: center;
  }
  .recordList ul li p{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    height:40px;
    font-size: 15px;
    color:#333;
  }
  .recordList ul li .time{
    width:34.5%;
  }
  .recordList ul li .time span:nth-of-type(1){
    color:#999999;
  }
  .recordList ul li .time span:nth-of-type(2){
    min-width: 45px;
    min-height: 10px;
    margin-left: 18.2%;
  }
  .recordList ul li .name{
    width:31%;
  }
  .recordList ul li .oper{
    width:19.4%;
  }
  .recordList ul li .delIcon{
    width:15.1%;
    justify-content: flex-end;
  }
  .recordList ul li .del{
    height:16px;
    width:16px;
    text-align: center;
    margin: 5px 14px;
  }
  .recordList ul li .delete{
    background: url("../../common/image/delete.png") no-repeat center;
    background-size: contain;
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
