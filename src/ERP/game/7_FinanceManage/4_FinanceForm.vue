<template>
    <div id="financeForm">
        <div class="container_default">
            <div class="title">
                <h3>财务报表</h3>
            </div>
            <div class="main">
                <table class="v-table_border">
                    <tr>
                        <th>变动原因</th>
                        <th>变动金额</th>
                        <th>余额</th>
                    </tr>
                    <!-- <tr style="background: #eee;">
                        <td>{{ dataNow.changeOperating }}</td>
                        <td>{{ dataNow.changeAmount }}</td>
                        <td>{{ dataNow.currentAccount }}（当前）</td>
                    </tr> -->
                    <tr v-for="item in dataHistory">
                        <td>{{ item.changeOperating }}</td>
                        <td>{{ item.changeAmount }}</td>
                        <td>{{ item.currentAccount }}</td>
                    </tr>
                </table>

                <v-pagination-list
                :data="dataHistory"
                :divide="pageCount"
                v-on:change="dataHistory = $event">
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
                dataNow: [],
                dataHistory: [],
                pageCount: 10
            }
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'financeForm')
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/financeForm', 'money', 'finance');
            }, 1);
            this.getInfoAll();
            this.getInfoNow();
            this.paginationWatch();
        },
        methods: {
            getInfoAll() {
                Axios.get(this.URL + '/game/compete/operation/finance/all?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.dataHistory = Response.data.data.reverse();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            getInfoNow() {
                Axios.get(this.URL + '/game/compete/operation/finance/current?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.dataNow = Response.data.data;
                        } else {
                            alert(Response.data.msg);
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
            },
        }
    }
</script>

<style lang="scss" scoped>
    #financeForm {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                padding: 20px;
                padding-bottom: 150px;
                table {
                    // padding-bottom: 150px;
                }
            }
        }
    }
</style>