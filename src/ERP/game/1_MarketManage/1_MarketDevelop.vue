<template>
    <div id="marketDevelop">
        <div class="nav">
            <h3>市场开发</h3>
        </div>
        <div class="container mg">
            <div class="chart">
                <div>图表</div>
                <div></div>
            </div>
            <div class="marketList">
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

    export default {
        data() {
            return {
                // table的信息
                marketInfo: [],
            }
        },
        methods: {
            // 获取某个企业的全部市场开拓信息
            getMarketInfo() {
                Axios.get(this.URL + '/game/compete/operation/market/market/infos/get?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        console.log(Response);
                        this.marketInfo = Response.data.data;
                    }).catch(e => {
                        console.log(e);
                    })
            },

            // 市场部分
            // 开始开拓
            start(id) {
                Axios.put(this.URL + '/game/compete/operation/market/market/infos/update/start?marketDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getMarketInfo();
                        } else {
                            alert('开拓市场失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            },
            // 暂停开拓
            pause(id) {
                Axios.put(this.URL + '/game/compete/operation/market/market/infos/update/pause?marketDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getMarketInfo();
                        } else {
                            alert('暂停开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            },
            // 继续开拓
            develop(id) {
                Axios.put(this.URL + '/game/compete/operation/market/market/infos/update/develop?marketDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getMarketInfo();
                        } else {
                            alert('继续开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            }
        },
        mounted() {
            this.$store.commit('pageState', 'marketDevelop')
            this.getMarketInfo();
        }
    }
</script>

<style lang="scss" scoped>
    #marketDevelop {
        width: 100%;
        .nav {
            width: 100%;
            height: 60px;   
            border-bottom: 1px solid #000;
            h3 {
                line-height: 60px;
                font-size: 22px;
                margin-left: 20px;
            }
        } 
        .container {
            width: 1100px;
            .chart {
                margin-top: 50px;
                width: 1100px;
                height: 320px;
                border: 1px solid #000;
                display: flex;
                flex-wrap: wrap;
                div {
                    height: 100%;
                    flex: 1;
                }
            }
            .marketList {
                padding-top: 20px;
                border: 1px solid #000;
                width: 1100px;
                height: 300px;
                margin-top: 50px;
                table {
                    width: 1050px;
                }
            }
        }
    }
</style>
