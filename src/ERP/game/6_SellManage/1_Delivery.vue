<template>
    <div id="delivery">
        <div class="nav">
            <a href=""></a>
            <h3>按订单交货</h3>
        </div>
        <div class="container mg">
        
            <div class="delivery mg">
                <div class="title">
                    <span>原材料订购</span>&nbsp;&nbsp;<span>订单详情</span>
                </div>
                <table class="v-table mg">
                    <tr>
                        <th>订单编号</th>
                        <th>市场</th>
                        <th>产品</th>
                        <th>数量</th>
                        <th>单价</th>
                        <th>总金额</th>
                        <th>交货时间</th>
                        <th>账期</th>
                        <th>罚金率</th>
                        <th>操作</th>
                    </tr>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.$store.commit('pageState', 'delivery');
        }
    }
</script>

<style lang="scss" scoped>
    #delivery {
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
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            margin-top: 50px;
            width: 1100px;
            height: 750px;
            background-color: #fff;
            border: 1px solid #000;
            .delivery {
                position: relative;
                margin-top: 50px;
                width: 1000px;
                height: 650px;
                border: 1px solid #000;
                .title {
                    width: 1000px;
                    text-align: center;
                    position: absolute;
                    top: -22px;
                    font-size: 18px;
                }
                table {
                    margin-top: 50px;  
                    td {
                        &:nth-last-of-type(1) {
                            position: relative;
                            img {
                                position: absolute;
                                top: 10px;
                                width: 30px;
                                &:nth-of-type(1) {
                                    left: 40px;    
                                }
                                &:nth-of-type(2) {
                                    left: 80px;
                                } 
                            }
                        }
                    } 
                }
                .confirm {
                    margin-top: 100px;
                    width: 100%;
                    text-align: center;
                    button {
                        width: 120px;
                        margin: 50px;
                    }
                }
            }
        }
    }
</style>
