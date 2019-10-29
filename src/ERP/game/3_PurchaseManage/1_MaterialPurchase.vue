<template>
    <div id="materialPurchase">
        <div class="container_default">
            <div class="title">
                <h3>原料订购</h3>
            </div>

            <!-- 原料订购 -->
            <div class="main" v-if="page.materialPurchase">
                <div class="shop">
                    <div v-for="item in data" class="contents">
                        <div class="temp">
                            <div class="card">
                                <div class="img">
                                    <img src="@/assets/Game/3_PurchaseManage/material.svg">
                                </div>
                                <div class="info">
                                    <h3>{{ item[0].materialName }}</h3>
                                    <p class="storage">当前库存：{{ item[0].materialNumber }}</p>
                                    <p class="money">￥{{ item[0].materialPrice.toFixed(2) }}</p>
                                    <img src="@/assets/Game/3_PurchaseManage/add.svg" class="add" @click="shopAdd(item[0])">
                                </div>
                            </div>
                        </div>
                        <div class="temp" v-if="item[1]">
                            <div class="card">
                                <div class="img">
                                    <img src="@/assets/Game/3_PurchaseManage/material.svg">
                                </div>
                                <div class="info">
                                   <h3>{{ item[1].materialName }}</h3>
                                    <p class="storage">当前库存：{{ item[1].materialNumber }}</p>
                                    <p class="money">￥{{ item[1].materialPrice.toFixed(2) }}</p>
                                    <img src="@/assets/Game/3_PurchaseManage/add.svg" class="add" @click="shopAdd(item[1])">
                                </div>
                            </div>
                        </div>
                        <div class="cover" v-if="!item[1]"></div>
                        <div class="temp" v-if="item[2]">
                            <div class="card">
                                <div class="img">
                                    <img src="@/assets/Game/3_PurchaseManage/material.svg">
                                </div>
                                <div class="info">
                                    <h3>{{ item[2].materialName }}</h3>
                                    <p class="storage">当前库存：{{ item[2].materialNumber }}</p>
                                    <p class="money">￥{{ item[2].materialPrice.toFixed(2) }}</p>
                                    <img src="@/assets/Game/3_PurchaseManage/add.svg" class="add" @click="shopAdd(item[2])">
                                </div>
                            </div>
                        </div>
                        <div class="cover" v-if="!item[2]"></div>
                    </div>
                </div>
                <div class="order">
                    <h3>订单结算</h3>
                    <ul>
                        <li v-for="item in purchaseList">
                            <div class="img">
                                <img src="@/assets/Game/3_PurchaseManage/material.svg">
                            </div>
                            <div class="info">
                                <h4>{{ item.meterialName }}</h4>
                                <input type="text" class="money" oninput="javascript:this.value=this.value.replace(/[^\d]/g,'')" v-model="item.purchaseNumber" v-on:keyup="totalCount()">&nbsp;&nbsp;&nbsp;<a style="font-size: 12px;">X</a>&nbsp;&nbsp;<span>￥{{ item.price }}</span>
                            </div>
                            <span class="total">￥{{ (item.purchaseNumber * item.price).toFixed(2) }}</span>
                        </li>
                    </ul>
                    <span class="result">合计：￥{{ (total).toFixed(2) }}</span>
                    <button class="v-button b-primary orderInfo" @click="back()">查看现有订单</button>
                    <button class="v-button b-primary purchase" @click="selectTransport()">购买</button>
                </div>
            </div>

            <!-- 订单详情 -->
            <div class="orderDetail" v-if="page.orderDetail">
                <table class="v-table" v-if="page.orderDetail">
                    <tr>
                        <th>编号</th>
                        <th>原材料名</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>总金额</th>
                        <th>采购时间</th>
                        <th>运输方式</th>
                        <th>等待周期</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in orderDetailInfo">
                        <td>{{ item.orderNumber }}</td>
                        <td>{{ item.materialName }}</td>
                        <td>￥{{ item.materialPrice.toFixed(2) }}</td>
                        <td>{{ item.purchaseNumber }}</td>
                        <td>￥{{ (item.purchaseNumber * item.materialPrice).toFixed(2) }}</td>
                        <td>{{ item.purchaseTime }}</td>
                        <td>{{ item.transportMethod.transportName }}</td>
                        <td>{{ item.transportMethod.transportPeriod }}</td>
                        <td>
                            <button class="v-button b-primary" v-if="item.transportStatus == 'TOCHECK'" @click="review(item.id)">待审核</button>
                            <button class="v-button b-disabled" v-if="item.transportStatus == 'CHECKED'">已审核</button>
                            <button class="v-button b-disabled" v-if="item.transportStatus == 'TRANSPORTING'">运输中</button>
                            <button class="v-button b-disabled" v-if="item.transportStatus == 'ARRIVED'">已到达</button>
                        </td>
                    </tr>
                </table>

                <v-pagination-list
                :data="orderDetailInfo"
                :divide="pageCount"
                v-on:change="orderDetailInfo = $event"
                v-if="page.orderDetail">
                </v-pagination-list>
            </div>

            <!-- 选择运输方式 -->
            <div class="v-alert transport" v-show="float.transport">
                <div class="container mg">
                    <div class="title">
                        <h3>选择运输方式</h3>
                    </div>
                    <div class="main">
                        <table class="v-table_border mg">
                            <tr>
                                <th>运输方式</th>
                                <th>等待周期</th>
                                <th>运费</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="item in transports">
                                <td>{{ item.transportName }}</td>
                                <td>{{ item.transportPeriod }}</td>
                                <td>{{ item.transportPrice }}</td>
                                <td><button class="v-button b-primary" @click="purchase(item)">选择</button></td>
                            </tr>
                        </table>
                    </div>
                    <div class="button">
                        <button @click="selectTransport()">返回</button>
                    </div>
                </div>

            </div>
            <!-- 订单审核 -->
            <div class="v-alert review" v-show="float.review">
                <div class="container mg">
                    <div class="title">
                        <h3>审核通过采购单？</h3>
                    </div>
                    <div class="main">
                        <h3>注：</h3>
                        <p>1.只有采购单的审核通过，系统才开始派送原材料</p>
                        <p>2.派送原材料需要支付0.1w的运输费用</p>
                    </div>
                    <div class="button">
                        <button @click="review()">取消</button>
                        <button @click="review_confirm()">确认</button>
                    </div>
                </div>
            </div>

            <button class="v-button b-primary back" v-show="page.orderDetail" @click="back()">返回采购页面</button>
        </div>
    </div>
