/**
 * Created by linfei6 on 2018/3/22.
 */
import Vue from 'vue'
// 创建构造器
export const Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
});
const ComponentT = Vue.extend({
  template: '<p>{{name}} {{age}}</p>',
  data: function () {
    return {
    }
  },
  props:{
    name:{
      type:String,
      default:'王琳飞',
      required:true
    },
    age:{
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 20
      }
    }
  }
});
Vue.component('component-test', ComponentT);
export const ComponentTest = Vue.component('component-test');
