<template>
    <div id="producePlan">
        <div class="nav">
            <a href=""></a>
            <h3>生产计划</h3>
        </div>

        <!-- Page-produce -->
        <div class="container mg" v-if="page.produce">
            <div class="produce">
                <h3>生产产品</h3>
                <div class="param">
                    <ul class="items">
                        <li class="v-input">
                            <input type="text" placeholder="产品">
                            <img src="../../../assets/icon/label.svg" alt="" @click="hovers.product = !hovers.product">
                            <ul class="list" v-if="hovers.product">
                                <li v-for="item in productAvailable" @click="">
                                    产品{{ item.productName }}
                                </li>
                            </ul>
                        </li>
                        <li class="v-input">
                            <input type="text" placeholder="厂房">
                            <img src="../../../assets/icon/factory.svg" alt="" @click="hovers.factory = !hovers.factory">
                            <ul class="list" v-if="hovers.factory">
                                <li>编号P1</li>
                                <li>编号P2</li>
                            </ul>
                        </li>
                        <li class="v-input">
                            <input type="text" placeholder="生产线">
                            <img src="../../../assets/icon/tool.svg" alt="" @click="hovers.line = !hovers.line">
                            <ul class="list" v-if="hovers.line">
                                <li>手工线1</li>
                                <li>手工线2</li>
                                <li>手工线3</li>
                                <li>半自动线</li>
                            </ul>
                        </li>
                    </ul>
                    <button class="v-button b-primary">确定</button>
                </div>
            </div>
            <div class="show">
                <ul>
                    <li v-for="item in productNames" @click="checkMaterial(item.id)" :ref="'product_' + item.id">
                        产品{{ item.productName }}
                    </li>
                </ul>
                <div class="detail">
                    <ul>
                        <li class="card" v-for="item in productDetail">
                            <p>厂房：{{ item.factoryNumber }}</p>
                            <p>生产线：{{ item.prodlineType }}</p>
                            <p>状态：正在生产</p>
                            <button class="v-button b-primary">查看生产</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Page-list -->
        <div class="factoryList mg" v-if="page.factoryList">
            <div class="title mg">
                <ul>
                    <li>厂房编号</li>
                    <li>规模</li>
                    <li>类型</li>
                    <li>生产线数量</li>
                    <li>状态</li>
                </ul>
                <ul>
                    <li>511</li>
                    <li>大厂房</li>
                    <li>非租赁</li>
                    <li>4/6</li>
                    <li>已修建</li>
                </ul>
            </div>
            <div class="list mg">
                <ul>
                    <li>手工线</li>
                    <li>正在生产</li>
                    <li>已生产周期：1</li>
                    <li>正在生产产品：P1</li>
                    <li><button class="v-button b-primary" @click="detail()">详情</button><button class="v-button b-primary">暂停</button></li>
                    
                    <!-- button-详情 -->
                    <div class="v-alert detail" v-if="float.detail">
                        <div class="pre_container">
                            <div class="pre_title">
                                <h3>生产线详情</h3>
                            </div>
                            <div class="main">
                                <p>生产线类型：文本标签</p>
                                <p>产品类型：文本标签</p>
                                <p>安装周期：文本标签</p>
                                <p>每期安装周期：文本标签</p>
                                <p>每周转产费用：文本标签</p>
                                <p>生产效率：文本标签</p>
                                <p>每周维护费用：文本标签</p>
                                <p>每周折旧费用：文本标签</p>
                                <p>残值：文本标签</p>
                            </div>
                        </div>
                    </div>

                    <!-- button-暂停 -->
                    <div class="v-alert pause" v-if="float.pause">
                        <div class="pre_container">
                            <div class="pre_title">
                                <h3>暂停该生产线？</h3>
                            </div>
                            <div>
                                <p>注：该生产线正在生产产品</p>
                                <button class="v-button b-primary">继续</button>
                                <button class="v-button b-primary">取消</button>
                            </div>
                        </div>
                    </div>

                    <!-- button-继续 -->
                    <div class="v-alert continue" v-if="float.continue">
                        <div class="pre_container">
                            <div class="pre_title">
                                <h3>继续该生产线？</h3>
                            </div>
                            <div>
                                <button class="v-button b-primary">继续</button>
                                <button class="v-button b-primary">取消</button>
                            </div>
                        </div>
                    </div>
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
                // 产品名称
                productNames: [],
                // 当前展示的产品信息
                productNow: null,
                // 当前展示的产品信息的数据
                productDetail: [],
                // 当前可以生产的产品
                productAvailable: [],
                // 准备生产的产品的数据
                produceReady: {

                },
                // 页面
                page: {
                    produce: true,
                    factoryList: false
                },
                // 浮窗
                float: {
                    detail: false,
                    pause: false,
                    continue: false
                },
                // 鼠标下拉窗
                hovers: {
                    product: false,
                    factory: false,
                    line: false
                }
            }
        },
        mounted() {
            this.getAvailableProduct();
            this.getProduct();
            this.$store.commit('pageState', 'producePlan');
        },
        methods: {
            // 获取可生产的产品
            getAvailableProduct() {
                Axios.get(this.URL + '/game/compete/operation/produce/productionplan/product/type/get?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productAvailable = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    })
            },
            // 获取产品信息
            getProduct() {
                Axios.get(this.URL + '/game/compete/operation/product/product/infos/get?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productNames = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    }).catch(e => {
                        
                    })
            },
            // 查看某一产品生产情况
            checkMaterial(id) {
                if (this.productNow === id) {
                    return;
                } else {
                    if (this.productNow !== null) {
                        this.$refs['product_' + this.productNow][0].style.color = "#000";
                    }
                    this.productNow = id;
                    this.$refs['product_' + id][0].style.color = "blue";
                    Axios.get(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce/get?enterpriseId=' + localStorage.getItem('enterpriseId') + '&productId=' + id)
                        .then(Response => {
                            if (Response.data.code === 200) {
                                this.productDetail = Response.data.data;
                            } else {
                                alert('数据获取失败');
                            }
                        }).catch(e => {
                            
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #producePlan {
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
            .produce, .show {
                margin: 20px;
                flex: 1;
            }
            .produce {
                display: flex;
                flex-direction: column;
                border: 4px solid #666;
                h3 {
                    height: 60px;
                    line-height: 60px;
                    padding-left: 20px;
                    font-size: 22px;
                    font-weight: bold;
                    border-bottom: 1px solid #eee;
                }
                .param {
                    position: relative;
                    flex: 1;
                    .items {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        width: 800px;
                        li {
                            position: relative;
                            flex: 1;
                            width: 300px;
                            margin: 20px;
                            input {
                                font-size: 18px;
                                width: 250px;
                                height: 40px;
                            }
                            img {
                                cursor: pointer;
                                width: 30px;
                            }
                        }
                        .list {
                            position: absolute;
                            width: 100px;
                            height: 100px;
                            border: 1px solid #000;
                            left: 100px;
                            top: 20px;
                            z-index: 50;
                            background-color: #fff;
                            li {
                                line-height: 1px;
                            }
                        }
                    }
                    button {
                        position: absolute;
                        width: 120px;
                        bottom: 10px;
                        right: 10px;
                    }
                }
            }
            .show {
                display: flex;
                flex-direction: row;
                ul {
                    li {
                        cursor: pointer;
                        margin-top: 50px;
                        &:nth-of-type(1) {
                            margin-top: 0;
                        }
                    }
                }   
                .detail {
                    width: 950px;
                    height: 250px;
                    border: 3px solid #eee;
                    margin-left: 50px;
                    ul {
                        display: flex;
                        .card {
                            position: relative;
                            width: 180px;
                            height: 90px;
                            border: 2px solid #eee;
                            margin: 20px;
                            padding: 6px;
                            line-height: 20px;
                            button {
                                position: absolute;
                                right: 4px;
                                padding: 0;
                            }
                        }
                    }
                }
            }
        }
        
        .factoryList {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            margin-top: 50px;
            width: 1100px;
            height: 750px;
            background-color: #fff;
            border: 1px solid #000; 
            .title {
                width: 1000px;
                height: 100px;
                background-color: #eee;
                margin-top: 30px;
                border: 1px solid #000;
                ul {
                    margin-top: 20px;
                    width: 800px;
                    display: flex;
                    flex-wrap: wrap;
                    &:nth-of-type(2) {
                        margin-top: 30px;
                        color: #777777;
                    }
                    li {
                        text-align: center;
                        flex: 1;
                    }
                }
            }
            .list {
                width: 1000px;
                ul {
                    margin: 0 auto;
                    margin-top: 20px;
                    width: 900px;
                    display: flex;
                    flex-wrap: wrap;
                    border-bottom: 1px solid #666;
                    padding-bottom: 10px;
                    li {
                        line-height: 30px;
                        padding-left: 20px;
                        flex: 1;
                    }
                    .detail {
                        .pre_container {
                            height: auto;
                            .main {
                                text-align: center;
                                line-height: 50px;
                            }   
                        }
                    }
                    .pause {
                        text-align: center;
                        line-height: 50px;
                        .pre_container {
                            width: 400px;
                            height: 170px;
                            button {
                                width: 120px;
                            }
                        }
                    }
                    .continue {
                        text-align: center;
                        line-height: 50px;
                        .pre_container {
                            width: 400px;
                            height: 170px;
                            button {
                                width: 120px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
