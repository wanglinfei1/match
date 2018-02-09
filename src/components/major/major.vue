<template>
  <transition name="slide">
    <major-oper></major-oper>
  </transition>
</template>
<script>
  import MajorOper from './majorOper.vue'
  export default {
    methods:{},
    components: {
      MajorOper
    }
  }
</script>
<style scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
