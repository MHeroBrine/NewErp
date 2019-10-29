// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VCharts from 'v-charts'
import App from './App'
import router from './router'

// Vue.use(VCharts)

import './assets/reset.css'
import './assets/style.scss'
// import './assets/icon/icon.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

const URL = 'http://192.168.43.243:8081';
Vue.prototype.URL = URL;

// Functions
import Util from './ERP/Functions/Util.js'
Vue.prototype.Util = Util
import COOKIE from './ERP/Functions/Cookie.js'
Vue.prototype.Cookie = COOKIE
import STORAGE from './ERP/Functions/Storage.js'
Vue.prototype.Storage = STORAGE

// Class
import COLLEGE from './ERP/Class/College.js'
Vue.prototype.College = COLLEGE

import store from './vuex/store.js'

Vue.config.productionTip = false

let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/bar')
require('echarts/lib/chart/scatter')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')

Vue.prototype.$echarts = echarts;

// 组件导入
import Input_1 from './components/Input/Input_1.vue'
Vue.component('v-input1', Input_1)
import Input_search from './components/Input/Input_search.vue'
Vue.component('v-input-search', Input_search)

import Alert from './components/Alert/Alert.vue'
Vue.component('v-alert', Alert)

import Button_1 from './components/Button/Button_1.vue'
Vue.component('v-button1', Button_1)

import Select from './components/Select/Select.vue'
Vue.component('v-select', Select)

import Pagination_game from './components/Pagination/Pagination_game.vue'
Vue.component('v-pagination-game', Pagination_game)
import Pagination_group from './components/Pagination/Pagination_group.vue'
Vue.component('v-pagination-group', Pagination_group)
import Pagination_groupMember from './components/Pagination/Pagination_groupMember.vue'
Vue.component('v-pagination-groupMember', Pagination_groupMember)
import Pagination_list from './components/Pagination/Pagination_list.vue'
Vue.component('v-pagination-list', Pagination_list)

import Card_game from './components/Card/Card_game.vue'
Vue.component('v-card-game', Card_game)
import Card_group from './components/Card/Card_group.vue'
Vue.component('v-card-group', Card_group)
import Card_groupMember from './components/Card/Card_groupMember.vue'
Vue.component('v-card-groupMember', Card_groupMember)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
