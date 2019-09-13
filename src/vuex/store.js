import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'

import router from '../router/index.js'

import VueEvent from '../model/VueEvent'

import Cookie from '../ERP/Functions/Cookie.js'
import Storage from '../ERP/Functions/Storage.js'

Vue.use(Vuex)

const global = {
    state: {
        // header组件
        HEADER_LOGIN: false,
        HEADER_NAV: false,
        HEADER_USER: false,
        HEADER_GAMECONTROL: false,
        HEADER_INDEX: false,
        HEADER_TEACHER: false,

        // sidebar组件
        SIDEBAR_USER: false,
            SIDEBAR_GAMECONTROL_CREATE: false,
            SIDEBAR_GAMECONTROL_JOIN: false,
            SIDEBAR_GAMECONTROL_CONTINUE: false,
            SIDEBAR_GAMECONTROL_HISTORY: false,
        SIDEBAR_INDEX: false,

        // fotter组件
        FOTTER: false,

        // alert组件
        ALERT: false,
            ALERT_ICON: null,
            ALERT_TITLE: null,
            ALERT_CONTENT: null,
            ALERT_DATA: null,
            ALERT_METHOD: null,

        // 浮窗组件
        floatWindow: false,

    },
    mutations: {
        // 打开悬浮窗背景
        controlFloatWindow(state) {
            state.floatWindow = !state.floatWindow;
        },

        pageState(state, address) {
            for (let item in state) {
                if (item === ('ALERT' || 'ALERT_DATA' || 'ALERT_METHOD')) {
                    continue;
                }
                state[item] = false;
            }

            switch (address) {
                case 'login':
                    state.HEADER_LOGIN = true;
                    break;
                case 'register':
                    state.HEADER_LOGIN = true;
                    state.FOTTER = true;
                    break;
                case 'nav':
                    state.HEADER_NAV = true;
                    break;
                case 'navInfo':
                    state.HEADER_NAV = true;
                    state.SIDEBAR_USER = true;
                    break;
                case 'user':
                    state.HEADER_GAMECONTROL = true;
                    state.SIDEBAR_USER = true;
                    break;
                case 'createGame':
                    state.HEADER_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL_CREATE = true;
                    break;
                case 'gameControl_joinGame':
                    state.HEADER_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL_JOIN = true;
                    break;
                case 'gameControl_joinGame_joinGroup':
                    state.HEADER_GAMECONTROL = true;
                    break;
                case 'gameControl_continueGame':
                    state.HEADER_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL_CONTINUE = true;
                    break;
                case 'gameControl_checkGame':
                    state.HEADER_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL = true;
                    state.SIDEBAR_GAMECONTROL_HISTORY = true;
                    break;
                case 'memberList':
                    state.HEADER_GAMECONTROL = true;
                    break;
                case 'memberControl':
                    state.HEADER_GAMECONTROL = true;
                    break;
                case 'report':
                    state.HEADER_GAMECONTROL = true;
                    break;

                // 游戏页面
                case 'index':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 1_MarketManage
                case 'marketDevelop':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'orderManage':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 2_ProductManage
                case 'productBuild':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'productStudy':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'ISO':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 3_PurchaseManage
                case 'materialPurchase':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'materialSave':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 4_StorageManage
                case 'storageManage':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'storageCount':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 5_ProduceManage
                case 'producePlan':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'factoryManage':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 6_SellManage
                case 'delivery':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'orderDetail':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 7_FinanceManage
                case 'taxManage':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'accountMoney':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'loanManage':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'financeForm':
                    state.HEADER_INDEX = true;
                    state.SIDEBAR_INDEX = true;
                    break;

                // 教师端
                case 'teacher':
                    state.HEADER_TEACHER = true;
                    state.SIDEBAR_TEACHER = true;
                    break;
                default:
                    break;
            }
        },

        // type: 打开(true) / 关闭(false)
        // title: 标题 
        // content: 内容
        // data: 表单输入项，需要带上标题和绑定值
        // method: 确认触发的动作
        controlAlert(state ,[type, icon, title, content, data, method]) {
            if (type === false) {
                state.ALERT = false;
                state.ALERT_ICON = icon;
                state.ALERT_TITLE = null;
                state.ALERT_CONTENT = null;
                state.ALERT_DATA = null;
                state.ALERT_METHOD = null;
            } else if (type === true) {
                state.ALERT_ICON = icon;
                state.ALERT_TITLE = title;
                state.ALERT_CONTENT = content;
                state.ALERT_DATA = data;
                state.ALERT_METHOD = method;
                state.ALERT = true;
            }
        },

        exit() {
            Cookie.delCookie('userId');
            Storage.cleanStorage();
            router.push('/');
        },
    }
}

