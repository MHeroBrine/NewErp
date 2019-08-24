<template>
    <div class="index">
        <ul class="main">
            <li @click="toIndex()" style="margin-top: 20px;" class="mainItem" v-bind:class="{ active: active.index.state }">
                <img src="@/assets/Game/Index/index.svg" v-show="!active.index.state">
                <img src="@/assets/Game/Index/index_active.svg" v-show="active.index.state">
                <router-link v-bind:class="{ activeIndex: active.index.state }" to="/index" class="home">首页</router-link>
            </li>

            <li @click="controlDown('marketManage')" class="mainItem" v-bind:class="{ active: active.marketManage.state || active.marketManage.down }">
                <img src="@/assets/Game/Index/manage.svg" v-show="!(active.marketManage.state || active.marketManage.down)">
                <img src="@/assets/Game/Index/manage_active.svg" v-show="active.marketManage.state || active.marketManage.down">
                <span>市场管理</span><i>+</i>
                <ul v-bind:class="{ list: active.marketManage.down }">
                    <li @click="controlItem('/game/marketDevelop', 'marketManage', 'dev')" v-bind:class="{ active: active.marketManage.dev }"><router-link to="/game/marketDevelop">市场开发</router-link></li>
                    <li @click="controlItem('/game/orderManage', 'marketManage', 'manage')" v-bind:class="{ active: active.marketManage.manage }"><router-link to="/game/orderManage">订单管理</router-link></li>
                </ul>
            </li>

            <li @click="controlDown('productManage')" class="mainItem" v-bind:class="{ active: active.productManage.state || active.productManage.down }">
                <img src="@/assets/Game/Index/product.svg" v-show="!(active.productManage.state || active.productManage.down)">
                <img src="@/assets/Game/Index/product_active.svg" v-show="active.productManage.state || active.productManage.down">
                <span>产品管理</span><i>+</i>
                <ul v-bind:class="{ list: active.productManage.down }">
                    <li @click="controlItem('/game/productBuild', 'productManage', 'build')" v-bind:class="{ active: active.productManage.build }"><router-link to="/game/productBuild">产品构成</router-link></li>
                    <li @click="controlItem('/game/productStudy', 'productManage', 'study')" v-bind:class="{ active: active.productManage.study }"><router-link to="/game/productStudy">产品研发</router-link></li>
                    <li @click="controlItem('/game/ISO', 'productManage', 'ISO')" v-bind:class="{ active: active.productManage.ISO }"><router-link to="/game/ISO">ISO认证</router-link></li>
                </ul>
            </li>

            <li @click="controlDown('purchase')" class="mainItem" v-bind:class="{ active: active.purchase.state || active.purchase.down }">
                <img src="@/assets/Game/Index/buycar.svg" v-show="!(active.purchase.state || active.purchase.down)">
                <img src="@/assets/Game/Index/buycar_active.svg" v-show="active.purchase.state || active.purchase.down">
                <span>采购管理</span><i>+</i>
                <ul v-bind:class="{ list: active.purchase.down }">
                    <li @click="controlItem('/game/materialPurchase', 'purchase', 'purchase')" v-bind:class="{ active: active.purchase.purchase }"><router-link to="/game/materialPurchase">原料订购</router-link></li>
                    <li @click="controlItem('/game/materialSave', 'purchase', 'material')" v-bind:class="{ active: active.purchase.material }"><router-link to="/game/materialSave">原料入库</router-link></li>
                </ul>
            </li>

            <li @click="controlDown('storage')" class="mainItem" v-bind:class="{ active: active.storage.state || active.storage.down }">
                <img src="@/assets/Game/Index/material.svg" v-show="!(active.storage.state || active.storage.down)">
                <img src="@/assets/Game/Index/material_active.svg" v-show="active.storage.state || active.storage.down">
                <span>仓库管理</span><i>+</i>
                <ul v-bind:class="{ list: active.storage.down }">
                    <li @click="controlItem('/game/storageManage', 'storage', 'manage')" v-bind:class="{ active: active.storage.manage }"><a>库存管理</a></li>
                    <!-- <li @click="controlItem('/game/storageCount', 'storage', 'count')" v-bind:class="{ active: active.storage.count }"><a>库存盘点</a></li> -->
                </ul>
            </li>

            <li @click="controlDown('produce')" class="mainItem" v-bind:class="{ active: active.produce.state || active.produce.down }">
                <img src="@/assets/Game/Index/produce.svg" v-show="!(active.produce.state || active.produce.down)">
                <img src="@/assets/Game/Index/produce_active.svg" v-show="active.produce.state || active.produce.down">
                <span>生产管理</span><i>+</i>
                <ul v-bind:class="{ list: active.produce.down }">
                    <li @click="controlItem('/game/producePlan', 'produce', 'plan')" v-bind:class="{ active: active.produce.plan }"><a>生产计划</a></li>
                    <li @click="controlItem('/game/factoryManage', 'produce', 'manage')" v-bind:class="{ active: active.produce.manage }"><a>厂房管理</a></li>
                </ul>
            </li>

            <li @click="controlDown('sold')" class="mainItem" v-bind:class="{ active: active.sold.state || active.sold.down }">
                <img src="@/assets/Game/Index/sold.svg" v-show="!(active.sold.state || active.sold.down)">
                <img src="@/assets/Game/Index/sold_active.svg" v-show="active.sold.state || active.sold.down">
                <span>销售管理</span><i>+</i>
                <ul v-bind:class="{ list: active.sold.down }">
                    <li @click="controlItem('/game/delivery', 'sold', 'delivery')" v-bind:class="{ active: active.sold.delivery }"><a>按订单交货</a></li>
                    <li @click="controlItem('/game/orderDetail', 'sold', 'detail')" v-bind:class="{ active: active.sold.detail }"><a>订单详情</a></li>
                </ul>
            </li>

            <li @click="controlDown('money')" class="mainItem" v-bind:class="{ active: active.money.state || active.money.down }">
                <img src="@/assets/Game/Index/money.svg" v-show="!(active.money.state || active.money.down)">
                <img src="@/assets/Game/Index/money_active.svg" v-show="active.money.state || active.money.down">
                <span>财务管理</span><i>+</i>
                <ul v-bind:class="{ list: active.money.down }">
                    <!-- <li @click="controlItem('/game/taxManage', 'money', 'tax')" v-bind:class="{ active: active.money.tax }"><a>税金管理</a></li> -->
                    <!-- <li @click="controlItem('/game/accountMoney', 'money', 'account')" v-bind:class="{ active: active.money.account }"><a>账户资金</a></li> -->
                    <li @click="controlItem('/game/loanManage', 'money', 'loan')" v-bind:class="{ active: active.money.loan }"><a>贷款管理</a></li>
                    <li @click="controlItem('/game/financeForm', 'money', 'finance')" v-bind:class="{ active: active.money.finance }"><a>财务报表</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import VueEvent from '../../model/VueEvent';
    
    export default {
        data() {
            return {
                // 侧栏状态
                active: {
                    index: {
                        state: true
                    },
                    marketManage: {
                        state: false,
                        down: false,
                        
                        dev: false,
                        manage: false
                    },
                    productManage: {
                        state: false,
                        down: false,

                        build: false,
                        study: false,
                        ISO: false
                    },
                    purchase: {
                        state: false,
                        down: false,

                        purchase: false,
                        material: false
                    },
                    storage: {
                        state: false,
                        down: false,

                        manage: false,
                        count: false
                    },
                    produce: {
                        state: false,
                        down: false,

                        plan: false,
                        manage: false
                    },
                    sold: {
                        state: false,
                        down: false,

                        delivery: false,
                        detail: false
                    },
                    money: {
                        state: false,
                        down: false,

                        tax: false,
                        account: false,
                        loan: false,
                        finance: false
                    }
                }
            }
        },
        beforeMount() {
            this.linkState();
        },
        methods: {
            linkTo(address) {
                this.$router.push(address);
            },
            // 控制下拉
            controlDown(val) {
                this.active = this.Util.initData(this.active, 'down', false);
                this.active[val].down = true;
            },
            // 控制项跳转
            controlItem(address, val, item) {
                this.active = this.Util.initData(this.active, 'ALL', false);
                this.active[val][item] = true;
                this.$router.push(address);
                this.controlDown(val);
            },
            // 跳转首页
            toIndex() {
                this.active = this.Util.initData(this.active, 'ALL', false);
                this.active.index.state = true;
                this.$router.push('/index');
            },
            // 路由跳转对应状态
            linkState() {
                let that = this;
                VueEvent.$on('sidebarState', function(address, val, item) {
                    that.controlItem(address, val, item);
                })
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
                margin-left: 10px;
                margin-top: 5px;
                border-radius: 5px;
                font-size: 14px;
                img {
                    width: 21px;
                    height: 15px;
                    top: 16px;
                    left: 10px;
                    position: absolute;
                }
                .home, span {
                    color: #AEB2B7;
                    position: absolute;
                    left: 38px;
                }
                .activeIndex {
                    color: #fff;
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
                        background-color: #35404D;
                        padding-left: 37.5px;
                        width: 100%;
                        a {
                            position: relative;
                            color: #AEB2B7;
                            left: 0;
                        }
                        line-height: 45px;
                        &:hover {
                            a {
                                color: #F9685F;
                            }
                        }
                    }
                    .active {
                        a {
                            color: #F9685F;
                        }
                    }
                }
                .list {
                    transition: max-height 0.75s;
                    max-height: 200px;
                }
                &:hover {
                    // background-color: #35404D;
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
