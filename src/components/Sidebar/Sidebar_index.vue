<template>
    <div class="index">
        <ul class="main">
            <li style="margin-top: 20px;" class="mainItem" v-bind:class="{ active: active.index }">
                <img src="@/assets/Game/Index/index.svg" v-show="!active.index">
                <img src="@/assets/Game/Index/index_active.svg" v-show="active.index">
                <router-link to="/index" class="home">首页</router-link>
            </li>

            <li class="mainItem" v-bind:class="{ active: active.marketManage.state }">
                <img src="@/assets/Game/Index/manage.svg" v-show="!active.marketManage.state">
                <img src="@/assets/Game/Index/manage_active.svg" v-show="active.marketManage.state">
                <span>市场管理</span><i @click="active.marketManage.down = !active.marketManage.down">+</i>
                <ul v-bind:class="{ list: active.marketManage.down }">
                    <li><router-link to="/game/marketDevelop">市场开发</router-link></li>
                    <li><router-link to="/game/orderManage">订单管理</router-link></li>
                </ul>
            </li>

            <li class="mainItem" v-bind:class="{ active: active.productManage.state }">
                <img src="@/assets/Game/Index/product.svg">
                <span>产品管理</span><i @click="active.productManage.down = !active.productManage.down">+</i>
                <ul v-bind:class="{ list: active.productManage.down }">
                    <li><router-link to="/game/productBuild">产品构成</router-link></li>
                    <li><router-link to="/game/productStudy">产品研发</router-link></li>
                    <li><router-link to="/game/ISO">ISO认证</router-link></li>
                </ul>
            </li>

            <li class="mainItem" v-bind:class="{ active: active.purchase.state }">
                <img src="@/assets/Game/Index/buycar.svg">
                <span>采购管理</span><i @click="active.purchase.down = !active.purchase.down">+</i>
                <ul v-bind:class="{ list: active.purchase.down }">
                    <li><router-link to="/game/materialPurchase">原料订购</router-link></li>
                    <li><router-link to="/game/materialSave">原料入库</router-link></li>
                </ul>
            </li>

            <li class="mainItem" v-bind:class="{ active: active.material.state }">
                <img src="@/assets/Game/Index/material.svg" alt="">
                <span>仓库管理</span><i @click="active.material.down = !active.material.down">+</i>
                <ul v-bind:class="{ list: active.material.down }">
                    <li><router-link to="/game/storageManage">库存管理</router-link></li>
                    <li><router-link to="/game/storageCount">库存盘点</router-link></li>
                </ul>
            </li>

            <li class="mainItem" v-bind:class="{ active: active.produce.state }">
                <img src="@/assets/Game/Index/produce.svg">
                <span>生产管理</span><i @click="active.produce.down = !active.produce.down">+</i>
                <ul v-bind:class="{ list: active.produce.down }">
                    <li><router-link to="/game/producePlan">生产计划</router-link></li>
                    <li><router-link to="/game/factoryManage">厂房管理</router-link></li>
                </ul>
            </li>

            <li class="mainItem" v-bind:class="{ active: active.sold.state }">
                <img src="@/assets/Game/Index/sold.svg" alt="">
                <span>销售管理</span><i @click="active.sold.down = !active.sold.down">+</i>
                <ul v-bind:class="{ list: active.sold.down }">
                    <li><router-link to="/game/delivery">按订单交货</router-link></li>
                    <li><router-link to="/game/orderDetail">订单详情</router-link></li>
                </ul>
            </li>

            <li class="mainItem" v-bind:class="{ active: active.money.state }">
                <img src="@/assets/Game/Index/money.svg" alt="">
                <span>财务管理</span><i @click="active.money.down = !active.money.down">+</i>
                <ul v-bind:class="{ list: active.money.down }">
                    <li><router-link to="/game/taxManage">税金管理</router-link></li>
                    <li><router-link to="/game/accountMoney">账户资金</router-link></li>
                    <li><router-link to="/game/loanManage">贷款管理</router-link></li>
                    <li><router-link to="/game/financeForm">财务报表</router-link></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 侧栏状态
                active: {
                    index: false,
                    marketManage: {
                        state: true,
                        down: true,
                        dev: false,
                        manage: false
                    },
                    productManage: {
                        state: false,
                        down: false
                    },
                    purchase: {
                        state: false,
                        down: false,
                    },
                    material: {
                        state: false,
                        down: false
                    },
                    produce: {
                        state: false,
                        down: false
                    },
                    sold: {
                        state: false,
                        down: false
                    },
                    money: {
                        state: false,
                        down: false
                    }
                }
            }
        },
        watch: {
            'active': function(val) {
                console.log(val);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .index {
        display: flex;
        flex-direction: row;
        width: 210px;
        height: 100%;
        border-right: 1px solid #000;
        background-color: #2A3542;
        .main {
            width: 100%;
            .mainItem {
                cursor: pointer;
                display: flex;
                flex-direction: column;
                position: relative;
                box-sizing: border-box;
                width: 190px;
                min-height: 47px;
                line-height: 47px;
                padding-left: 10px;
                margin-left: 10px;
                margin-top: 5px;
                border-radius: 5px;
                font-size: 14px;
                img {
                    width: 21px;
                    height: 15px;
                    top: 16px;
                    position: absolute;
                }
                .home, span {
                    color: #AEB2B7;
                    position: absolute;
                    left: 38px;
                }
                i {
                    cursor: pointer;
                    font-size: 16px;
                    color: #AEB2B7;
                    position: absolute;
                    right: 10px;
                }
                ul {
                    transition: max-height 0.5s;
                    max-height: 0;
                    overflow: hidden;
                    margin-top: 47px;
                    li {
                        a {
                            position: relative;
                            color: #AEB2B7;
                            left: 0;
                        }
                        line-height: 45px;
                        padding-left: 27.5px;
                        &:hover {
                            a {
                                color: #F9685F;
                            }
                        }
                    }
                }
                .list {
                    transition: max-height 0.75s;
                    max-height: 200px;
                }
                &:hover {
                    background-color: #35404D;
                    span {
                        color: #fff;
                    }
                }
            }
            .active {
                background-color: #35404D;
                span {
                    color: #fff;
                }
            }
        }
    }
</style>
