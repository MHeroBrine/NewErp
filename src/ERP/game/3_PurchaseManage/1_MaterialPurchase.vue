<template>
    <div id="materialPurchase">
        <div class="nav">
            <a href=""></a>
            <h3>原料订购</h3>
        </div>
        <div class="container mg">

            <!-- Page-1 -->
            <div class="purchase mg" v-if="page.materialPurchase">
                <div class="title">
                    <span>原材料订购</span>&nbsp;&nbsp;<span>订单详情</span>
                </div>
                <table class="v-table mg">
                    <tr>
                        <th>原材料名</th>
                        <th>库存数量</th>
                        <th>单价</th>
                        <th>选择数量</th>
                    </tr>
                    <tr>
                        <td>R1</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1<img src="../../../assets/icon/plus.svg" alt=""><img src="../../../assets/icon/subtract.svg" alt=""></td>
                    </tr>
                    <tr>
                        <td>R2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1<img src="../../../assets/icon/plus.svg" alt=""><img src="../../../assets/icon/subtract.svg" alt=""></td>
                    </tr>
                    <tr>
                        <td>R3</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1<img src="../../../assets/icon/plus.svg" alt=""><img src="../../../assets/icon/subtract.svg" alt=""></td>
                    </tr>
                    <tr>
                        <td>R4</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1<img src="../../../assets/icon/plus.svg" alt=""><img src="../../../assets/icon/subtract.svg" alt=""></td>
                    </tr>
                </table>
                <div class="confirm">
                    <button class="v-button b-primary" @click="confirm_translate()">确认</button>
                    <button class="v-button b-primary">上一步</button>
                </div>
            </div>

            <div class="translate v-alert" v-if="float.translate">
                <div class="pre_container">
                    <div class="pre_title">
                        <h3>选择运输方式</h3>
                    </div>
                    <table class="v-table mg">
                        <tr>
                            <th>运输方式</th>
                            <th>等待周期</th>
                            <th>运费</th>
                            <th>操作</th>
                        </tr>
                        <tr>
                            <td>航运</td>
                            <td></td>
                            <td></td>
                            <td><button class="v-button b-primary">选择</button></td>
                        </tr>
                        <tr>
                            <td>铁运</td>
                            <td></td>
                            <td></td>
                            <td><button class="v-button b-primary">选择</button></td>
                        </tr>
                        <tr>
                            <td>水运</td>
                            <td></td>
                            <td></td>
                            <td><button class="v-button b-primary">选择</button></td>
                        </tr>
                        <tr>
                            <td>陆运</td>
                            <td></td>
                            <td></td>
                            <td><button class="v-button b-primary">选择</button></td>
                        </tr>
                    </table>
                    <div class="confirm">
                        <button class="v-button b-primary">确认</button>
                        <button class="v-button b-primary" @click="confirm_translate()">取消</button>
                    </div>
                </div>
            </div>

            <!-- Page-2 -->
            <div class="orderDetail mg">
                <div class="title">
                    <span>原材料订购</span>&nbsp;&nbsp;<span>订单详情</span>
                </div>
                <table class="v-table mg">
                    <tr>
                        <th>编号</th>
                        <th>原材料名</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>采购时间</th>
                        <th>运输方式</th>
                        <th>等待周期</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td>4382</td>
                        <td>R1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>**</td>
                        <td> </td>
                        <td>1</td>
                        <td><button class="v-button b-primary" @click="check()">审核</button></td>
                    </tr>
                    <tr>
                        <td>4382</td>
                        <td>R1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>**</td>
                        <td> </td>
                        <td>1</td>
                        <td><button class="v-button b-info b-disabled">已审核</button></td>
                    </tr>
                </table>
            </div>

            <div class="check v-alert" v-if="float.check">
                <div class="pre_container">
                    <div class="pre_title">
                        <h3>审核通过该采购单</h3>
                    </div>
                    <div class="text">
                        <p>注：</p>
                        <p>1.只有采购单的审核通过，系统才开始派送原材料。</p>
                        <p>2.派送原材料需要支付0.1w的运输费用。</p>
                    </div>
                    <div class="confirm">
                        <button class="v-button b-primary">确定</button>
                        <button class="v-button b-primary" @click="check()">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 页面
                page: {
                    materialPurchase: false,
                    orderDetail: true
                },
                // 浮窗
                float: {
                    translate: false,
                    check: false
                }
            }
        },
        methods: {
            // 选择运输方式
            confirm_translate() {
                this.$store.commit('controlFloatWindow');
                this.float.translate = !this.float.translate;
            },
            // 审核
            check() {
                this.$store.commit('controlFloatWindow');
                this.float.check = !this.float.check;
            }
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'materialPurchase')
        }
    }
</script>

<style lang="scss" scoped>
    #materialPurchase {
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
            margin-top: 50px;
            width: 1100px;
            height: 750px;
            background-color: #fff;
            border: 1px solid #000;
            .purchase {
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
            .translate {
                .pre_container {
                    height: 450px;
                    table {
                        margin-top: 30px;
                        width: 500px;
                    }   
                    .confirm {
                        width: 100%;
                        text-align: center;
                        button {
                            width: 100px;
                            margin: 30px;
                        }
                    }
                }
            }
            .orderDetail {
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
                    width: 900px;
                    margin-top: 50px;
                }
            }
            .check {
                .text {
                    padding: 20px;
                }
                p {
                    line-height: 25px;
                }
                .confirm {
                    width: 100%;
                    text-align: center;
                    button {
                        margin: 30px;
                        width: 100px;
                    }
                }
            }
        }
    }
</style>
