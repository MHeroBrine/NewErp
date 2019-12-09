import Vue from 'vue'
import Router from 'vue-router'
import Cookie from '../ERP/Functions/Cookie.js'

Vue.use(Router)

import Login from '../ERP/Login.vue'
import Register from '../ERP/Register.vue'
// import Setpassword from '../ERP/nav/SetPassword.vue'

import Nav from '../ERP/nav/Nav.vue'
import UserInfo from '../ERP/nav/UserInfo.vue'
import CreateGame from '../ERP/nav/createGame/CreateGame.vue'
import JoinGame from '../ERP/nav/gameControl/1_JoinGame/JoinGame.vue'
    import JoinGame_Group from '../ERP/nav/gameControl/1_JoinGame/joinGroup/JoinGroup.vue' 
import ContinueGame from '../ERP/nav/gameControl/2_ContinueGame/ContinueGame.vue'
import CheckGame from '../ERP/nav/gameControl/3_CheckGame/CheckGame.vue'
import Report from '../ERP/nav/gameControl/Report.vue'
import CheckReport from '../ERP/nav/gameControl/CheckReport.vue'
// import MemberList from '../ERP/nav/gameControl/MemberList.vue'
// import MemberControl from '../ERP/nav/gameControl/MemberControl.vue'

import Index from '../ERP/game/Index.vue'

// 1_MarketManage
import MarketDevelop from '../ERP/game/1_MarketManage/1_MarketDevelop.vue'
import OrderManage from '../ERP/game/1_MarketManage/2_OrderManage.vue'

// 2_ProductManage
import ProductBuild from '../ERP/game/2_ProductManage/1_ProductBuild.vue'
import productStudy from '../ERP/game/2_ProductManage/2_productStudy.vue'
import ISO from '../ERP/game/2_ProductManage/3_ISO.vue'

// 3_PurchaseManage
import MaterialPurchase from '../ERP/game/3_PurchaseManage/1_MaterialPurchase.vue'
import MaterialSave from '../ERP/game/3_PurchaseManage/2_MaterialSave.vue'

// 4_StorageManage
import StorageManage from '../ERP/game/4_StorageManage/1_StorageManage.vue'
import StorageCount from '../ERP/game/4_StorageManage/2_StorageCount.vue'

// 5_ProduceManage
import ProducePlan from '../ERP/game/5_ProduceManage/1_ProducePlan.vue'
import FactoryManage from '../ERP/game/5_ProduceManage/2_FactoryManage.vue'

// 6_SellManage
import Delivery from '../ERP/game/6_SellManage/1_Delivery.vue'
import OrderDetail from '../ERP/game/6_SellManage/2_OrderDetail.vue'

// 7_FinanceManage
import TaxManage from '../ERP/game/7_FinanceManage/1_TaxManage.vue'
import AccountMoney from '../ERP/game/7_FinanceManage/2_AccountMoney.vue'
import LoanManage from '../ERP/game/7_FinanceManage/3_LoanManage.vue'
import FinanceForm from '../ERP/game/7_FinanceManage/4_FinanceForm.vue'
import Axios from 'axios';

// 教师端
import Enterprise_history from '../ERP/Teacher/Enterprise_history.vue'
import Enterprise_history_2 from '../ERP/Teacher/Enterprise_history_2.vue'

const routes = new Router({
    routes: [
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        // { path: '/setPassword', component: Setpassword },

        { path: '/nav', component: Nav },
        { path: '/userInfo', component: UserInfo },
        { path: '/createGame', component: CreateGame },
        { path: '/joinGame', component: JoinGame },
            { path: '/joinGame/joinGroup', component: JoinGame_Group },
        { path: '/continueGame', component: ContinueGame },
        { path: '/checkGame', component: CheckGame },
        { path: '/report', component: Report },
        { path: '/checkReport', component: CheckReport },
        // { path: '/memberList', component: MemberList },
        // { path: '/memberControl', component: MemberControl },

        // game部分
        { path: '/index', component: Index },

        { path: '/game/marketDevelop', component: MarketDevelop },
        { path: '/game/orderManage', component: OrderManage },

        { path: '/game/productBuild', component: ProductBuild },
        { path: '/game/productStudy', component: productStudy },
        { path: '/game/ISO', component: ISO },

        { path: '/game/materialPurchase', component: MaterialPurchase },
        { path: '/game/materialSave', component: MaterialSave },

        { path: '/game/storageManage', component: StorageManage },
        // { path: '/game/storageCount', component: StorageCount },

        { path: '/game/producePlan', component: ProducePlan },
        { path: '/game/factoryManage', component: FactoryManage },

        { path: '/game/delivery', component: Delivery },
        { path: '/game/orderDetail', component: OrderDetail },

        { path: '/game/taxManage', component: TaxManage },
        { path: '/game/accountMoney', component: AccountMoney },
        { path: '/game/loanManage', component: LoanManage },
        { path: '/game/financeForm', component: FinanceForm },

        { path: '/teacher/enterprise_history', component: Enterprise_history },
        { path: '/teacher/enterprise_history_2', component: Enterprise_history_2 },        

        { path: '/', redirect: '/login'}
    ]
})

// 导航守卫，控制页面跳转

// 已登录 进入 登录/注册 =》 不允许，强制跳转
// 已登录 进入 其它页面 =》 允许，进入用户指定的页面
// 未登录 进入 登录/注册 =》 允许，进入用户指定的页面
// 未登录 进入 其它页面 =》 不允许，强制跳转

routes.beforeEach((to, from, next) => {
    let userId = Cookie.getCookie('userId');
    let teacherId = Cookie.getCookie('teacherId');
    if (userId && to.fullPath !== '/login' && to.fullPath !== '/register') {
        if (to.fullPath == '/joinGame/joinGroup' && localStorage.getItem('GAME')) {
            next();
        }
        // 缓存存在且属于该用户
        if (localStorage.getItem('GAME_watching') && (localStorage.getItem('GAME_cache') == userId)) {
            Axios.get('http://118.24.113.182:8081' + '/game/manage/judge?gameId=' + localStorage.getItem('GAME_watching') + '&userId=' + userId)
                .then(Response => {
                    if (Response.data.code === 200) {
                        if (Response.data.data === true) {
                            localStorage.setItem('GAME', localStorage.getItem('GAME_watching'));
                            alert('用户处于比赛中时，不可进入其它页面');
                            next('/joinGame/joinGroup');
                        } else {
                            // 不属于该比赛
                            localStorage.removeItem('GAME_watching');
                            localStorage.removeItem('GAME_cache');
                            next();
                        }
                    } else {
                        // 不属于该比赛
                        localStorage.removeItem('GAME_watching');
                        localStorage.removeItem('GAME_cache');
                        next();
                    }
                })
        } else {
            // 不属于该比赛
            localStorage.removeItem('GAME_watching');
            localStorage.removeItem('GAME_cache');
            next();
        }
    } else if (userId && (to.fullPath === '/login' || to.fullPath === '/register')) {
        next('/nav');
    } else if (!userId && (to.fullPath === '/login' || to.fullPath === '/register')) {
        next();
    } else if (!userId && (to.fullPath !== '/login' || to.fullPath !== '/register')) {
        next('/login');
    }
})

routes.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})

export default routes
