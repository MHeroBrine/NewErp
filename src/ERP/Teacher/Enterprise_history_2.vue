<template>
    <div id="teacher">
        <div class="container">
            <div class="chart_temp">
                <div class="chart">
                    <div class="title">
                        <h3>厂房拥有率分析</h3>
                        <select v-model="input_factory.gameId">
                            <option v-for="item in games" :value="item.id">{{ item.gameName }}</option>
                        </select>
                        <input type="text" placeholder="请输入期数" v-model="input_factory.period">
                        <button @click="searchFactory()">查询</button>
                    </div>
                    <div class="main">
                        <div class="echart" ref="echart_1">

                        </div>
                    </div>
                </div>
                <div class="divide"></div>
                <div class="chart">
                    <div class="title">
                        <h3>生产线拥有率分析</h3>
                        <select v-model="input_produce.gameId">
                            <option v-for="item in games" :value="item.id">{{ item.gameName }}</option>
                        </select>
                        <input type="text" placeholder="请输入期数" v-model="input_produce.period">
                        <button @click="searchMarket()">查询</button>
                    </div>
                    <div class="main">
                        <div class="echart" ref="echart_2">

                        </div>
                    </div>
                </div>
            </div>
            <div class="middle"></div>
            <div class="chart_temp">
                <div class="chart">
                    <div class="title">
                        <h3>资金变动分析</h3>
                        <select v-model="input_money.gameId">
                            <option v-for="item in games" :value="item.id">{{ item.gameName }}</option>
                        </select>
                        <input type="text" placeholder="请输入期数" v-model="input_money.period">
                        <button @click="searchISO()">查询</button>
                    </div>
                    <div class="main">
                        <div class="echart" ref="echart_3">

                        </div>
                    </div>
                </div>
                <div class="divide"></div>
                <div class="chart">
                    <div class="title"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                input_factory: {
                    gameId: null,
                    period: null
                },
                input_produce: {
                    gameId: null,
                    period: null
                },
                input_money: {
                    gameId: null,
                    period: null
                },
                games: []
            }
        },
        mounted() {
            this.$store.commit('pageState', 'teacher');
            this.getMatchAvailable();
        },
        methods: {
            chartRender(number, option) {
                this.chart = [
                    this.$echarts.init(this.$refs['echart_1']),
                    this.$echarts.init(this.$refs['echart_2']),
                    this.$echarts.init(this.$refs['echart_3'])
                ]
                this.chart[number - 1].setOption(option);
                
                let that = this;
                window.addEventListener('resize', function() {
                    that.chart[number - 1].resize();
                })
            },
            // 获取所有可以查询的比赛
            getMatchAvailable() {
                Axios.post(this.URL + '/game/manage/search', {
                    "concurrentPage": 1,
                    "gameStatusEnum": "OVER",
                    "pageSize": 6
                }).then(Response => {
                    if (Response.data.code === 200) {
                        // console.log(Response.data.data);
                        this.games = Response.data.data.pageData;
                    } else {
                        alert('获取比赛数据失败');
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #teacher {
        width: 100%;
        .container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 40px;
            .middle {
                min-width: 10px;
                flex: 0.04;
            }
            .chart_temp {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex: 0.48;
                .chart {
                    flex: 0.49;
                    background-color: #fff;
                    .title {
                        position: relative;
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        padding-left: 15px;
                        font-size: 14px;
                        color: #666;
                        // font-weight: bold;
                        border-bottom: 1px solid #eee;
                        select {
                            position: absolute;
                            top: 10px;
                            padding: 2px 0 2px 0;
                            right: 10px;
                            width: 85px;
                            max-width: 85px;
                            font-size: 12px;
                            color: #aaa;
                            border: 1px solid #aaa;
                            border-radius: 5px;
                            &:nth-of-type(1) {
                                right: 150px;
                            }
                            option {
                                // max-width: 85px;
                                width: 400px;
                            }
                        }
                        input {
                            position: absolute;
                            top: 10px;
                            padding: 2px 2px 2px 5px;
                            right: 60px;
                            width: 75px;
                            height: 16px;
                            max-width: 85px;
                            font-size: 12px;
                            color: #aaa;
                            border: 1px solid #aaa;
                            border-radius: 5px;
                        }
                        button {
                            position: absolute;
                            top: 9px;
                            right: 10px;
                            width: 40px;
                            height: 24px;
                            cursor: pointer;
                            font-size: 10px;
                            border-radius: 5px;
                            border: 1px solid #aaa;
                            background-color: #eee;
                        }
                    }
                    .main {
                        width: 100%;
                        height: 100%;
                        margin-top: -40px;
                        padding-top: 40px;
                        .echart {
                            padding-top: 10px;
                            width: 80%;
                            height: 90%;
                        }
                    }
                }
                .divide {
                    min-height: 10px;
                    flex: 0.02;
                }
            }
        }
    }
</style>