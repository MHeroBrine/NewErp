<template>
    <div id="marketDevelop">
        <div class="container_default mg">
            <div class="title">
                <h3>市场开发</h3>
            </div>
            <div class="table">
                <table class="v-table mg">
                    <tr>
                        <th>市场名称</th>
                        <th>开拓总期数</th>
                        <th>每期开拓费用</th>
                        <th>每期维护费用</th>
                        <th>已拓展期数</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in marketInfo">
                        <td>{{ item.marketName }}</td>
                        <td>{{ item.marketResearchPeriod }}</td>
                        <td>{{ item.marketResearchCost }}</td>
                        <td>{{ item.marketMaintainCost }}</td>
                        <td>{{ item.researchedPeriod == null ? '-' : item.researchedPeriod }}</td>
                        <td v-if="item.marketStatus == 'DEVELOPED'">
                            维护中
                        </td>
                        <td v-if="item.marketStatus == 'TODEVELOP'">
                            未开拓
                        </td>
                        <td v-if="item.marketStatus == 'DEVELOPING'">
                            开拓中
                        </td>
                        <td v-if="item.marketStatus == 'DEVELOPPAUSE'">
                            开拓中
                        </td>
                        <td>
                            <button class="v-button b-primary" v-if="item.marketStatus == 'TODEVELOP'" @click="start(item.id)">开拓市场</button>
                            <button class="v-button b-primary" v-if="item.marketStatus == 'DEVELOPING'" @click="pause(item.id)">暂停开拓</button>
                            <button class="v-button b-primary" v-if="item.marketStatus == 'DEVELOPPAUSE'" @click="develop(item.id)">继续开拓</button>
                            <button class="v-button b-info b-disabled" v-if="item.marketStatus == 'DEVELOPED'">已研发</button>
                        </td>
                    </tr>
                </table>
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
                marketInfo: []
            }
        },
        methods: {
            // 获取某个企业的全部市场开拓信息
            getMarketInfo() {
                Axios.get(this.URL + '/game/compete/operation/market?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        this.marketInfo = Response.data.data;
                    }).catch(e => {
                        
                    })
            },

            // 市场部分
            // 开始开拓
            start(id) {
                let i = confirm('开始开拓该市场？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/market/start?marketDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getMarketInfo();
                        } else {
                            alert('开拓市场失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            },
            // 暂停开拓
            pause(id) {
                let i = confirm('暂停开拓该市场？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/market/pause?marketDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getMarketInfo();
                        } else {
                            alert('暂停开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            },
            // 继续开拓
            develop(id) {
                let i = confirm('继续开拓该市场？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/market/develop?marketDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getMarketInfo();
                        } else {
                            alert('继续开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            }
        },
        mounted() {
            this.$store.commit('pageState', 'marketDevelop');
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/marketDevelop', 'marketManage', 'dev');
            }, 1);
            this.getMarketInfo();
        }
    }
</script>

<style lang="scss" scoped>
    #marketDevelop {
        width: 100%;
        .container_default {
            height: 95%;
            .chart {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: 450px;
                margin: 0 100px 0 100px;
                padding-top: 50px;
                border-bottom: 1px solid #eee;
                .chart_temp {
                    flex: 0.4;
                }
                .p1 {
                    width: 600px;
                    height: 600px;
                    border: 1px solid #000;
                }
            }
            .table {
                padding: 20px 50px 20px 50px;
                button {
                    width: 80px;
                }
            }
        }
    }
</style>
