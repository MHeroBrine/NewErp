<template>
    <div id="accountMoney">
        <div class="container_default">
            <div class="title">
                <h3>账户资金</h3>
            </div>
            <div class="main">
                <div class="card" v-show="page.card">
                    <div class="img">
                        <img src="@/assets/Game/7_FinanceManage/card.svg" alt="">
                    </div>
                    <div class="info">
                        <p>银行卡号：1234567890</p>
                        <p>账户余额：19万</p>
                        <p>借入金额：0</p>
                    </div>
                    <div class="tax">
                        <p @click="pageChange('list')">应收账款提现<img src="@/assets/Game/7_FinanceManage/right-circle-o.svg" alt=""></p>
                    </div>
                </div>

                <div class="list" v-show="page.list">
                    <table class="v-table_border">
                        <tr>
                            <th>编号：</th>
                            <th>金额：</th>
                            <th>入账时间：</th>
                            <th>到款时间：</th>
                            <th>说明：</th>
                        </tr>
                        <tr>
                            <td>**</td>
                            <td>**</td>
                            <td>**</td>
                            <td>**</td>
                            <td>**</td>
                        </tr>
                    </table>
                    <div class="back">
                        <p @click="pageChange('page')">返回<img src="@/assets/Game/7_FinanceManage/right-circle-o.svg" alt=""></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {
                page: {
                    card: true,
                    list: false
                }
            }
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'accountMoney')
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/accountMoney', 'money', 'account');
            }, 1);
        },
        methods: {
            // 页面内跳转
            pageChange(address) {
                if (address === 'list') {
                    this.page.card = false;
                    this.page.list = true;
                } else {
                    this.page.card = true;
                    this.page.list = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #accountMoney {
        width: 100%;
        .container_default {
            height: 95%;
            .title {
                margin-bottom: -60px;
            }
            .main {
                padding: 40px;
                padding-top: 100px;
                width: 100%;
                height: 100%;
                .card {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    background-color: #eee;
                    width: 100%;
                    height: 100%;
                    div {
                        flex: 1;
                        display: flex;
                    }
                    .img {
                        align-items: center;
                        flex-direction: row-reverse;
                        justify-content: center;
                        img {
                            width: 250px;
                        }
                    }
                    .info {
                        flex-direction: column;
                        justify-content: center;
                        line-height: 60px;
                        font-size: 22px;
                    }
                    .tax {
                        position: absolute;
                        bottom: 20px;
                        right: 60px;
                        font-weight: bold;
                        font-size: 14px;
                        p {
                            cursor: pointer;
                        }
                        img {
                            cursor: pointer;
                            position: absolute;
                            right: -35px;
                            top: -10px;
                            width: 30px;
                        }
                    }
                }
                .list {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    background-color: #eee;
                    width: 100%;
                    height: 100%;
                    padding: 40px;
                    .back {
                        position: absolute;
                        bottom: 20px;
                        right: 60px;
                        font-weight: bold;
                        font-size: 14px;
                        p {
                            cursor: pointer;
                        }
                        img {
                            cursor: pointer;
                            position: absolute;
                            right: -35px;
                            top: -10px;
                            width: 30px;
                        }
                    }
                }
            }
        }
    }
</style>