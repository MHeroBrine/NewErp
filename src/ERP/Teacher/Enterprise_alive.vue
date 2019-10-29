<template>
    <div id="teacher">
        <div class="container">
            <div class="chart_temp">
                <div class="chart">
                    <div class="title"></div>
                    <div class="main"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
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