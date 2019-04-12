<template>
    <div id="productBuild">
        <div class="nav">
            <a href=""></a>
            <h3>产品构成</h3>
        </div>
        <div class="container mg" v-for="">
            <div class="product mg">
                <div>
                    <ul class="carsouel">
                        <i @click="productView(-1)"><</i>
                        <i @click="productView(1)">></i>
                        <li><p>P{{ productData[productNow].id }}</p></li>
                    </ul>
                </div>
                <div>
                    <span>成本价：1</span>
                    <br>
                    <span>单价：{{ productData[productNow].productSellingPrice }}</span>
                </div>
            </div>
            <div class="material mg">
                <ul class="mg">
                    <li v-for="(item, key) in productData[productNow].materialMap">
                        {{ key }}<span>单位: {{ item }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 产品研发数据
                productData: [],
                // 正在浏览的产品
                productNow: 0
            }
        },
        methods: {
            // 获取产品信息
            getProductInfo(enterpriseId) {
                Axios.get(this.URL + '/game/compete/operation/product/product/material/get?enterpriseId=' + enterpriseId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productData = Response.data.data;
                        } else {
                            alert('获取数据失败');
                        }
                    })
            },

            // 切换产品浏览
            productView(num) {
                if (num === -1) {
                    if (this.productNow === 0) {
                        return;
                    } else {
                        this.productNow --;
                    }
                } else if (num === 1) {
                    if (this.productNow === this.productData.length) {
                        return;
                    } else {
                        this.productNow ++;
                    }
                }
            }
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'productBuild')
            this.getProductInfo(localStorage.getItem('enterpriseId'));
        }
    }
</script>

<style lang="scss" scoped>
    #productBuild {
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
            width: 1200px;
            height: 700px;
            background-color: #fff;
            border: 1px solid #666;
            .product {
                display: flex;
                flex-wrap: wrap;
                width: 1100px;
                height: 350px;
                border-bottom: 1px dashed #000;
                ul {
                    position: relative;
                    margin-top: 50px;
                    width: 350px;
                    height: 200px;
                    p {
                        line-height: 200px;
                        text-align: center;
                    }
                    i {
                        z-index: 10;
                        cursor: pointer;
                        font-size: 30px;
                        &:nth-of-type(1) {
                            position: absolute;
                            top: 80px;
                        }
                        &:nth-of-type(2) {
                            position: absolute;
                            right: 0;
                            top: 80px;
                        }
                    }
                    li {
                        position: absolute;
                        width: 350px;
                        height: 200px;
                        border: 1px solid #000;
                    }
                }
                div {
                    flex: 1;
                    &:nth-of-type(2) {
                        padding-top: 150px;
                        line-height: 30px;
                    }
                }
            }
            .material {
                width: 1100px;
                display: flex;
                ul {
                    width: 900px;
                    margin-top: 50px;
                    flex-direction: row;
                    display: flex;
                    li {
                        position: relative;
                        width: 150px;
                        height: 150px;
                        margin-left: 100px;
                        border: 1px solid #000;
                        border-radius: 50%;
                        line-height: 150px;
                        text-align: center;
                        font-size: 20px;
                        &:nth-of-type(1) {
                            margin-left: 0;
                        }
                        span {
                            display: block;
                            top: 90px;
                            left: 36px;
                            position: absolute;
                        }
                    }
                }
            }
        }
    }
</style>
