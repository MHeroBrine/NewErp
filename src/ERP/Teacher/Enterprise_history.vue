<template>
    <div id="teacher">
        <!-- <div class="container_default">
            <div class="title">
                <h3>产品市场占有率</h3>
            </div>
            <div class="main">
                <div class="echart" ref="echart_1">
                        
                </div>
            </div>
        </div> -->
        <div class="container">
            <div class="chart_temp">
                <div class="chart">
                    <div class="title">
                        <h3>产品市场占有率分析</h3>
                        <select v-model="input_product.gameId">
                            <option v-for="item in games" :value="item.id">{{ item.gameName }}</option>
                        </select>
                        <input type="text" placeholder="请输入期数" v-model="input_product.period">
                        <button @click="searchProduct()">查询</button>
                    </div>
                    <div class="main">
                        <div class="echart" ref="echart_1">

                        </div>
                    </div>
                </div>
                <div class="divide"></div>
                <div class="chart">
                    <div class="title">
                        <h3>综合市场占有率分析</h3>
                        <select v-model="input_market.gameId">
                            <option v-for="item in games" :value="item.id">{{ item.gameName }}</option>
                        </select>
                        <input type="text" placeholder="请输入期数" v-model="input_market.period">
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
                        <h3>ISO研发比率分析</h3>
                        <select v-model="input_ISO.gameId">
                            <option v-for="item in games" :value="item.id">{{ item.gameName }}</option>
                        </select>
                        <input type="text" placeholder="请输入期数" v-model="input_ISO.period">
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
                input_product: {
                    gameId: null,
                    period: null
                },
                input_market: {
                    gameId: null,
                    period: null
                },
                input_ISO: {
                    gameId: null,
                    period: null
                },
                games: []
            }
        },
        mounted() {
            // const that = this
            this.$store.commit('pageState', 'teacher');
            this.getMatchAvailable();
            // this.chartRender();
        },
        methods: {
            chartRender(number, option) {
                this.chart = [
                    this.$echarts.init(this.$refs['echart_1']),
                    this.$echarts.init(this.$refs['echart_2']),
                    this.$echarts.init(this.$refs['echart_3'])
                    // this.$echarts.init(this.$refs['echart_4'])
                ]

                // let option_1 = {
                //     xAxis: {
                //         data: ['企业一', '企业二', '企业三', '企业四', '企业五'],
                //         splitLine: {
                //             show: true
                //         },
                //         axisLabel: {
                //             show: true
                //         },
                //         axisLine:{
                //             lineStyle:{
                //                 color: '#6D6D6D',
                //                 width: 3
                //             }
                //         }
                //     },
                //     yAxis: {
                //         data: ['产品一', '产品二', '产品三', '产品四'],
                //         splitLine: {
                //             show: true
                //         },
                //         axisLabel: {
                //             show: true
                //         },
                //         axisLine:{
                //             lineStyle:{
                //                 color:'#6D6D6D',
                //                 width:3
                //             }
                //         }
                //     },
                //     grid: {
                //         show: true,
                //         containLabel: false,
                //         backgroundColor: '#eee',
                //         left: '14%',
                //         top: '10%',
                //         bottom: '10%',
                //         right: '10%'
                //     },
                //     series: [{
                //         data: [
                //             ['企业一', '产品一']
                //         ],
                //         type: 'scatter'
                //     }]
                // };
                // let option_2 = {
                //     xAxis: {
                //         data: ['企业一', '企业二', '企业三', '企业四', '企业五'],
                //         splitLine: {
                //             show: true
                //         },
                //         axisLabel: {
                //             show: true
                //         },
                //         axisLine:{
                //             lineStyle:{
                //                 color: '#6D6D6D',
                //                 width: 3
                //             }
                //         }
                //     },
                //     yAxis: {
                //         data: ['国际市场', '本地市场'],
                //         splitLine: {
                //             show: true
                //         },
                //         axisLabel: {
                //             show: true
                //         },
                //         axisLine:{
                //             lineStyle:{
                //                 color:'#6D6D6D',
                //                 width:3
                //             }
                //         }
                //     },
                //     grid: {
                //         show: true,
                //         containLabel: false,
                //         backgroundColor: '#eee',
                //         left: '14%',
                //         top: '10%',
                //         bottom: '10%',
                //         right: '10%'
                //     },
                //     series: [{
                //         data: [
                //             ['企业一', '产品一']
                //         ],
                //         type: 'scatter'
                //     }]
                // };
                // 使用刚指定的配置项和数据显示图表。
                // this.chart.setOption(option_1);
                this.chart[number - 1].setOption(option);
                // this.chart_3.setOption(option);
                
                let that = this;
                window.addEventListener('resize', function() {
                    // console.log(that.chart_1);
                    // that.chart_1.resize();
                    // that.chart_2.resize();
                    // that.chart_3.resize();
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
            },
            // 查询产品市场占有率分析
            searchProduct() {
                Axios.get(this.URL + '/game/compete/operation/product/history?gameId=' + this.input_product.gameId + '&period=' + this.input_product.period)
                    .then(Response => {
                        console.log(Response);
                        let enterpriseList = [];
                        let enterpriseData = [];
                        let temp = [];
                        if (Response.data.code === 200) {
                            for (let item in Response.data.data) {
                                enterpriseList.push(Response.data.data[item].enterpriseId);
                                for (let i in Response.data.data[item].productBasicVoList) {
                                    temp.push([Response.data.data[item].enterpriseId, Response.data.data[item].productBasicVoList[i].productName])
                                }
                                enterpriseData = temp;
                                console.log(enterpriseData);
                            }
                            let option = {
                                xAxis: {
                                    data: enterpriseList,
                                    splitLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color: '#6D6D6D',
                                            width: 3
                                        }
                                    }
                                },
                                yAxis: {
                                    data: ['P1', 'P2', 'P3', 'P4'],
                                    splitLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color:'#6D6D6D',
                                            width:3
                                        }
                                    }
                                },
                                grid: {
                                    show: true,
                                    containLabel: false,
                                    backgroundColor: '#eee',
                                    left: '20%',
                                    top: '10%',
                                    bottom: '10%',
                                    right: '5%'
                                },
                                series: [{
                                    data: [
                                        ...enterpriseData
                                    ],
                                    type: 'scatter'
                                }]
                            }
                            this.chartRender(1, option)
                        } else {
                            
                        }
                    })
            },
            // 查询综合市场占有率分析
            searchMarket() {
                Axios.get(this.URL + '/game/compete/operation/market/history?gameId=' + this.input_market.gameId + '&period=' + this.input_market.period)
                    .then(Response => {
                        console.log(Response);
                        let enterpriseList = [];
                        let enterpriseData = [];
                        let temp = [];
                        if (Response.data.code === 200) {
                            for (let item in Response.data.data) {
                                enterpriseList.push(Response.data.data[item].enterpriseId);
                                for (let i in Response.data.data[item].marketBasicVoList) {
                                    temp.push([Response.data.data[item].enterpriseId, Response.data.data[item].marketBasicVoList[i].marketName])
                                }
                                enterpriseData = temp;
                            }
                            let option = {
                                xAxis: {
                                    data: enterpriseList,
                                    splitLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color: '#6D6D6D',
                                            width: 3
                                        }
                                    }
                                },
                                yAxis: {
                                    data: ['本地市场', '区域市场', '国内市场', '国际市场'],
                                    splitLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color:'#6D6D6D',
                                            width:3
                                        }
                                    }
                                },
                                grid: {
                                    show: true,
                                    containLabel: false,
                                    backgroundColor: '#eee',
                                    left: '20%',
                                    top: '10%',
                                    bottom: '10%',
                                    right: '5%'
                                },
                                series: [{
                                    data: [
                                        ...enterpriseData
                                    ],
                                    type: 'scatter'
                                }]
                            }
                            this.chartRender(2, option)
                        } else {
                            
                        }
                    })
            },
            // 查询ISO认证率分析
            searchISO() {
                Axios.get(this.URL + '/game/compete/operation/product/history?gameId=' + this.input_ISO.gameId + '&period=' + this.input_ISO.period)
                    .then(Response => {
                        console.log(Response);
                        let enterpriseList = [];
                        let enterpriseData = [];
                        let temp = [];
                        if (Response.data.code === 200) {
                            for (let item in Response.data.data) {
                                enterpriseList.push(Response.data.data[item].enterpriseId);
                                for (let i in Response.data.data[item].isoBasicVoList) {
                                    temp.push([Response.data.data[item].enterpriseId, Response.data.data[item].isoBasicVoList[i].isoName])
                                }
                                enterpriseData = temp;
                                console.log(enterpriseData);
                            }
                            let option = {
                                xAxis: {
                                    data: enterpriseList,
                                    splitLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color: '#6D6D6D',
                                            width: 3
                                        }
                                    }
                                },
                                yAxis: {
                                    data: ['ISO9000质量认证', 'ISO9001质量认证', 'ISO9002质量认证', 'ISO9003质量认证'],
                                    splitLine: {
                                        show: true
                                    },
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color:'#6D6D6D',
                                            width:3
                                        }
                                    }
                                },
                                grid: {
                                    show: true,
                                    containLabel: false,
                                    backgroundColor: '#eee',
                                    left: '20%',
                                    top: '10%',
                                    bottom: '10%',
                                    right: '5%'
                                },
                                series: [{
                                    data: [
                                        ...enterpriseData
                                    ],
                                    type: 'scatter'
                                }]
                            }
                            this.chartRender(3, option)
                        } else {
                            
                        }
                    })
            },
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