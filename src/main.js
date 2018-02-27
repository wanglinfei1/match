import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import './common/stylus/index.styl'
import './common/js/vue-touch'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin,{position:'middle',time:1000})
import vueTouch from './common/js/vue-touch'
import ijax from './common/js/ijax'
document.domain='sina.com.cn';
Vue.config.productionTip = false
fastclick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


