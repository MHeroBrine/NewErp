<template>
    <div id="storageManage">
        <div class="nav">
            <a href=""></a>
            <h3>库存管理</h3>
        </div>
        <div class="container mg">
            <div class="product">
                <h3>产品库存</h3>
                <div class="storage">
                    <div class="storageName">
                        <div class="item_top mg"></div>
                    </div>
                    <div class="storageItem">
                        <ul class="mg">
                            <li class="item">p1<div class="cover">库存：1</div></li>
                            <li class="item">p2</li>
                            <li class="item">p3</li>
                            <li class="item">p4</li>
                        </ul>
                        <button class="v-button b-primary" @click="productChoose()">售卖</button>
                    </div>
                </div>

                <div class="productChoose v-alert" v-if="float.productChoose">
                    <div class="pre_container">
                        <div class="pre_title">
                            <h3>选择产品</h3>
                        </div>
                        <div class="main mg">
                            <ul>
                                <li>产品：<select name="" id=""></select></li>
                                <li>数量：<select name="" id=""></select></li>
                                <li>注：产品按照票价的八折出售</li>
                                <li><button class="v-button b-primary">确定</button><button class="v-button b-primary" @click="productChoose()">取消</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="material">
                <h3>库存管理</h3>
                <div class="storage">
                    <div class="storageName">
                        <div class="item_top mg"></div>
                    </div>
                    <div class="storageItem">
                        <ul class="mg">
                            <li class="item">R1<div class="cover">库存：1</div></li>
                            <li class="item">R2</li>
                            <li class="item">R3</li>
                            <li class="item">R4</li>
                        </ul>
                        <button class="v-button b-primary" @click="materialChoose()">售卖</button>
                    </div>
                </div>

                <div class="productChoose v-alert" v-if="float.materialChoose">
                    <div class="pre_container">
                        <div class="pre_title">
                            <h3>选择原材料</h3>
                        </div>
                        <div class="main mg">
                            <ul>
                                <li>原材料：<select name="" id=""></select></li>
                                <li>数量：<select name="" id=""></select></li>
                                <li>注：原材料按照票价的七折出售</li>
                                <li><button class="v-button b-primary">确定</button><button class="v-button b-primary" @click="materialChoose()">取消</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
            }
        },
        mounted() {
            this.$store.commit('pageState', 'storageManage');
        }
    }
</script>

<style lang="scss" scoped>
    #storageManage {
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
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            margin-top: 50px;
            width: 1100px;
            height: 750px;
            background-color: #fff;
            border: 1px solid #000;
            .product, .material {
                flex: 1;
                padding: 15px;
                h3 {
                    font-size: 18px;
                }
                .storage {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 20px;
                    width: 1060px;
                    height: 250px;
                    border: 1px solid #000;
                    .storageName {
                        display: flex;
                        align-items: center;
                        flex: 1.2;
                        border-right: 1px solid #000;
                        .item_top {
                            width: 170px;
                            height: 170px;
                            border: 1px solid #000;
                            background-color: #eee;
                        }
                    }
                    .storageItem {
                        position: relative;
                        display: flex;
                        align-items: center;
                        flex: 4;
                        ul {
                            width: 700px;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            .item {
                                position: relative;
                                width: 150px;
                                height: 150px;
                                line-height: 150px;
                                text-align: center;
                                border: 1px solid #000;
                                background-color: #eee;
                                .cover {
                                    position: absolute;
                                    width: 100%;
                                    height: 30px;
                                    line-height: 30px;
                                    background-color: #A1A1A1;
                                    bottom: 0;
                                }
                            }
                        }
                        button {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                        }
                    }
                }

                .productChoose {
                    .main {
                        width: 320px;
                        ul {
                            li {
                                line-height: 50px;
                                &:nth-of-type(1) {
                                    margin-top: 20px;
                                }
                                &:nth-last-of-type(1) {
                                    width: 320px;
                                    text-align: center;
                                    button {
                                        cursor: pointer;
                                        width: 120px;
                                        margin: 20px;
                                    }
                                }
                                select {
                                    width: 250px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