</template>

<script>
    import Qs from 'qs'
    import Axios from 'axios'
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {
                // 原材料数据
                data: [],
                // 购物车序列
                purchaseList: [],
                // 运输方式序列
                transports: [],
                // 订单数据
                orderDetailInfo: [],
                // 总金额
                total: 0,
                // 当前review
                reviewNow: null,
                // 分页数目
                pageCount: 10,
                // 页面
                page: {
                    materialPurchase: true,
                    orderDetail: false
                },
                // 浮窗
                float: {
                    transport: false,
                    review: false
                }
            }
        },
        methods: {
            // 两页面跳转
            back() {
                if (!(this.orderDetailInfo == true)) {
                    this.getOrderInfo();        
                }
                this.page.materialPurchase = !this.page.materialPurchase;
                this.page.orderDetail = !this.page.orderDetail;
            },
            // 分页页数随浏览器高度变换
            paginationWatch() {
                let body = document.getElementsByTagName('body')[0];
                let height = body.offsetHeight;
                let distance = height - 969;
                if (distance < 0) {
                    let level = parseInt(Math.abs(distance) / 50);
                    this.pageCount -= level;
                }
                if (this.pageCount < 5) {
                    this.pageCount = 5;
                }
            },

            // 获取原材料信息
            getMaterialInfo() {
                Axios.get(this.URL + '/game/compete/operation/stock/material?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.data = this.Util.chunk(Response.data.data, 3);
                        }
                    })
            },
            // 获取所有已有订单信息
            getOrderInfo() {
                Axios.post(this.URL + '/game/compete/operation/stock/material/order/all', Qs.stringify({
                    enterpriseId: localStorage.getItem('enterpriseId')
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.orderDetailInfo = Response.data.data;
                    } else {
                        alert('订单获取失败');
                    }
                })
            },
            // 获取所有已有订单信息（页面异步）
            _getOrderInfo(state) {
                Axios.post(this.URL + '/game/compete/operation/stock/material/order/all', Qs.stringify({
                    enterpriseId: localStorage.getItem('enterpriseId')
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.page.orderDetail = false;
                        this.page.materialPurchase = true;
                        this.orderDetailInfo = Response.data.data;
                        if (state) {
                            this.back();
                        } else {
                            // location.reload();
                            this.$nextTick(() => {
                                // this.page.orderDetail = true;
                            })
                            // this.page.orderDetail = true;
                        }
                    } else {
                        alert('订单获取失败');
                    }
                })
            },
            // 添加进购物车
            shopAdd(data) {
                for (let i = 0; i < this.purchaseList.length; i ++) {
                    if (this.purchaseList[i].materialBasicId === data.materialBasicId) {
                        this.purchaseList[i].purchaseNumber ++;
                        this.totalCount();
                        return;
                    }
                }
                let info = {
                    enterpriseId: localStorage.getItem('enterpriseId'),
                    meterialName: data.materialName,
                    materialBasicId: data.materialBasicId,
                    price: data.materialPrice,
                    purchaseNumber: 1,
                    transportBasicId: null
                }
                this.purchaseList.push(info);
                this.totalCount();
            },
            // 计算总金额
            totalCount() {
                let temp = 0;
                for (let i = 0; i < this.purchaseList.length; i ++) {
                    temp += this.purchaseList[i].price * this.purchaseList[i].purchaseNumber;
                }
                this.total = temp;
            },
            // 购买
            purchase(item) {
                let i = confirm('是否选择：' + item.transportName);
                if (i) {
                    for (let i = 0; i < this.purchaseList.length; i ++) {
                        this.purchaseList[i].transportBasicId = item.id;
                    }
                    Axios.post(this.URL + '/game/compete/operation/stock/material/order/submit', this.purchaseList)
                        .then(Response => {
                            if (Response.data.code === 200) {
                                this.selectTransport();
                                this.$store.commit('controlAlert', [true, 'TRUE', Response.data.msg, null, null, null]);
                                setTimeout(() => {
                                    this.$store.commit('controlAlert', [false]);
                                    this.purchaseList = [];
                                    this.total = 0.00;
                                    // this._getOrderInfo(true);
                                }, 1500);
                            } else {
                                alert('选择失败，请稍后重试');
                            }
                        })
                }
            },
            // 获取所有运输方式
            getTransport() {
                Axios.get(this.URL + '/game/compete/operation/stock/transport?gameId=' + localStorage.getItem('GAME'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.transports = Response.data.data;
                        } else {
                            alert('运输方式获取失败');
                        }
                    })
            },
            // 选购运输方式
            selectTransport() {
                this.$store.commit('controlFloatWindow');
                this.float.transport = !this.float.transport;
            },
            // 审核订单
            review(id) {
                if (id) {
                    this.reviewNow = id;
                } else {
                    this.reviewNow = null;
                }
                this.$store.commit('controlFloatWindow');
                this.float.review = !this.float.review;
            },
            // 提交审核订单
            review_confirm() {
                Axios.put(this.URL + '/game/compete/operation/stock/material/transport/status/checked', Qs.stringify({
                    materialOrderId: this.reviewNow
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.review(); 
                        this.$store.commit('controlAlert', [true, 'TRUE', Response.data.msg, null, null, null]);
                        setTimeout(() => {
                            this.$store.commit('controlAlert', [false]);
                            this._getOrderInfo();
                        }, 1500);
                    } else {
                        alert('操作失败');
                        this._getOrderInfo();
                        this.review();
                    }
                })
            },
        },
        created() {
            this.paginationWatch();
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/materialPurchase', 'purchase', 'purchase');
            }, 1);
            this.getTransport();
            // 设置页面格式
            this.$store.commit('pageState', 'materialPurchase')
            this.getMaterialInfo();
        },
        watch: {
            'purchaseList': function(val) {
                this.totalCount();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #materialPurchase {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                display: flex;
                padding-bottom: 15px;
                flex-direction: row;
                .shop {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    flex: 0.65;
                    padding: 10px 30px 30px 30px;
                    .contents {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                    }
                    .temp {
                        // min-width: 210px;
                        flex: 1;
                    }
                    .cover {
                        flex: 1;
                    }
                    .card {
                        width: 65%;
                        padding-top: 10px;
                        height: 0;
                        padding-bottom: 100%;
                        background-color: #eee;
                        margin-top: 30px;
                        .img {
                            position: relative;
                            width: 90%;
                            padding-bottom: 80%;
                            height: 0;
                            margin: 0px 5% 0px 5%;
                            background-color: #fff;
                            img {
                                position: absolute;
                                width: 80%;
                                top: 5%;
                                left: 10%;
                            }
                        }
                    }
                    .info {
                        position: relative;
                        width: 95%;
                        height: 0px;
                        padding: 5%;
                        padding-bottom: 63%;
                        font-size: 14px;
                        line-height: 25px;
                        h3 {
                            font-size: 22px;
                        }
                        .storage {
                            position: absolute;
                            left: 10px;
                            bottom: 0;
                        }
                        .money {
                            font-size: 14px;
                        }
                        .add {
                            position: absolute;
                            cursor: pointer;
                            width: 12%;
                            right: 0;
                            bottom: 0;
                        }
                    }
                }    
                .order {
                    position: relative;
                    max-height: 500px;
                    flex: 0.35;
                    padding: 30px 30px 0 0;
                    h3 {
                        font-size: 20px;
                        border-bottom: 2px solid rgb(195, 195, 207);
                        padding-bottom: 20px;
                    }
                    ul {
                        min-height: 340px;
                        max-height: 340px;
                        border-bottom: 2px solid rgb(195, 195, 207);
                        // padding-bottom: 70px;
                        overflow: auto;
                        li {
                            position: relative;
                            display: flex;
                            flex-direction: row;
                            margin-top: 50px;  
                            height: 30px;
                            width: 100%;
                            .img {
                                img {
                                    width: 70px;
                                }
                            }
                            .info {
                                h4 {
                                    font-size: 16px;
                                    font-weight: bold;
                                }
                                .money {
                                    border-radius: 3px;
                                    border: 1px solid #aaa;
                                    outline: none;
                                    color: #aaa;
                                    padding-left: 3px;
                                    margin-top: 12px;
                                    width: 30px;
                                }
                            }
                            .total {
                                position: absolute;
                                top: 12px;
                                font-size: 18px;
                                right: 10px;
                            }
                            &:nth-of-type(1) {
                                margin-top: 20px;
                            }
                        }
                    }
                    /* 设置滚动条的样式 */
                    ul::-webkit-scrollbar {
                        width: 6px;
                    }
                    /* 滚动槽 */
                    ul::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                    }
                    
                    /* 滚动条滑块 */
                    ul::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        background: rgba(0,0,0,0.1);
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
                    }
                    .purchase {
                        position: absolute;
                        width: 150px;
                        font-size: 18px;
                        right: 30px;
                        bottom: 0px;
                    }
                    .orderInfo {
                        position: absolute;
                        width: 150px;
                        font-size: 18px;
                        right: 200px;
                        bottom: 0px;
                    }
                    .result {
                        position: absolute;
                        right: 30px;
                        bottom: 51px;
                        font-size: 22px;
                    }
                }
            }
            .orderDetail {
                padding: 20px 50px 20px 50px;
                padding-bottom: 150px;
            }
            .transport {
                .container {
                    height: 440px;
                    .title {
                        margin-top: 15px;
                        padding-left: 0;
                    }
                    .market {
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                        font-size: 14px;
                        .v-select {
                            width: 250px;
                            height: 35px;
                        }
                    }
                    .v-table_border {
                        margin-top: 20px;
                        width: 500px;
                    }
                }
            }
            .review {
                .container {
                    .main {
                        display: flex;
                        flex-direction: column;
                        padding: 20px 50px 20px 50px;
                        line-height: 30px;
                        font-size: 14px;
                    }
                }
            }
            .back {
                position: absolute;
                right: 20px;
                bottom: 20px;
            }
        }
    }
</style>
