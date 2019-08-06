<template>
    <div id="storageManage">
        <div class="container_default">
            <div class="title">
                <h3>库存管理</h3>
            </div>
            <div class="main">
                <div class="product">
                    <div class="top">
                        <h3>产品仓库</h3>
                    </div>
                    <div class="storage">
                        <div class="name">
                            <img src="@/assets/Game/Index/material.svg" alt="">
                            <span>一号仓库</span>
                        </div>
                        <ul>
                            <li v-for="item in productInfo">
                                <div class="temp">
                                    <img src="@/assets/Game/4_StorageManage/product.svg" alt="">
                                    <a>{{ item.productNumber }}</a>
                                </div>
                                <span>{{ item.productName }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="material">
                    <div class="top">
                        <h3>原料仓库</h3>
                    </div>
                    <div class="storage">
                        <div class="name">
                            <img src="@/assets/Game/Index/material.svg" alt="">
                            <span>一号仓库</span>
                        </div>
                        <ul>
                            <li v-for="item in materialInfo">
                                <div class="temp">
                                    <img src="@/assets/Game/4_StorageManage/product.svg" alt="">
                                    <a>{{ item.materialNumber }}</a>
                                </div>
                                <span>{{ item.materialName }}</span>
                            </li>
                        </ul>
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
                productInfo: [],
                materialInfo: [],
                float: {
                    productChoose: false,
                    materialChoose: false
                }
            }
        },
        methods: {
            productChoose() {
                this.$store.commit('controlFloatWindow');
                this.float.productChoose = !this.float.productChoose;
            },
            materialChoose() {
                this.$store.commit('controlFloatWindow');
                this.float.materialChoose = !this.float.materialChoose;
            },
            // 获取产品信息
            getProductInfo() {
                Axios.get(this.URL + '/game/compete/operation/stock/product?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productInfo = Response.data.data;
                        } else {
                            alert('产品数据获取失败');
                        }
                    })
            },
            // 获取原料信息
            getMaterialInfo() {
                Axios.get(this.URL + '/game/compete/operation/stock/material?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.materialInfo = Response.data.data;
                        } else {
                            alert('材料数据获取失败');
                        }
                    })
            }
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/storageManage', 'storage', 'manage');
            }, 1);
            this.$store.commit('pageState', 'storageManage');
            this.getProductInfo();
            this.getMaterialInfo();
        }
    }
</script>

<style lang="scss" scoped>
    #storageManage {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                display: flex;
                flex-direction: column;
                padding: 40px;
                h3 {
                    font-size: 18px;
                }
                .material {
                    margin-top: 80px;
                }
                .storage {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    margin-top: 20px;
                    height: 20vh;
                    border-top: 2px solid #aaa;
                    .name {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex: 0.2;
                        padding: 20px;
                        .temp {
                            height: 100%;
                        }
                        img {
                            height: 100%;
                        }
                        span {
                            position: absolute;
                            font-size: 18px;
                            bottom: 0;
                        }
                    }
                    ul {
                        display: flex;
                        flex-direction: row;
                        flex: 0.8;
                        li {
                            position: relative;
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .temp {
                                font-size: 1vw;
                                position: relative;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 30%;
                            }
                            img {
                                width: 100%;
                            }
                            span {
                                position: absolute;
                                bottom: 0;
                            }
                            a {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                position: absolute;
                                top: -10px;
                                right: -10px;
                                width: 35%;
                                height: 35%;
                                font-size: 0.8em;
                                background-color: #52C41A;
                                border-radius: 50%;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
