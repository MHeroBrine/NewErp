<template>
    <div id="orderDetail">
        <div class="container_default">
            <div class="title">
                <h3>订单详情</h3>
            </div>
            <div class="main">
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
                        <!-- <th>操作</th> -->
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
                        <!-- <td><button class="v-button b-primary" @click="handle(item.id)">交货</button></td> -->
                    </tr>
                </table>

                <v-pagination-list
                :data="data"
                :divide="pageCount"
                v-on:change="data = $event">
                </v-pagination-list>
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
                pageCount: 10
            }
        },
        created() {
            this.pageCount = this.Util.paginationWatch(this.pageCount, 5);
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/orderDetail', 'sold', 'detail');
            }, 1);
            this.$store.commit('pageState', 'delivery');
            this.getOrder();
        },
        methods: {
            // 获取未交货的订单
            // getOrder() {
            //     Axios.get(this.URL + '/game/compete/operation/order/status?enterpriseId=' + localStorage.getItem('enterpriseId') + '&orderStatus=true')
            //         .then(Response => {
            //             if (Response.data.code === 200) {
            //                 this.data = Response.data.data;
            //             } else {
            //                 alert(Response.data.msg);
            //             }
            //         })
            // },
            // 获取一个企业的全部订单
            getOrder() {
                Axios.get(this.URL + '/game/compete/operation/order/all?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.data = Response.data.data;
                        } else {
                            alert('获取订单信息失败');
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #orderDetail {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                padding: 20px 50px 20px 50px;
            }
        }
    }
</style>
