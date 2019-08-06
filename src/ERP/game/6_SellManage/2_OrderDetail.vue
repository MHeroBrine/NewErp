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
                        <th>罚金率</th>
                        <th>操作</th>
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
