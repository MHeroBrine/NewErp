<template>
    <div id="productStudy">
        <div class="container_default">
            <div class="title">
                <h3>产品研发</h3>
            </div>
            <div class="main mg">
                <div class="intro">
                    <div class="inside">
                        <div class="cover" v-for="item in productData">
                            <img src="@/assets/Nav/GameControl/image.svg" alt="">
                            <span>{{ item.productName }}</span>
                            <div class="state TODEVELOP" v-if="item.productDevelopStatus === 'TODEVELOP'">
                                <p>未研发</p>
                            </div>
                            <div class="state DEVELOPING" v-if="item.productDevelopStatus === 'DEVELOPING'">
                                <p>研发中</p>
                            </div>
                            <div class="state DEVELOPPAUSE" v-if="item.productDevelopStatus === 'DEVELOPPAUSE'">
                                <p>暂停研发</p>
                            </div>
                            <div class="state DEVELOPED" v-if="item.productDevelopStatus === 'DEVELOPED'">
                                <p>研发成功</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table">
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
                            <td v-if="item.productDevelopStatus === 'DEVELOPPAUSE'">暂停研发</td>
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
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {
                // 产品研发数据
                productData: []
            }
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/productStudy', 'productManage', 'study');
            }, 1);
            // 设置页面格式
            this.$store.commit('pageState', 'productStudy')
            this.getProductInfo(localStorage.getItem('enterpriseId'));
        },
        methods: {
            // 获取产品信息
            getProductInfo(enterpriseId) {
                Axios.get(this.URL + '/game/compete/operation/product?enterpriseId=' + enterpriseId)
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
                let i = confirm('开始开拓该市场？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/product/start?productDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getProductInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('开拓市场失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            },
            // 暂停开拓
            pause(id) {
                let i = confirm('暂停开拓该市场？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/product/pause?productDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getProductInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('暂停开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            },
            // 继续开拓
            develop(id) {
                let i = confirm('继续开拓该市场？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/product/develop?productDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getProductInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('继续开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #productStudy {
        width: 100%;
        .container_default {
            align-items: center;
            height: 95%;
            .main {
                padding: 0 20px 0 20px;
                max-width: 1400px;
                display: flex;
                flex-direction: column;
                .intro {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    box-sizing: content-box;
                    padding-top: 4%;
                    padding-bottom: 4%;
                    border-bottom: 1px dotted #aaa;
                    .inside {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        .cover {
                            // cursor: pointer;
                            margin: 20px;
                            position: relative;
                            border-radius: 10px;
                            width: 13%;
                            padding-bottom: 13%;
                            background-color: rgb(160, 198, 207);
                            img {
                                position: absolute;
                                width: 60%;
                                top: 20%;
                                left: 20%;
                            }
                            span {
                                position: absolute;
                                text-align: center;
                                width: 100%;
                                font-size: 22px;
                                bottom: -40px;
                                a {
                                    font-size: 14px;
                                    color: #fff;
                                    border-radius: 5px;
                                    background-color: rgb(114, 216, 114);
                                    padding: 5px;
                                }
                            }
                            .state {
                                position: absolute;
                                right: -20%;
                                top: -20%;
                                color: #fff;
                                font-size: 18px;
                                text-align: center;
                                border-radius: 50%;
                                width: 10vh;
                                height: 10vh;
                                line-height: 10vh; 
                                font-size: 14px;
                                background-color: rgb(127, 193, 209);
                            }
                            .TODEVELOP {
                                border-radius: 50%;
                                background-color: #aaa;
                            }
                            .DEVELOPING {
                                border-radius: 50%;
                                background-color: #F8D347;
                            }
                            .DEVELOPPAUSE {
                                border-radius: 50%;
                                background-color: #aaa;
                            }
                            .DEVELOPED {
                                border-radius: 50%;
                                background-color: rgb(90, 196, 223);
                            }
                            .active {
                                border-radius: 50%;
                                background-color: rgb(46, 189, 221);
                            }
                        }
                    }
                }
                .table {
                    width: 100%;
                    margin-top: 10px;
                    padding: 20px 50px 20px 50px;
                    button {
                        width: 80px;
                    }
                }
            }
        }
    }
</style>
