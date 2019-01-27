// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import reset from './assets/reset.css'

Vue.config.productionTip = false

// 组件导入
import Input_1 from './components/Input/Input_1.vue'
Vue.component('v-input1', Input_1)

import Button_1 from './components/Button/Button_1.vue'
Vue.component('v-button1', Button_1)

import Select from './components/Select/Select.vue'
Vue.component('v-select', Select)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
