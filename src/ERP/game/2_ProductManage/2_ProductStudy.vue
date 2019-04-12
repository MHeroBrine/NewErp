<template>
    <div id="productStudy">
        <div class="nav">
            <a href=""></a>
            <h3>产品研发</h3>
        </div>
        <div class="product mg">
            <ul class="mg">
                <li v-for="item in productData">
                    <span>{{ item.productName }}</span>
                    <a v-if="item.productDevelopStatus === 'TODEVELOP'">未研发</a>
                    <a v-if="item.productDevelopStatus === 'DEVELOPING'" class="active">研发中</a>
                    <a v-if="item.productDevelopStatus === 'DEVELOPPAUSE'" class="active">研发中</a>
                    <a v-if="item.productDevelopStatus === 'DEVELOPED'" class="active">研发成功</a>
                </li>
            </ul>
        </div>
        <div class="form mg">
            <table class="v-table mg">
                <tr>
                    <th>产品名称</th>
                    <th>研发总期数</th>
                    <th>每期研发费用(万元)</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item, index) in productData">
                    <td>{{ item.productName }}</td>
                    <td>{{ item.productResearchPeriod }}</td>
                    <td>{{ item.productResearchCost }}</td>
                    <td v-if="item.productDevelopStatus === 'TODEVELOP'">未研发</td>
                    <td v-if="item.productDevelopStatus === 'DEVELOPING'">研发中</td>
                    <td v-if="item.productDevelopStatus === 'DEVELOPPAUSE'">研发中</td>
                    <td v-if="item.productDevelopStatus === 'DEVELOPED'">研发成功</td>
                    <td>
                        <button class="v-button b-primary" v-if="item.productDevelopStatus == 'TODEVELOP'" @click="start(item.id)">开拓市场</button>
                        <button class="v-button b-primary" v-if="item.productDevelopStatus == 'DEVELOPING'" @click="pause(item.id)">暂停开拓</button>
                        <button class="v-button b-primary" v-if="item.productDevelopStatus == 'DEVELOPPAUSE'" @click="develop(item.id)">继续开拓</button>
                        <button class="v-button b-info b-disabled" v-if="item.productDevelopStatus == 'DEVELOPED'">已研发</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 产品研发数据
                productData: []
            }
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'productStudy')
            this.getProductInfo(localStorage.getItem('enterpriseId'));
        },
        methods: {
            // 获取产品信息
            getProductInfo(enterpriseId) {
                Axios.get(this.URL + '/game/compete/operation/product/product/infos/get?enterpriseId=' + enterpriseId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productData = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    }).catch(e => {
                        
                    })
            },

            // 产品研发部分
            // 开始开拓
            start(id) {
                Axios.put(this.URL + '/game/compete/operation/product/product/infos/update/develop?productDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getProductInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('开拓市场失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            },
            // 暂停开拓
            pause(id) {
                Axios.put(this.URL + '/game/compete/operation/product/product/infos/update/pause?productDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getProductInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('暂停开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            },
            // 继续开拓
            develop(id) {
                Axios.put(this.URL + '/game/compete/operation/product/product/infos/update/start?productDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getProductInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('继续开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            }
        }
    }
</script>

<style lang="scss" scoped>
    #productStudy {
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
        .product {
            margin-top: 50px;
            width: 1100px;
            height: 350px;
            background-color: #fff;
            border: 1px solid #000;
            ul {
                width: 1000px;
                margin-top: 80px;
                display: flex;
                justify-content: space-between;
                li {
                    background-color: #eee;
                    position: relative;
                    width: 200px;
                    height: 150px;
                    border: 1px solid #000;
                    span {
                        position: absolute;
                        display: block;
                        font-size: 20px;
                        width: 200px;
                        text-align: center;
                        top: 170px;
                    }
                    a {
                        position: absolute;
                        right: -50px;
                        top: -50px;
                        display: block;
                        width: 100px;
                        height: 100px;
                        line-height: 100px;
                        text-align: center;
                        border-radius: 50%;
                        border: 1px solid #000;
                        background-color: #fff;
                    }
                    .active {
                        background-color: aqua;
                    }
                }
            }
        }
        .form {
            margin-top: 50px;
            width: 1100px;
            height: 350px;
            background-color: #fff;
            border: 1px solid #000;
            table {
                margin-top: 30px;
            }
        }
    }
</style>
