<template>
  <transition name="slide">
    <div class="operRec-details" v-if="showFlag" ref="operdetails">
      <div @click="back" class="back"><i></i></div>
      <switches :switches="operRecTab"
                class="operRecTab"
                @select="selectItem"
                swHeight="41px"
                :currentIndex="currentIndex"></switches>
      <div class="recordList" ref="recordList">
        <div class="scroll"  v-if="currentIndex == 0">
          <ul class="recList1">
            <li v-for = "(item,index) in operRec" :key="index">
              <div v-if="(item.type == 'start'&&item.section<=section)||(item.type == 'end'&&item.section<section)">
                <p class="time">
                  <span>{{formatTime(item.time)}}</span>
                  <span class="span3">{{item.itemName?item.itemName+'队':''}}</span>
                </p>
                <p class="name">
                  <span>{{sectionArr[(item.section||1)-1]}}</span>
                </p>
                <p class="oper">
                  <span v-if="item.type == 'start'">开始</span>
                  <span v-if="item.type == 'end'">结束</span>
                </p>
                <p class="delIcon">
                  <i class="del"></i>
                </p>
              </div>
              <div  v-if="item.type != 'start'&&item.type != 'end'"
                    :class="{listColor1:item.itemType==1,listColor2:item.itemType==2}">
                <p class="time">
                  <span>{{sectionArr[(item.section||1)-1]}}</span>
                  <span>{{formatTime(item.time)}}</span>
                  <span class="span3">{{item.itemName?item.itemName+'队':''}}</span>
                </p>
                <p class="name">
                  <span>{{item.name}}</span>
                </p>
                <p class="oper">
                  <span>{{item.operation}}</span>
                </p>
                <p class="delIcon">
                  <i class="del delete" @click ="deleOperRec(item)"></i>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="scroll" v-if="currentIndex == 1">
          <ul class="recList2">
            <li v-for = "(item,index) in scoreOperRec" :key="index">
              <div v-if="(item.type == 'start'&&item.section<=section)||(item.type == 'end'&&item.section<section)">
                <p class="time">
                  <span>{{formatTime(item.time)}}</span>
                  <span class="span3">{{item.itemName?item.itemName+'队':''}}</span>
                </p>
                <p class="name">
                  <span>{{sectionArr[(item.section||1)-1]}}</span>
                </p>
                <p class="oper">
                  <span v-if="item.type == 'start'">开始</span>
                  <span v-if="item.type == 'end'">结束</span>
                </p>
                <p class="delIcon">
                  <i class="del"></i>
                </p>
              </div>
              <div  v-if="item.type != 'start'&&item.type != 'end'"
                    :class="{listColor1:item.itemType==1,listColor2:item.itemType==2}">
                <p class="time">
                  <span>{{sectionArr[(item.section||1)-1]}}</span>
                  <span>{{formatTime(item.time)}}</span>
                  <span class="span3">{{item.itemName?item.itemName+'队':''}}</span>
                </p>
                <p class="name">
                  <span>{{item.name}}</span>
                </p>
                <p class="oper">
                  <span>{{item.operation}}</span>
                </p>
                <p class="delIcon">
                  <i class="del delete" @click ="deleOperRec(item)"></i>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="scroll" v-if="currentIndex == 2">
          <ul class="recList3">
              <li v-for = "(item,index) in foulOperRec" :key="index">
                <div v-if="(item.type == 'start'&&item.section<=section)||(item.type == 'end'&&item.section<section)">
                  <p class="time">
                    <span>{{formatTime(item.time)}}</span>
                    <span class="span3">{{item.itemName?item.itemName+'队':''}}</span>
                  </p>
                  <p class="name">
                    <span>{{sectionArr[(item.section||1)-1]}}</span>
                  </p>
                  <p class="oper">
                    <span v-if="item.type == 'start'">开始</span>
                    <span v-if="item.type == 'end'">结束</span>
                  </p>
                  <p class="delIcon">
                    <i class="del"></i>
                  </p>
                </div>
                <div  v-if="item.type != 'start'&&item.type != 'end'"
                      :class="{listColor1:item.itemType==1,listColor2:item.itemType==2}">
                  <p class="time">
                    <span>{{sectionArr[(item.section||1)-1]}}</span>
                    <span>{{formatTime(item.time)}}</span>
                    <span class="span3">{{item.itemName?item.itemName+'队':''}}</span>
                  </p>
                  <p class="name">
                    <span>{{item.name}}</span>
                  </p>
                  <p class="oper">
                    <span>{{item.operation}}</span>
                  </p>
                  <p class="delIcon">
                    <i class="del delete" @click ="deleOperRec(item)"></i>
                  </p>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import ElLayer from '@/base/elLayer/elLayer.vue'
  import Switches from '@/base/switches/switches.vue'
  import {recMiXin} from '@/common/js/mixin'
  import {itemColor} from '@/common/js/config'
  export default {
    mixins: [recMiXin],
    created() {},
    mounted(){},
    methods: {
      back(){
        if(window.history.length){
          this.$router.go(-1)
        }else{
          this.$router.push({path:'/matchSett/major'})
        }
      },
    },
    components: {
      Switches
    }
  }
</script>
<style scoped>
  .listColor1 span{
    color:#ff4646!important;
  }
  .listColor2 span{
    color:#1656a5!important;
  }
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
  }
  .recordList ul li div{
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
    color:#999999; margin-right:8px;
  }
  .recordList ul li .time span:nth-of-type(2){
    color:#999999;
  }
  .recordList ul li .time span.span3{
    color:#333;
    min-width: 45px;
    min-height: 10px;
    margin-left: 9.1%;
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
