<template>
  <transition name="slide">
    <stan-oper></stan-oper>
  </transition>
</template>
<script>
  import StanOper from './stanOper'
  export default {
    methods:{

    },
    components: {
      StanOper,
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
