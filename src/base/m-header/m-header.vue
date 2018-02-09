<template>
  <div class="m-header" id="mHeader">
    <span  @click="back" class="bgBack"><em></em><b>返回</b></span>
    <p @click="titleClick"><b v-if="titleIcon"></b>{{title}}</p>
    <i @click = "goNext" :class="{rightIcon:rightIcon}">{{rightText}}</i>
  </div>
</template>

<script>
  export default {
    props: {
      leftIcon:{
        type:String,
        default:'icon-fanhui'
      },
      titleIcon:{
        type:String,
        default:''
      },
      title: {
        type: String,
        default: '比赛设置'
      },
      rightText:{
        type:String,
        default:''
      },
      rightIcon:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {

      }
    },
    methods: {
      back() {
        this.$emit('back')
      },
      titleClick(){
        this.$emit('titleClick')
      },
      goNext() {
        this.$emit('goNext')
      }
    }
  }
</script>

<style scoped >
  .m-header{
    display: flex;
    width:100%;
    font-size:14px;
    text-align: center;
    color:#666;
    height:41px;
    border-top:1px solid #aeaeae;
    border-bottom:2px solid #c0c0c0;
    background: #f7f6f7;
  }
  .m-header span.bgBack{
    width:60px;
    font-size:14px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .bgBack em{
    display: flex;
    width:12px; height:20px;
    background: url("../../common/image/header-l.png") no-repeat;
    background-color: #f6f6f6;
    background-size: contain;
    margin:0 5px 0 13px;
  }
  .bgBack b{
    font-size: 14px;
  }
  .m-header i{
    width:60px; font-size:14px;background-color: #f6f6f6;
    justify-content: center;
    align-items: center; display: flex;
  }
  .rightIcon{
    background: url("../../common/image/bofang-1.png") center center no-repeat;
    background-size: 50%;
  }
  .m-header p{ flex:1; font-size:18px;font-weight: 500; display: flex; flex-direction:row; justify-content: center;align-items: center;}
  .m-header p b{
    width:8px; height:8px;
    display: flex;  justify-content: center;align-items: center;
    margin-right:10px; background: url("../../common/image/time_dian.png") no-repeat;
    background-size: contain;
  }
</style>
