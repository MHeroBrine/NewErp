<template>
    <div id="productBuild">
        <div class="container_default">
            <div class="title">
                <h3>产品构成</h3>
            </div>
            <div class="main mg">
                <div class="detail">
                    <div class="inside">
                        <div class="cover" v-for="(item, key) in productData" v-bind:class="{ active: productNow === key }" @click="changeItem(key)">
                            <img src="@/assets/Nav/GameControl/image.svg">
                            <span>{{ item.productTypeVo.productName }}</span>
                        </div>
                    </div>
                </div>
                <div class="info mg">
                    <div class="inside">
                        <div class="cover" v-for="(item, key) in productData[productNow].materialMap" @click="changeItem(item.id)">
                            <img src="@/assets/Nav/GameControl/image.svg" alt="">
                            <span>{{ key }}（{{ item }}件）</span>
                        </div>
                    </div>
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
                productData: [],
                // 正在浏览的产品
                productNow: 0
            }
        },
        methods: {
            // 获取产品信息
            getProductInfo(enterpriseId) {
                Axios.get(this.URL + '/game/compete/operation/product/material?enterpriseId=' + enterpriseId)
                    .then(Response => {
                        console.log(Response);
                        if (Response.data.code === 200) {
                            this.productData = Response.data.data;
                        } else {
                            alert('获取数据失败');
                        }
                    })
            },

            // 切换产品浏览
            changeItem(key) {
                this.productNow = key;
            }
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/productBuild', 'productManage', 'build');
            }, 0);
            // 设置页面格式
            this.$store.commit('pageState', 'productBuild')
            this.getProductInfo(localStorage.getItem('enterpriseId'));
        }
    }
</script>

<style lang="scss" scoped>
    #productBuild {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                padding: 0 20px 0 20px;
                max-width: 1400px;
                display: flex;
                flex-direction: column;
                .detail {
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
                            cursor: pointer;
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
                                width: 100%;
                                bottom: -18%;
                                font-size: 18px;
                                text-align: center;
                            }
                            &:hover {
                                background-color: rgb(62, 175, 201);
                            }
                        }
                        .active {
                            background-color: rgb(62, 175, 201);
                        }
                    }
                }
                .info {
                    width: 80%;
                    display: flex;
                    align-items: center;
                    // padding-bottom: 
                    box-sizing: content-box;
                    padding-bottom: 50px;
                    padding-top: 2%;
                    padding-bottom: 2%;
                    .inside {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        .cover {
                            cursor: pointer;
                            margin: 20px;
                            position: relative;
                            border-radius: 50%;
                            width: 13%;
                            padding-bottom: 13%;
                            background-color: rgb(189, 189, 189);
                            img {
                                position: absolute;
                                width: 60%;
                                top: 20%;
                                left: 20%;
                            }
                            span {
                                position: absolute;
                                width: 100%;
                                font-size: 18px;
                                bottom: -18%;
                                text-align: center;
                            }
                            &:hover {
                                background-color: #000;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
