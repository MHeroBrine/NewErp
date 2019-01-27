import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../ERP/Login.vue'
import Register from '../ERP/Register.vue'

import Nav from '../ERP/nav/Nav.vue'
import UserInfo from '../ERP/nav/UserInfo.vue'
import CheckGame from '../ERP/nav/gameControl/CheckGame.vue'
import ContinueGame from '../ERP/nav/gameControl/ContinueGame.vue'
import JoinGame from '../ERP/nav/gameControl/JoinGame.vue'

export default new Router({
    routes: [
        { path: '/login', component: Login },
        { path: '/register', component: Register },

        { path: '/nav', component: Nav },
        { path: '/userInfo', component: UserInfo },
        { path: '/checkGame', component: CheckGame },
        { path: '/continueGame', component: ContinueGame },
        { path: '/joinGame', component: JoinGame }
    ]
})
