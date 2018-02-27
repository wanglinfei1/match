<template>
  <transition name="layer-fade">
    <div class="layer" v-show="showFlag" @click.stop>
      <div class="layer-wrapper">
        <div class="layer-content">
          <div class="text" v-if="text">
            {{text}}
          </div>
          <div class="text" :class="{slot: !layerType||NoPadd}" v-else="text">
            <slot></slot>
          </div>
          <div class="operate" v-if="layerType">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      layerType:{
        type:Boolean,
        default:true
      },
      NoPadd:{
        type:Boolean,
        default:false
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show(type) {
        this.type=type;
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.showFlag = false
        this.$emit('cancel')
      },
      confirm() {
        //this.showFlag = false
        this.$emit('confirm',this.type)
      }
    }
  }
</script>

<style scoped>

  .layer {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0,0,0,0.4);
  }
   .layer.layer-fade-enter-active{
     animation: layer-fadein 0.2s
   }
  .layer.layer-fade-enter-active .layer-content{
    animation: layer-zoom 0.2s
  }
  .layer .layer-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  .layer-wrapper .layer-content{
    width: 5rem;
    border-radius: 2px;
    background: #fff;
  }
  .layer-wrapper .layer-content .text{
    padding: 19px 15px;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    background: #f5f6f6;
    color: #333;
  }
  .layer-wrapper .layer-content .text.slot{
    padding:6px;background: #f6f6f6;
  }
  .layer-wrapper .layer-content .operate{
    display: flex;
    align-items: center;
    text-align: center;
    font-size:14px;
  }
  .layer-wrapper .layer-content .operate-btn{
    flex: 1;
    line-height: 39px;
    border-top: 1px solid #eee;
    color: #333;
  }
  .major-details .layer-wrapper .layer-content{
    width: 250px;
    background: #fff;
  }
  .major-details  .layer-wrapper .layer-content .operate-btn{
    flex: 1;
    line-height: 20px;
    padding: 10px 0;
    border-top: 1px solid #eee;
    color: #333;
  }
  .major-details .layer-wrapper .layer-content .text{
    line-height: 42px;
  }
  .layer-wrapper .layer-content .operate-btn.left{
    border-right: 1px solid #eee
  }
  @keyframes layer-fadein{
    0%{
      opacity: 0
    }
    100%{
      opacity: 1
    }
  }
  @keyframes layer-zoom{
    0%{
      transform: scale(0)
    }
    50%{
      transform: scale(1.1)
    }
    100%{
      transform: scale(1)
    }
  }

</style>
