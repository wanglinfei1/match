<template>
  <ul class="switches" v-if="switches.length" :style="{height:swHeight}">
    <li class="switch-item"
        v-for="(item,index) in switches"
        :class="{active: index===currentIndex}"
        @click="selectItem(item,index)"
        :key="item">
      <span>{{item}}</span>
    </li>
  </ul>
</template>

<script>
  export default{
    props: {
      switches: {
        type: Array,
        default: []
      },
      swHeight:{
        type: String,
        default: '46px'
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      }
    }
  }
</script>

<style scoped >
  .switches{
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    height:46px;
    background: #fafafa;
    border-bottom: 1px solid #dddddd;
  }
  .operRecTab.switches .switch-item span{
    color:#333;
  }
  .switches .switch-item{
    flex: 1; height:100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .switches .switch-item span{
    font-size:15px; line-height: 22px;
    height:22px;border-bottom: 2px solid transparent;
    color:#999; min-width: 40px;
  }
  .switches .switch-item.active span{
    color:#333333; border-bottom: 2px solid #333;
    font-weight: bold;
  }
</style>
