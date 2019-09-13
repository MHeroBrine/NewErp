<template>
    <div id="delivery">
        <div class="container_default">
            <div class="title">
                <h3>按订单交货</h3>
            </div>
            <div class="main" v-show="page.main">
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
                        <!-- <th>罚金率</th> -->
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in data">
                        <td>{{ item.id }}</td>
                        <td>{{ item.marketType.marketName }}</td>
                        <td>{{ item.productType.productName }}</td>
                        <td>{{ item.productNumber }}</td>
                        <td>{{ item.productPrice }}</td>
                        <td>{{ item.totalPrice }}</td>
                        <td>{{ item.orderEndPeriod }}</td>
                        <td>{{ item.deliveryPeriod }}</td>
                        <td><button class="v-button b-primary" @click="handle(item.id)">交货</button></td>
                    </tr>
                </table>

                <v-pagination-list
                :data="data"
                :divide="pageCount"
                v-on:change="data = $event">
                </v-pagination-list>
            </div>
            <div class="delivery" v-show="page.delivery">
                <div class="state mg">
                    <div class="out">出库</div>
                    <img src="@/assets/Game/6_SellManage/arrow.svg">
                    <div class="in">收款</div>
                </div>
                <div class="detail mg">
                    <div class="intro">
                        <span>编号：<a>189068</a></span><span>创建人：<a>用户名</a></span><span>销售时间：<a>7</a></span>
                    </div>
                    <table class="v-table">
                        <tr>
                            <th>产品名</th>
                            <th>市场</th>
                            <th>数量</th>
                            <th>单价</th>
                            <th>金额</th>
                            <th>已出库数</th>
                        </tr>
                    </table>
                </div>
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
                data: [],
                pageCount: 10,

                page: {
                    main: true,
                    delivery: false
                }
            }
        },
        created() {
            this.pageCount = this.Util.paginationWatch(this.pageCount, 5);
        },
        mounted() {
            this.getOrder();
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/delivery', 'sold', 'delivery');
            }, 1);
            this.$store.commit('pageState', 'delivery');
        },
        methods: {
            // 获取未交货的订单
            getOrder() {
                Axios.get(this.URL + '/game/compete/operation/order/status?enterpriseId=' + localStorage.getItem('enterpriseId') + '&orderStatus=false')
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.data = Response.data.data;
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            // 交货
            handle(id) {
                let i = confirm('是否确认交货');
                if (i) {
                    Axios.post(this.URL + '/game/compete/operation/order/delivery?orderId=' + id)
                        .then(Response => {
                            if (Response.data.code === 200) {
                                this.$store.commit('controlAlert', [true, 'TRUE', '交货成功', null, null, null]);
                                setTimeout(() => {
                                    this.$store.commit('controlAlert', [false]);
                                    this.getOrder();
                                }, 1500);
                            } else {
                                alert(Response.data.msg);
                            }
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #delivery {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                padding: 20px 50px 20px 50px;
            }
            .delivery {
                width: 100%;
                .state {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 700px;
                    height: 140px;
                    div {
                        margin-top: 20px;
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        color: #fff;
                        font-size: 22px;
                        text-align: center;
                        line-height: 120px;
                    }
                    .out {
                        background-color: #A9D86E;
                    }
                    .in {
                        color: #000;
                        background-color: #aaa;
                    }
                }
                .detail {
                    width: 900px;
                    padding: 20px;
                    margin-top: 50px;
                    .intro {
                        display: flex;
                        justify-content: space-between;
                        span {
                            a {
                                font-size: 12px;
                            }
                        }
                    }
                    table {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
</style>
