<template>
    <div id="producePlan">
        <div class="container_default info" v-show="page.produce">
            <div class="title">
                <h3>生产产品</h3>
            </div>
            <ul class="main">
                <li>
                    <span>产品</span>
                    <input type="text" class="v-input" v-model="productNameNow" readonly>
                    <img src="@/assets/game/5_ProduceManage/product.svg" alt="产品" @click="notice.product = !notice.product">
                    <div class="notice" v-if="notice.product" style="z-index: 120">
                        <a v-for="item in productAvailable" @click="selectProduct(item.id, item.productName)">
                            产品{{ item.productName }}
                        </a>
                    </div>
                </li>
                <li>
                    <span>厂房</span>
                    <input type="text" class="v-input" v-model="factoryNameNow" readonly>
                    <img src="@/assets/game/5_ProduceManage/factory.svg" alt="厂房" @click="notice.factory = !notice.factory">
                    <div class="notice" v-if="notice.factory" style="z-index: 119">
                        <a v-show="!this.factoryAvailable == true">（请先选择产品）</a>
                        <a v-for="(item, key) in this.factoryAvailable" @click="selectFactory(key, item.factoryType)">
                            {{ item.factoryType }}
                        </a>
                    </div>
                </li>
                <li>
                    <span>生产线</span>
                    <input type="text" class="v-input" v-model="lineNameNow" readonly>
                    <img src="@/assets/game/5_ProduceManage/tools.svg" alt="生产线" @click="notice.line = !notice.line">
                    <div class="notice" v-if="notice.line" style="z-index: 118">
                        <p v-show="!this.lineAvailable == true">（请先选择厂房和生产线）</p>
                        <p v-for="(item, key) in this.lineAvailable" @click="selectLine(item.id, item.prodlineType)">
                            {{ item.prodlineType }}
                        </p>
                    </div>
                </li>
                <button class="v-button b-primary" @click="produceStart()">确定</button>
            </ul>
        </div>
        <div class="container_default show" v-show="page.produce">
            <div class="main">
                <div class="spans">
                    <span class="span" v-bind:class="{ active: item.id == productWatchNow }" @click="getProductInfos(item.id)" v-for="item in productAvailable">
                        {{ item.productName }}
                    </span>
                </div>
                <div class="detail">
                    <div class="item" v-for="item in productWatchNowInfo">
                        <p>厂房编号：{{ item.factoryNumber }}</p>
                        <p>生产线：{{ item.prodlineType }}</p>
                        <button class="v-button b-primary btn" @click="watchItem(item.id)">查看生产</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container_default factoryList" v-show="page.factoryList">
            <div class="title">
                <h3>厂房信息</h3>
            </div>
            <div class="main">
                <table class="v-table_border">
                    <tr>
                        <th>厂房编号</th>
                        <th>规模</th>
                        <th>类型</th>
                        <th>生产线数量</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <template v-for="item in factoryData">
                        <tr>
                            <td class="head" @click="showFactoryLine(item.id)"><img src="@/assets/Game/5_ProduceManage/arrow.svg" class="arrow"> &nbsp;&nbsp;&nbsp;&nbsp;{{ item.factoryNumber }}</td>
                            <td>{{ item.factoryType }}</td>

                            <td v-if="item.factoryHoldingStatus === 'HOLDING'">非租赁</td>
                            <td v-if="item.factoryHoldingStatus === 'LEASING'">租赁</td>
                            
                            <td>{{ item.currentCapacity }} / {{ item.factoryCapacity }}<img src="@/assets/Game/5_ProduceManage/add_2.svg" @click="createNewLine(item.id)"></td>
                            
                            <td v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === true">拥有中</td>
                            <td v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === false">已出售</td>

                            <td v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === true">租赁中</td>
                            <td v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === false">暂停租赁</td>
                        
                            <td class="btns">
                                <div class="temp">
                                    <button class="v-button b-primary" @click="getFactoryDetail(item.id)">详情</button>
                                    <div class="cover"></div>
                                    <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'HOLDING'" @click="sellFactory(item.id)">出售</button>
                                    <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === true" @click="pause_lean(item.id)">暂停</button>
                                    <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === false" @click="_continue_lean(item.id)">继续</button>
                                </div>
                            </td>
                        </tr>
                        <!-- 修建状态 -->
                        <ul class="second" v-for="_item in item.prodlineDevelopDisplayVoList" v-show="false" :ref="'list_' + item.id">
                            <div class="inside">
                                <li>{{ _item.prodlineType }}</li>
                                <li v-if="_item.prodlineDevelopStatus === 'DEVELOPING'">正在生产(线)</li>
                                <li v-if="_item.prodlineDevelopStatus === 'DEVELOPPAUSE'">暂停生产(线)</li>
                                <li v-if="_item.prodlineDevelopStatus === 'DEVELOPED'">完成生产(线)</li>
                                <li v-if="_item.prodlineDevelopStatus !== 'DEVELOPED'">完成生产(线)</li>
                                <li>可生产产品：{{ _item.productName }}</li>
                                <li>已修建周期：{{ _item.developedPeriod }}</li>
                                <li>
                                    <button class="v-button b-primary" v-if="_item.prodlineDevelopStatus === 'DEVELOPING'" @click="pauseInstall(_item.id)">暂停生产</button>
                                    <button class="v-button b-primary" v-if="_item.prodlineDevelopStatus === 'DEVELOPPAUSE'" @click="continueInstall(_item.id)">继续生产</button>
                                </li>
                            </div>
                        </ul>
                        <!-- 生产状态 -->
                        <ul class="second" v-for="_item in item.prodlineProduceDisplayVoList" v-show="false" :ref="'list_' + item.id">
                            <div class="inside">
                                <li>{{ _item.prodlineType }}</li>
                                <li v-if="_item.prodlineProduceStatus === 'TOPRODUCE'">待生产(产)</li>
                                <li v-if="_item.prodlineProduceStatus === 'PRODUCEING'">正在生产(产)</li>
                                <li v-if="_item.prodlineProduceStatus === 'PRODUCEPAUSE'">暂停生产(产)</li>
                                <li v-if="_item.prodlineProduceStatus === 'PRODUCED'">完成生产(产)</li>
                                <li v-if="_item.prodlineProduceStatus === 'TRANSFERRING'">运输中(产)</li>
                                <li>正在生产产品：{{ _item.productName }}</li>
                                <li>已生产周期：{{ _item.producedPeriod }}</li>
                                <li>
                                    <button class="v-button b-primary" v-if="_item.prodlineProduceStatus === 'PRODUCEING' || _item.prodlineProduceStatus === 'PRODUCEPAUSE'">转产</button>
                                    <button class="v-button b-primary" v-if="_item.prodlineProduceStatus === 'PRODUCEING' || _item.prodlineProduceStatus === 'PRODUCEPAUSE'" @click="sellLine(item.id)">出售</button>
                                    <button class="v-button b-primary" v-if="_item.prodlineProduceStatus === 'PRODUCED'" @click="productBack(_item.id)">收取产品</button>
                                </li>
                            </div>
                        </ul>
                    </template>
                </table>
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
                // 产品名称
                productNames: [],
                // 当前展示的产品信息
                productNow: null,
                // 当前展示的产品信息的数据
                productDetail: [],
                // 当前可以生产的产品
                productAvailable: [],
                // 可使用的厂房和生产线信息
                factoryAvailable: null,
                // 可使用生产线信息  
                lineAvailable: null,
                // 当前选择的生产线
                lineNow: null,
                // 当前查看的产品
                productWatchNow: null,
                // 当前查看产品的详细信息
                productWatchNowInfo: [],
                // 查看的生产线产品的数据
                factoryData: [],
                // 现选产品
                productNameNow: null,
                // 现选厂房
                factoryNameNow: null,
                // 现选生产线
                lineNameNow: null,
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
                // 侧拉窗(指输入框)
                notice: {
                    product: false,
                    factory: false,
                    line: false
                }
            }
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/producePlan', 'produce', 'plan');
            }, 1);
            this.getAvailableProduct();
            // this.getProduct();
            this.$store.commit('pageState', 'producePlan');
        },
        methods: {
            // 获取可生产的产品
            getAvailableProduct() {
                Axios.get(this.URL + '/game/compete/operation/produce/productionplan/product/type?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productAvailable = Response.data.data;
                            this.getProductInfos(this.productAvailable[0].id);
                        } else {
                            alert('数据获取失败');
                        }
                    })
            },
            // 获取产品信息
            getProduct() {
                Axios.get(this.URL + '/game/compete/operation/product/product/infos?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productNames = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    }).catch(e => {
                        
                    })
            },
            // 选择产品
            selectProduct(id, name) {
                this.notice.product = false;
                this.productNameNow = '产品' + name;
                Axios.get(this.URL + '/game/compete/operation/produce/productionplan/prodline/type?enterpriseId=' + localStorage.getItem('enterpriseId') + '&productId=' + id)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.factoryAvailable = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    })
            },
            // 选择厂房
            selectFactory(key, name) {
                console.log(name);
                this.notice.factory = false;
                this.factoryNameNow = name;
                this.lineAvailable = this.factoryAvailable[key].prodlineTypeVoList;
                console.log(this.lineAvailable);
            },
            // 选择生产线
            selectLine(id, name) {
                this.notice.line = false;
                this.lineNameNow = name;
                this.lineNow = id;
            },
            // 开始生产
            produceStart() {
                if (!this.lineNow) {
                    alert('请先选择生产线');
                } else {
                    Axios.put(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce?prodlineId=' + this.lineNow)
                        .then(Response => {
                            if (Response.data.code === 200) {
                                alert(Response.data.msg);
                                this.productNameNow = null;
                                this.factoryNameNow = null;
                                this.lineNameNow = null;
                                this.getProductInfos(this.productWatchNow);
                            } else {
                                alert(Response.data.msg);
                            }
                        })
                }
            },
            // 收取产品
            productBack(id) {
                Axios.put(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce/receive?prodlineId=' + id)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert('收取成功');
                            this.getAvailableProduct();
                            this.getProductInfos();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            
            // 获取产品的生产信息
            getProductInfos(id) {
                this.productWatchNow = id;
                Axios.get(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce?enterpriseId=' + localStorage.getItem('enterpriseId') + '&productId=' + id)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productWatchNowInfo = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    })
            },
            // 查看某一产品具体生产情况
            watchItem(id) {
                this.page.produce = false;
                this.page.factoryList = true;
                Axios.get(this.URL + '/game/compete/operation/produce/productionplan/factory/display?prodlineProduceId=' + id)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            console.log(Response.data);
                            this.factoryData = [Response.data.data];
                        } else {
                            alert('数据获取失败');
                        }
                    })
            },
            showFactoryLine(factoryId) {    
                for (let i = 0; i < this.$refs['list_' + factoryId].length; i ++) {
                    if (this.$refs['list_' + factoryId][i].style.display == 'none') {
                        this.$refs['list_' + factoryId][i].style.display = 'block';
                    } else {
                        this.$refs['list_' + factoryId][i].style.display = 'none';
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    #producePlan {
       width: 100%;
       padding-bottom: 20px;
        .container_default {
            height: 300px;
            h4 {
                font-size: 14px;
            }
        }
        .info { 
            height: 320px;
            button {
                position: absolute;
                left: 10px;
                bottom: 10px;
                width: 120px;
            }
            ul {
                li {
                    position: relative;
                    width: 100%;
                    height: 70px;
                    line-height: 70px;
                    padding-left: 20px;
                    span {
                        font-size: 14px;
                    }
                    input {
                        padding-left: 5px;
                        position: absolute;
                        top: 17.5px;
                        left: 85px;
                        font-size: 14px;
                        border-radius: 8px;
                        width: 385px;
                        height: 35px;
                    }
                    img {
                        position: absolute;
                        cursor: pointer;
                        top: 25px;
                        left: 440px;
                        width: 20px;
                    }
                    .notice {
                        position: absolute;
                        background-color: #fff;
                        padding: 5px;
                        line-height: 22px;
                        font-size: 12px;
                        padding-left: 10px;
                        color: #666;
                        top: 17px;
                        left: 490px;
                        width: 120px;
                        height: 100px;
                        border: 1px solid #aaa;
                        // border-radius: 10px;
                        a {
                            display: block;
                        }
                        &::before {
                            content: '';
                            position: absolute;
                            top: 0px;
                            left: -15px;
                            border-right: 15px solid #aaa;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                        }
                        &::after {
                            content: '';
                            position: absolute;
                            top: 0px;
                            left: -15px;
                            border-right: 18px solid #fff;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                        }
                        p {
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .show {
            padding: 20px;
            .main {
                position: relative;
                display: flex;
                flex-direction: row;
            }
            .spans {
                width: 150px;
                height: 100%;
                .span {
                    position: absolute;
                    display: block;
                    width: 90px;
                    height: 40px;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                    font-size: 18px;
                    background-color: #AEB2B7;
                    cursor: pointer;
                    &:nth-of-type(2) {
                        margin-top: 70px;
                    }
                    &:nth-of-type(3) {
                        margin-top: 140px;
                    }
                    &:nth-of-type(4) {
                        margin-top: 210px;
                    }
                    &::before {
                        content: '';
                        position: absolute;
                        width: 0;
                        height: 0;
                        right: -20px;
                        border-left: 20px solid #AEB2B7;
                        border-top: 20px solid transparent;
                        border-bottom: 20px solid transparent;
                    }
                    &:hover {
                        background-color: #46b8ed;
                        &::before {
                            content: '';
                            position: absolute;
                            width: 0;
                            height: 0;
                            right: -20px;
                            border-left: 20px solid #46b8ed;
                            border-top: 20px solid transparent;
                            border-bottom: 20px solid transparent;
                        }
                    }
                }
                .active {
                    background-color: #46b8ed;
                    &::before {
                        content: '';
                        position: absolute;
                        width: 0;
                        height: 0;
                        right: -20px;
                        border-left: 20px solid #46b8ed;
                        border-top: 20px solid transparent;
                        border-bottom: 20px solid transparent;
                    }
                }
            }
            .detail {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: 270px;
                border: 1px solid #aaa;
                border-radius: 15px;
                padding: 20px;
                overflow: auto;
                .item {
                    position: relative;
                    width: 160px;
                    height: 90px;
                    margin: 0 0 20px 20px;
                    border: 1px solid #000;
                    border-radius: 10px;
                    line-height: 20px;
                    padding: 10px;
                    p {
                        font-size: 12px;
                    }
                }
                .btn {
                    position: absolute;
                    font-size: 12px;
                    border-radius: 5px;
                    min-height: 20px;
                    height: 30px;
                    line-height: 0px;
                    right: 5px;
                    bottom: 5px;
                }
            }
        }
        .factoryList {
            height: 95%;
            .main {
                padding: 0 20px 0 20px;
                table {
                    min-width: 800px;
                    margin-top: 20px;
                    tr {
                        border: 1px solid rgb(180, 186, 192);
                        td {
                            position: relative;
                        }
                        img {
                            position: absolute;
                            cursor: pointer;
                            top: 16px;
                            left: 65px;
                            width: 18px;
                        }
                        .btns {
                            width: 100%;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            .temp {
                                display: flex;
                                flex: 0.9;
                            }
                            .cover {
                                flex: 0.1;
                            }
                            button {
                                flex: 1;
                                height: 40px;
                            }
                        }
                        th, td {
                            border: 0;
                        }
                        cursor: pointer;
                        &:hover {
                            background-color: rgb(235, 247, 255);
                        }
                        &:nth-of-type(1) {
                            cursor: default;
                        }
                    }
                    .head {
                        position: relative;
                        .arrow {
                            position: absolute;     
                            width: 15px;
                            top: 18px;
                            left: 15px;
                        }
                    }
                }
            }
        }
    }
</style>
