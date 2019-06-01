<template>
    <div id="marketDevelop">
        <div class="container_default mg">
            <div class="title">
                <h3>市场开发</h3>
            </div>
            <div class="chart">
                <div style="min-width: 800px;">
                    <ve-bar :data="chartData"></ve-bar>
                </div>
                <div style="min-width: 600px;">
                    <ve-pie :data="chartData"></ve-pie>
                    <!-- <ve-line :data="chartData"></ve-line> -->
                </div>
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
                    <tr>
                        <td>市场1</td>
                        <td>2</td>
                        <td>300</td>
                        <td>1</td>
                        <td>5</td>
                        <td>维护中</td>
                        <td>
                            <button class="v-button b-primary">开拓市场</button>
                        </td>
                    </tr>
                    <tr>
                        <td>市场1</td>
                        <td>2</td>
                        <td>300</td>
                        <td>1</td>
                        <td>5</td>
                        <td>维护中</td>
                        <td>
                            <button class="v-button b-primary">开拓市场</button>
                        </td>
                    </tr>
                    <tr>
                        <td>市场1</td>
                        <td>2</td>
                        <td>300</td>
                        <td>1</td>
                        <td>5</td>
                        <td>维护中</td>
                        <td>
                            <button class="v-button b-primary">开拓市场</button>
                        </td>
                    </tr>
                    <tr>
                        <td>市场1</td>
                        <td>2</td>
                        <td>300</td>
                        <td>1</td>
                        <td>5</td>
                        <td>维护中</td>
                        <td>
                            <button class="v-button b-primary">开拓市场</button>
                        </td>
                    </tr>
                    <tr>
                        <td>市场1</td>
                        <td>2</td>
                        <td>300</td>
                        <td>1</td>
                        <td>5</td>
                        <td>维护中</td>
                        <td>
                            <button class="v-button b-primary">开拓市场</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- <div class="nav">
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
        </div> -->
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // table的信息
                marketInfo: [],
                chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
            }
        },
        methods: {
            // 获取某个企业的全部市场开拓信息
            getMarketInfo() {
                Axios.get(this.URL + '/game/compete/operation/market/market/infos/get?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        this.marketInfo = Response.data.data;
                    }).catch(e => {
                        
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
            this.$store.commit('pageState', 'marketDevelop');
            this.getMarketInfo();
        }
    }
</script>

<style lang="scss" scoped>
    #marketDevelop {
        width: 100%;
        .container_default {
            height: auto;
            .chart {
                display: flex;
                flex-direction: row;
                height: 450px;
                margin: 0 100px 0 100px;
                padding-top: 50px;
                border-bottom: 1px solid #eee;
                .p1 {
                    width: 600px;
                    height: 600px;
                    border: 1px solid #000;
                }
            }
            .table {
                padding-top: 20px;
                margin: 0 100px 0 100px;
                padding-bottom: 50px;
                .v-table {
                    width: 1400px;
                }
            }
        }
    }
</style>
