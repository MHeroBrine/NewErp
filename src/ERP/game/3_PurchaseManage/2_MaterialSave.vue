<template>
    <div id="materialSave">
        <div class="container_default">
            <div class="title">
                <h3>原料订购</h3>
            </div>
            <div class="main">
                <table class="v-table mg">
                    <tr>
                        <th>编号</th>
                        <th>原材料名</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>总金额</th>
                        <th>采购时间</th>
                        <th>运输方式</th>
                        <th>等待周期</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in data">
                        <td>{{ item.orderNumber }}</td>
                        <td>{{ item.materialName }}</td>
                        <td>￥{{ item.materialPrice.toFixed(2) }}</td>
                        <td>{{ item.purchaseNumber }}</td>
                        <td>￥{{ (item.purchaseNumber * item.materialPrice).toFixed(2) }}</td>
                        <td>{{ item.purchaseTime }}</td>
                        <td>{{ item.transportMethod.transportName }}</td>
                        <td>{{ item.transportMethod.transportPeriod }}</td>
                        <td>
                            <button class="v-button b-disabled" v-if="item.transportStatus == 'TOCHECK'" @click="review(item.id)">待审核</button>
                            <button class="v-button b-disabled" v-if="item.transportStatus == 'CHECKED'">已审核</button>
                            <button class="v-button b-disabled" v-if="item.transportStatus == 'TRANSPORTING'">运输中</button>
                            <button class="v-button b-info" v-if="item.transportStatus == 'ARRIVED'">已到达</button>
                        </td>
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
    import Qs from 'qs';
    import Axios from 'axios';
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {
                data: [],
                page: {
                    detail: true,
                    storage: false
                },
                pageCount: 10
            }
        },
        methods: {
            storageDetail() {
                this.page.detail = false;
                this.page.storage = true;
            },
            // 获取订单信息
            getOrderInfo() {
                Axios.post(this.URL + '/game/compete/operation/stock/material/order/all', Qs.stringify({
                    enterpriseId: localStorage.getItem('enterpriseId')
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.data = Response.data.data;
                    } else {
                        alert('订单数据获取失败');
                    }
                })
            },
            // 分页页数随浏览器高度变换
            paginationWatch() {
                let body = document.getElementsByTagName('body')[0];
                let height = body.offsetHeight;
                let distance = height - 969;
                if (distance < 0) {
                    let level = parseInt(Math.abs(distance) / 50);
                    this.pageCount -= level;
                }
                if (this.pageCount < 5) {
                    this.pageCount = 5;
                }
            }
        },
        created() {
            this.paginationWatch();
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/materialSave', 'purchase', 'material');
            }, 1);
            this.$store.commit('pageState', 'materialSave');
            this.getOrderInfo();
        }
    }
</script>

<style lang="scss" scoped>
    #materialSave {
        width: 100%;
        .container_default {
            height: 95%;
            padding-bottom: 150px;
            .main {
                padding: 20px 50px 20px 50px;
                table {
                    // margin: 20px;
                }
            }
        }
    }
</style>
