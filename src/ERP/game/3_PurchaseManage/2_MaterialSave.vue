<template>
    <div id="materialSave">
        <div class="nav">
            <a href=""></a>
            <h3>原料订购</h3>
        </div>
        <div class="container mg">
            <div class="form mg" v-if="page.detail">
                <div class="title">
                    <span>原材料订购</span>&nbsp;&nbsp;<span>订单详情</span>
                </div>
                <table class="v-table mg">
                    <tr>
                        <th>编号</th>
                        <th>原材料名</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>采购时间</th>
                        <th>运输方式</th>
                        <th>等待周期</th>
                        <th>状态</th>
                    </tr>
                    <tr>
                        <td>4382</td>
                        <td>R1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>**</td>
                        <td>1</td>
                        <td>已入库<img src="../../../assets/icon/menu_2.svg" @click="storageDetail()"></td>
                    </tr>
                    <tr>
                        <td>4382</td>
                        <td>R1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>**</td>
                        <td>1</td>
                        <td>运输中</td>
                    </tr>
                </table>
            </div>

            <div class="storage mg" v-if="page.storage">
                <div class="title">
                    <h3>采购入库</h3>
                </div>
                <div class="info">
                    <ul class="mg">
                        <li>编号：4382</li>
                        <li>创建人：用户名</li>
                        <li>采购时间：1</li>
                    </ul>
                </div>
                <div class="list">
                    <table class="v-table mg">
                        <tr>
                            <th>原材料名</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>总额</th>
                            <th>运输方式</th>
                            <th>等待周期</th>
                            <th>入库时间</th>
                            <th>库存数</th>
                        </tr>
                        <tr>
                            <td>R1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>航运</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </table>
                </div>
                <div class="confirm mg">
                    <button class="v-button b-primary">确定</button>
                    <button class="v-button b-primary">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                page: {
                    detail: true,
                    storage: false
                }
            }
        },
        methods: {
            storageDetail() {
                this.page.detail = false;
                this.page.storage = true;
            }
        },
        mounted() {
            this.$store.commit('pageState', 'materialSave')
        }
    }
</script>

<style lang="scss" scoped>
    #materialSave {
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
            .form {
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
                    td {
                        position: relative;
                        img {
                            cursor: pointer;
                            position: absolute;
                            top: 10px;
                            left: 70px;
                            width: 30px;
                        }
                    }
                }
            }
            .storage {
                position: relative;
                margin-top: 50px;
                width: 1000px;
                height: 650px;
                border: 1px solid #000;
                .title {
                    width: 100%;
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                    border-bottom: 1px solid #000;
                    h3 {
                        font-size: 22px;
                        font-weight: bold;
                    }
                }
                .info {
                    width: 100%;
                    height: 200px;
                    line-height: 200px;
                    ul {
                        display: flex;
                        width: 700px;
                        justify-content: space-between;
                    }
                }
                .confirm {
                    width: 100%;
                    text-align: center;
                    margin-top: 50px;
                    button {
                        margin: 50px;
                        width: 120px;
                    }
                }
            }
        }
    }
</style>
