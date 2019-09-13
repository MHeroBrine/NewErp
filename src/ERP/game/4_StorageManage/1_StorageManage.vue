<template>
    <div id="storageManage">
        <div class="container_default">
            <div class="title">
                <h3>库存管理</h3>
            </div>
            <div class="_main">
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
                                    <img src="@/assets/Game/4_StorageManage/product.svg" alt="" class="product">
                                    <a>{{ item.productNumber }}</a>
                                    <img src="@/assets/Game/4_StorageManage/On-Sale.svg" alt="" class="sale" @click="productChoose(item.id)">
                                </div>
                                <span>{{ item.productName }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="v-alert" v-show="float.productChoose">
                    <div class="container">
                        <div class="title">
                            <h3>请输入出售数量</h3>
                        </div>
                        <div class="main">
                            <p><span>数量：</span><input type="text" class="v-input" v-model="product.number"></p>
                            <div class="button">
                                <button @click="productChoose()">取消</button>
                                <button @click="productSold()">确认</button>
                            </div>
                        </div>
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
                                    <img src="@/assets/Game/4_StorageManage/product.svg" class="product">
                                    <a>{{ item.materialNumber }}</a>
                                    <img src="@/assets/Game/4_StorageManage/On-Sale.svg" class="sale" @click="materialChoose(item.id)">
                                </div>
                                <span>{{ item.materialName }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="v-alert" v-show="float.materialChoose">
                    <div class="container">
                        <div class="title">
                            <h3>请输入材料数量</h3>
                        </div>
                        <div class="main">
                            <p><span>数量：</span><input type="text" class="v-input" v-model="material.number"></p>
                            <div class="button">
                                <button @click="materialChoose()">取消</button>
                                <button @click="materialSold()">确认</button>
                            </div>
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
                productInfo: [],
                materialInfo: [],
                float: {
                    productChoose: false,
                    materialChoose: false
                },
                // 出售信息
                product: {
                    id: null,
                    number: null
                },
                material: {
                    id: null,
                    number: null
                }
            }
        },
        methods: {
            productChoose(id = null) {
                this.product.id = id;
                this.$store.commit('controlFloatWindow');
                this.float.productChoose = !this.float.productChoose;
            },
            materialChoose(id = null) {
                this.material.id = id;
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
            },
            // 产品售卖
            productSold() {
                if (this.product.id && (this.product.number > 0)) {
                    Axios.post(this.URL + '/game/compete/operation/stock/product/sell', {
                        productStockId: this.product.id,
                        sellNumber: this.product.number
                    }).then(Response => {
                        if (Response.data.code === 204) {
                            this.productChoose();
                            this.$store.commit('controlAlert', [true, 'TRUE', '出售成功', null, null, null]);
                            setTimeout(() => {
                                this.$store.commit('controlAlert', [false]);
                                this.getProductInfo();
                            }, 1500);
                        } else {
                            alert(Response.data.msg);
                        }
                    })
                } else {
                    alert('请检测输入的信息');
                }
            },
            // 材料售卖
            materialSold() {
                if (this.material.id && this.material.number > 0) {
                    Axios.post(this.URL + '/game/compete/operation/stock/material/sell?materialStockId=' + this.material.id + '&sellNumber=' + this.material.number)
                        .then(Response => {
                            if (Response.data.code === 204) {
                                this.materialChoose();
                                this.$store.commit('controlAlert', [true, 'TRUE', '出售成功', null, null, null]);
                                setTimeout(() => {
                                    this.$store.commit('controlAlert', [false]);
                                    this.getMaterialInfo();
                                }, 1500);
                            } else {
                                alert(Response.data.msg);
                            }
                    })
                } else {
                    alert('请检测输入的信息');
                }
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
            ._main {
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
                                .product {
                                    width: 100%;
                                }
                                .sale {
                                    position: absolute;
                                    cursor: pointer;
                                    width: 40%;
                                    bottom: 0;
                                    right: -15px;
                                }
                                a {
                                    cursor: default;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    position: absolute;
                                    top: -10px;
                                    right: -10px;
                                    width: 35%;
                                    height: 35%;
                                    font-size: 0.5em;
                                    background-color: #52C41A;
                                    border-radius: 50%;
                                    color: #eee;
                                }
                            }
                            span {
                                position: absolute;
                                bottom: 0;
                            }
                        }
                    }
                }
                .v-alert {
                    .main {
                        padding-top: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .v-input {
                            width: 300px;
                            height: 25px;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
