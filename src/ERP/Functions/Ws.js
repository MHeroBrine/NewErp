import Router from '../../router/index'
import VueEvent from '../../model/VueEvent'
import Store from '../../vuex/store'
import Axios from 'axios'
import store from '../../vuex/store'

const URL = 'http://118.24.113.182:8081'

let socket = null;

let Ws = {
    initSocket(gameId) {
        socket = new WebSocket('ws://118.24.113.182:8081/commonWebSocket?gameId=' + gameId);
    },

    openSocket() {
        socket.addEventListener('open', function(e) {
            console.log(e);
        })
    },

    message() {
        // 事件队列，保证先进入比赛再提示信息
        let eventQueue = [false, false];

        let year = null;
        let reg_enterprise_ready = /^ENTERPRISE_SURE ：[0-9]+$/;
        let reg_enterprise_now = /enterpriseId = [0-9]+/;
        let reg_game_init = /^GAME_INIT_COMPLETE ：[0-9]+$/;
        let reg_game_newYear = /year = [0-9]+/;
        // let reg_game_order = /gameId = [0-9]+/;
        let reg_game_over = /^企业破产，游戏结束！$/;

        socket.addEventListener('message', function(e) {
            console.log(e);
            if (e.data.match(reg_enterprise_now)) {
                // 企业选单
                let enterpriseId = e.data.match(reg_enterprise_now)[0].replace(/[^0-9]/ig, "");
                if (parseInt(enterpriseId) === parseInt(localStorage.getItem('enterpriseId'))) {
                    alert('轮到您选单了');
                    Router.push('/game/orderManage');
                    VueEvent.$emit('changeOrderState', true);
                    VueEvent.$emit('getOrderByYear');
                } else {
                    VueEvent.$emit('getOrderByYear');
                }
            } else if (e.data.match(reg_enterprise_ready)) {
                // 企业准备就绪
                // alert('企业准备就绪');
                let enterpriseId = e.data.match(reg_enterprise_ready)[0].replace(/[^0-9]/ig, "");
                // localStorage.setItem('enterpriseId', parseInt(enterpriseId));
            } else if (e.data.match(reg_game_init)) {
                // 比赛初始化完成
                localStorage.removeItem('GAME_cache');
                localStorage.removeItem('GAME_watching');
                store.state.game.orderManageADTemp = []
                // this.$store.state.game.orderManageADTem  p = [];
                // 获取周期
                Axios.get(URL + '/game/manage/enterprise/period?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            localStorage.setItem('YEAR', Response.data.data.year);
                            Store.state.game.year = Response.data.data.year;
                            localStorage.setItem('PERIOD', Response.data.data.period);
                            Store.state.game.period = Response.data.data.period;

                            eventQueue[0] = true;
                            Router.push('/index');
                            setTimeout(() => {
                                if (eventQueue[1] === true) {
                                    Store.commit('controlAlert', [true, 'TRUE', '新的一年(当前年份：' + year + '), 订单会开始', null, null, null]);
                                    setTimeout(() => {
                                        Store.commit('controlAlert', [false]);
                                        Store.commit('getPeriod', URL);
                                    }, 1500);
                                }
                            }, 0);
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            } else if (e.data.match(reg_game_newYear)) {
                // 新的一年 + 订单会开始
                year = e.data.match(reg_game_newYear)[0].replace(/[^0-9]/ig, "");
                // alert('新的一年（当前年份：' + year + ')，订单会开始');
                eventQueue[1] = true;
                setTimeout(() => {
                    if (eventQueue[0] === true || year > 1) {
                        Store.commit('controlAlert', [true, 'TRUE', '新的一年(当前年份：' + year + '), 订单会开始', null, null, null]);
                        setTimeout(() => {
                            Store.commit('controlAlert', [false]);
                            if (year > 1) {
                                location.reload();
                            }
                        }, 1500);
                    }
                }, 0);
            } else if (e.data.match(reg_game_over)) {
                // 注意，该项为中文识别
                // alert('企业破产，游戏结束！');
                alert(e.data);
                localStorage.clear();
                Router.push('/nav');
            }
        })
    },
}

export default Ws