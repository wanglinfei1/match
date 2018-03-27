<template>
  <div class="test">
    <div id="mount-point"></div>
    <component-test :name="name" :age="age"></component-test>
  </div>
</template>

<script>
  import {Profile,ComponentTest} from './vueExtend'
  export default{
    data(){
      return {
        name:'wanglinfei',
        age:22
      }
    },
    mounted() {
      // 创建 Profile 实例，并挂载到一个元素上。
      new Profile().$mount('#mount-point')
    },
    component:{
      ComponentTest
    }
  }
</script>
<style>
.test{
  margin-top: 10px;
  text-align: center;
  line-height: 30px;
}
</style>
