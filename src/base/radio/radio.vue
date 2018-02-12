<template>
  <ul class="radioList" v-if="radioList.length">
    <li class="radio-item"
        v-for="(item,index) in radioList"
        :class="{active: index===currentIndex}"
        @click="selectItem(item,index)"
        :key="index">
      <i class="radio-icon iconfont"
         :class="{'icon-duihao': index===currentIndex}"
      ></i>
      <span>{{item.text}}</span>
    </li>
  </ul>
</template>

<script>
  export default{
    props: {
      radioList: {
        type: Array,
        default: []
      },
      itemType:{
        type:Number,
        default:1
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index,this.itemType)
      }
    }
  }
</script>

<style scoped >
  .radioList{
    display: flex;
    flex: 1;
  }
  .radio-item{
    display: flex;
    line-height: 46px;
    flex: 1; margin: 0 15px;
    justify-content: center;
    align-items: center;
  }
  .radio-item span{
    color:#333333;
  }
  .icon-duihao{
    background: url("../../common/image/duihao.png") no-repeat center;
    background-size: 70%;
  }
  .radio-icon{
    margin-right:10px;
    width:19px;
    height:19px;
    line-height: 19px;
    text-align: center;
    color:#333333;
    background-color: #fafafa;
    border:1px solid #999999;
  }
</style>