const user = {
    state: {
        id: null,
        studentAccount: null,
        studentName: null,
        gender: null,
        majorBasicInfo: {
            id: null,
            major: null,
            college: {
                college: null,
                id: null
            }
        },
        studentClass: null,
        email: null,
        phone: null,
        teacherId: null,
        userAvatarInfo: null,
    },
    mutations: {
        // 存储用户数据
        setUserInfo(state, [url, id]) {
            // 获取个人信息
            Axios.get(url + '/user/student/basicInfo/get?userId=' + id)
                .then((Response) => {
                    if (Response.data.code === 200) {
                        for (let item in Response.data.data) {
                            state[item] = Response.data.data[item];
                        }
                        VueEvent.$emit('dataComplete');
                    } else {
                        alert('获取用户信息失败，请尝试重新登录')
                    }
                })
        },
        refreshUserInfo(state) {
            if (state.id === null) {
                let temp = Storage.readFromStorage('USER');
                for (let item in temp) {
                    state[item] = temp[item];
                }
            }
        }
    }
}

const college = {
    state: {
        data: null
    },
    mutations: {
        setCollege(state, value) {
            state.data = value;
            Storage.saveInStorage('COLLEGE', JSON.stringify(value));
        },
        refreshCollegeInfo(state) {
            state.data = JSON.parse(localStorage.getItem('COLLEGE'));
        }
    }
}

const gameControl = {
    state: {
        pageTitle: null,
        gameWatching: null,
        groupWatching: null,
        groupWatchingCEOId: null
    },
    mutations: {
        setGameControlTitle(state, title) {
            state.pageTitle = title;
        },
        setGameWatching(state, gameId) {
            state.gameWatching = gameId;
            Storage.saveInStorage('GAME', gameId);
        },
        setGroupWatching(state, [groupId, ceoId]) {
            state.groupWatching = groupId;
            state.groupWatchingCEOId = ceoId;
            Storage.saveInStorage('GROUP', groupId);
            Storage.saveInStorage('GROUP_CEO', ceoId);
        },
        refreshGameInfo(state) {
            state.gameWatching = localStorage.getItem('GAME');
        },
        refreshGroupInfo(state) {
            state.groupWatching = localStorage.getItem('GROUP');
            state.groupWatchingCEOId = localStorage.getItem('GROUP_CEO');
        }
    }
}

const game = {
    state: {
        year: null,
        period: null,
        orderState: false
    },
    mutations: {
        // 获取日期
        getPeriod(state, url) {
            if (localStorage.getItem('enterpriseId')) {
                Axios.get(url + '/game/manage/enterprise/period?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        // console.log(Response);
                        if (Response.data.code === 200) {
                            state.year = Response.data.data.year;
                            state.period = Response.data.data.period;
                            if (parseInt(Response.data.data.period) === 1) {
                                state.orderState = true;
                                router.push('/game/orderManage');
                            } else {
                                state.orderState = false;
                            }
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            }
        }
    }
}

const store = new Vuex.Store({
    modules: {
        global,
        user,
        college,
        gameControl,
        game
    }
})

export default store