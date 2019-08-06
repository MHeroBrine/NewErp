<template>
    <div id="loanManage">
        <div class="container_default control" v-show="page.control">
            <div class="title">
                <h3>贷款处理</h3>
            </div>
            <div class="main">
                <ul>
                    <li>
                        <div class="T">贷款类型</div>
                        <div class="info">
                            <select class="v-select" v-model="loanNow">
                                <option :value="item.id" v-for="item in loanData">
                                    {{ item.loanType }}
                                </option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div class="T">贷款金额</div>
                        <div class="info">
                            <input type="text" class="v-input" placeholder="请输入贷款金额" v-model="moneyNow">
                        </div>
                    </li>
                    <li>
                        <div class="T">年利率</div>
                        <div class="info">{{ rateNow }}</div>
                    </li>
                    <li>
                        <div class="T">贷款期限</div>
                        <div class="info">{{ yearNow }}</div>
                    </li>
                </ul>
                <div class="remark">
                    <span>备注：</span>
                    <p>1.只有年初能申请长期贷款。</p>
                    <p>2.所有长贷和短贷之和不能超过上年权益的3倍。</p>
                    <p>3.长期贷款还款方式为年初付息，到期还本。每次贷款为10的倍数；短期贷款还款方式为到期一次还本付息，每次贷款为20的倍数。</p>
                </div>
                <button class="v-button b-primary detail_button" @click="pageChange('detail')">查看现有贷款</button>
                <button class="v-button b-primary confirm" @click="askLoan()">申请</button>
            </div>
            <span class="rule">贷款规则</span>
        </div>

        <div class="container_default detail" v-show="page.detail">
            <div class="title">
                <h3>贷款详情</h3>
            </div>
            <div class="main">
                <div class="options">
                    <ul>
                        <li>
                            贷款类型：<select class="v-select" v-model="loanNow_search">
                                <option :value="item.id" v-for="item in loanData">
                                    {{ item.loanType }}
                                </option>
                            </select>
                        </li>
                        <li>状态：<select class="v-select" v-model="stateNow_search">
                            <option value="0">未还款</option>
                            <option value="1">已还款</option>
                            </select>
                        </li>
                        <li>
                            <button @click="search()">查询</button>
                        </li>
                    </ul>
                </div>
                <table class="v-table_border">
                    <tr>
                        <th>贷款编号</th>
                        <th>贷款类型</th>
                        <th>贷款时间</th>
                        <th>还款时间</th>
                        <th>贷款金额（万）</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in searchData">
                        <td>{{ item.loanNumber }}</td>
                        <td>{{ item.loanType }}</td>
                        <td>{{ item.beginPeriod }}</td>
                        <td>{{ item.endPeriod }}</td>
                        <td>{{ item.loanAmount }}</td>
                        <td><button v-if="!item.repaid" class="v-button b-primary" style="width: 80px;" @click="repay(item.id)">还款</button></td>
                    </tr>
                </table>
                <button class="v-button b-primary control_button" @click="pageChange('control')">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {
                // 借款信息
                loanData: [],
                loanNow: 1,
                moneyNow: null,
                rateNow: null,
                yearNow: null,
                
                // 查询信息
                loanNow_search: 1,
                stateNow_search: 0,
                searchData: [],

                page: {
                    control: true,
                    detail: false
                }
            }
        },
        methods: {
            // 页面切换
            pageChange(address) {
                if (address === 'detail') {
                    this.page.control = false;
                    this.page.detail = true;
                } else {
                    this.page.control = true;
                    this.page.detail = false;
                }
            },
            // 获取贷款信息
            getLoanInfo() {
                Axios.get(this.URL + '/game/compete/operation/loan/type?gameId=' + localStorage.getItem('GAME'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.loanData = Response.data.data;
                            this.getRateAndYear(this.loanNow);
                        } else {
                            alert('获取贷款信息失败');
                        }
                    })
            },
            // 获取利率和年限
            getRateAndYear(id) {
                for (let item in this.loanData) {
                    if (this.loanData[item].id === id) {
                        this.rateNow = this.loanData[item].loanRate;
                        this.yearNow = this.loanData[item].maxDuration;
                    }
                }
            },
            // 申请
            askLoan() {
                if (this.moneyNow && this.loanNow) {
                    let i = confirm('确认申请贷款吗？')
                    if (i) {
                        Axios.post(this.URL + '/game/compete/operation/loan/submit', {
                            "enterpriseId": localStorage.getItem('enterpriseId'),
                            "loanAmount": this.moneyNow,
                            "loanBasicId": this.loanNow
                        }).then(Response => {
                            if (Response.data.code === 200) {
                                alert('申请成功');
                                this.pageChange('detail');
                            }
                        })
                    }
                } else {
                    alert('请输入所有信息');
                }
            },
            // 查询
            search() {
                this.searchData = [];
                let state = false;
                if (parseInt(this.stateNow_search)) {
                    state = true;
                }
                Axios.post(this.URL + '/game/compete/operation/loan', {
                    "loanId": this.loanNow_search,
                    "repaid": state
                }).then(Response => {
                    if (Response.data.code === 200) {
                        this.searchData = Response.data.data;
                    } else {
                        alert('查询获取失败');
                    }
                })
            },
            // 还款
            repay(id) {
                Axios.get(this.URL + '/game/compete/operation/loan/repay?loanEnterpriseId=' + id)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert('还款成功');
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            }
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'loanManage')
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/loanManage', 'money', 'loan');
            }, 1);
            this.getLoanInfo();
            this.search();
        },
        watch: {
            'loanNow': function(newVal) {
                this.getRateAndYear(newVal);
            }
        }
    }
</script>

<style lang="scss" scoped>
    #loanManage {
        width: 100%;
        .control {
            position: relative;
            height: 95%;
            .main {
                padding: 40px;
                li {
                    display: flex;
                    flex-direction: row;
                    height: 50px;
                    width: 100%;
                    border: 1px solid #aaa;
                    margin-top: -1px;
                    .T {
                        line-height: 50px;
                        text-align: center;
                        color: #666;
                        border-right: 1px solid #aaa;
                        background-color: #eee;   
                        flex: 0.3;
                    }
                    .info {
                        flex: 0.7;
                        padding-left: 20px;
                        line-height: 50px;
                        .v-select {
                            width: 200px;
                            height: 30px;
                        }
                        .v-input {
                            border: 0;
                        }
                    }
                }
                .remark {
                    line-height: 40px;
                    font-size: 16px;
                    span {
                        font-size: 18px;
                    }
                }
                .confirm {
                    position: absolute;
                    width: 110px;
                    right: 20px;
                    bottom: 20px;
                }
                .detail_button {
                    position: absolute;
                    width: 110px;
                    bottom: 20px;
                    right: 150px;
                }
            }
            .rule {
                position: absolute;
                right: 20px;
                font-size: 14px;
                color: #70C8F3;
                top: 70px;
            }
        }
        .detail {
            position: relative;
            height: 95%;
            .main {
                padding: 20px;
                .options {
                    ul {
                        display: flex;
                        flex-direction: row;
                        li {
                            margin-right: 30px;
                        }
                    }
                    select {
                        padding: 2px;
                    }
                    button {
                        cursor: pointer;
                        background-color: #fff;
                        border: 1px solid #aaa;
                        // padding: 10px;
                        width: 60px;
                        height: 24px;
                        border-radius: 5px;
                    }
                }
                .control_button {
                    position: absolute;
                    width: 110px;
                    right: 20px;
                    bottom: 20px;
                }
                table {
                    margin-top: 20px;
                }
            }
        }
    }
</style>