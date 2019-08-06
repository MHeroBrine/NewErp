<template>
    <div id="orderManage">
        <div class="container_default">
            <div class="title">
                <h3>订单获取</h3>
            </div>
            <div class="main">
                <div class="header">
                    <ul>
                        <li v-bind:class="{ active: page.putIn }"><span><a>1.</a> 投放</span></li>
                        <li v-bind:class="{ active: page.confirm }"><span><a>2.</a> 确定</span></li>
                        <li v-bind:class="{ active: page.wait }"><span><a>3.</a> 等待</span></li>
                        <li v-bind:class="{ active: page.select }"><span><a>4.</a> 选取</span></li>
                        <li v-bind:class="{ active: page.end }"><span><a>5.</a> 结束</span></li>
                    </ul>
                </div>
                <div class="form" v-show="page.putIn">
                    <ul>
                        <li>
                            <span>产品</span>
                            <input type="text" class="v-input" v-model="AD_data.productName">
                            <img src="@/assets/Game/1_MarketManage/edit.svg" @click="chooseProduct(); chooseMarket();">
                        </li>
                        <li>
                            <span>编号</span>
                            <input type="text" class="v-input" v-model="AD_data.productBasicInfoId">
                        </li>
                        <li>
                            <span>投放广告（万元）</span>
                            <input type="text" class="v-input" v-model="AD_data.money">
                            <img src="@/assets/Game/1_MarketManage/warning.svg" alt="" @mouseover="float.note = true" @mouseout="float.note = false">
                            <div class="hover" v-show="float.note">
                                <p>Ⅰ.广告费有两个用途，一是获得选取订单的机会，二是判断选单的顺序。</p>
                                <p>Ⅱ.投入1w的产品广告费就可以获得一次选择订单的机会。如果不投广告就没有选择订单的机会。一次机会允许获得一张订单。如果想要获得更多的订单机会，每增加一个机会就需要多投入2w的广告费用。比如投入1w获得一个机会，获取一张订单，投入3w获得两次机会，获得两个订单。以此类推，投入5w获得三次机会，获得三个订单。获得三次机会可以只使用一次机会。</p>
                            </div>
                        </li>
                    </ul>

                    <div class="actions">
                        <button class="v-button b-primary" style="width: 120px;" @click="pushAD()">加入投放列表</button>
                        <button class="v-button b-primary" @click="TipLink('confirm')">下一步</button>
                    </div>
                </div>
                <div class="confirm" v-show="page.confirm">
                    <table class="v-table">
                        <tr>
                            <th>编号</th>
                            <th>市场</th>
                            <th>产品</th>
                            <th>广告费</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="item in AD_data_list">
                            <td>{{ item.productBasicInfoId }}</td>
                            <td>{{ item.marketName }}</td>
                            <td>{{ item.productName }}</td>
                            <td>{{ item.money }}</td>
                            <td>
                                <!-- <img src="@/assets/Game/2_OrderManage/edit.svg" class="edit" alt="编辑"> -->
                                <img src="@/assets/Game/2_OrderManage/delete.svg" class="edit" alt="删除" @click="deleteItem(item.id)">
                            </td>
                        </tr>
                    </table>

                    <div class="actions">
                        <button class="v-button b-primary" @click="TipLink('putIn')">上一步</button>
                        <button class="v-button b-primary" @click="confirmAD()">下一步</button>
                    </div>
                </div>
                <div class="wait" v-show="page.wait">
                    <div class="select">
                        <div class="market">
                            <div class="area">
                                <p>市场：<a>区域</a><a>国内</a><a>亚洲</a><a>国际</a></p>
                                <p>产品：<a>P1</a><a>P2</a><a>P3</a><a>P4</a></p>
                            </div>
                        </div>
                        <div class="state">
                            <img src="@/assets/Game/1_MarketManage/wait.svg" class="wait">
                            <p>当前状态：<a>等待中（2 / 15）</a></p>
                            <p>剩余次数：<a>1 / 2 次</a></p>
                            <p></p>
                        </div>
                    </div>
                    <div class="main">

                    </div>
                </div>

                <div class="v-alert putIn" v-show="float.productList">
                    <div class="container mg">
                        <img src="@/assets/Game/2_OrderManage/wrong.svg" class="exit" @click="exitProduct()">
                        <div class="title">
                            <h3>选择产品</h3>
                        </div>
                        <div class="market">
                            <span>市场：</span>
                            <select class="v-select" v-model="marketSelected">
                                <option :value="item.id" v-for="item in market_AD">
                                    {{ item.marketName }}
                                </option>
                            </select>
                        </div>
                        <table class="v-table_border mg">
                            <tr>
                                <th>编号</th>
                                <th>产品名称</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="item in product_AD">
                                <td>{{ item.id }}</td>
                                <td>{{ item.productName }}</td>
                                <td><button class="v-button b-primary" @click="chooseAD(item.id, item.productName)">选择</button></td>
                            </tr>
                        </table>
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
                // 弹窗
                float: {
                    productList: false,
                    endOrder: false,
                    note: false
                },
                // 页面
                page: {
                    putIn: false,
                    confirm: false,
                    wait: false,
                    select: true,
                    end: false,
                    detail: false
                },
                // 广告费用
                ADnotice: false,

                // 当前选择的市场
                marketSelected: 1,
                // 投放广告的产品数据
                product_AD: [],
                // 投放广告的市场数据
                market_AD: [],
                // 广告数据
                AD_data: {
                    marketBasicInfoId: null,
                    money: null,
                    productBasicInfoId: null,
                    productName: null
                },
                // 广告数据列表
                AD_data_list: [],
                // 确认部分数据
                data_confirm: [
                    [
                        {
                            id: "1",
                            location: '本地',
                            production: 'P1',
                            money: '1W'
                        },
                        {
                            id: "2",
                            location: '本地',
                            production: 'P1',
                            money: '1W'
                        },
                        {
                            id: "3",
                            location: '本地',
                            production: 'P1',
                            money: '1W'
                        },
                    ],
                    [
                        {
                            id: "4",
                            location: '本地',
                            production: 'P1',
                            money: '1W'
                        }
                    ]
                ],
                data_detail: [
                    [
                        {
                            id: '189068',
                            market: '本地市场',
                            production: 'P1',
                            price: '1',
                            pay: '7',
                            date: '2',
                            punish: '5%',
                            count: '1'
                        }
                    ]
                ],
                // 确定页面，当前显示页
                pageNow: 1,
                // 可编辑设置
                editable: [],
                // 表单刷新控制
                refresh: true,
                
            }
        },
        beforeMount() {
            this.editCheck(this.data_confirm);
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'orderManage')
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/orderManage', 'marketManage', 'manage');
            }, 1);
        },
        methods: {
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
            // 市场列表
            chooseMarket() {
                Axios.get(this.URL + '/game/compete/operation/market/type?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.market_AD = Response.data.data;
                        } else {
                            alert('市场列表获取失败')
                        }
                    })
            },
            // 输入框产品选择列表
            chooseProduct() {
                this.$store.commit('controlFloatWindow');
                this.float.productList = !this.float.productList;
                Axios.get(this.URL + '/game/compete/operation/product/type?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.product_AD = Response.data.data;
                        } else {
                            alert('广告产品获取失败');
                        }
                    })
            },
            // 选择广告
            chooseAD(id, name) {
                this.AD_data.marketBasicInfoId = this.marketSelected;
                for (let item in this.market_AD) {
                    if (this.AD_data.marketBasicInfoId === this.market_AD[item].id) {
                        this.AD_data.marketName = this.market_AD[item].marketName;
                    }
                }
                this.AD_data.productBasicInfoId = id;
                this.AD_data.productName = name;
                this.exitProduct();
            },
            // 广告推入列表
            pushAD() {
                if (this.AD_data.marketBasicInfoId && this.AD_data.productBasicInfoId && this.AD_data.productName && this.AD_data.money) {
                    let data = JSON.parse(JSON.stringify(this.AD_data))
                    if (this.AD_data_list.length === 0) {
                        data.id = 1;
                    } else {
                        data.id = (this.AD_data_list[this.AD_data_list.length - 1].id || 0) + 1; 
                    }
                    this.AD_data_list.push(data);
                    for (let item in this.AD_data) {
                        this.AD_data[item] = null;
                    }
                    alert('加入成功，可以继续添加其它广告');
                } else {
                    alert('请选择好信息再添加');
                }
            },
            // 确认广告订单
            confirmAD() {
                let i = confirm('是否确认投放这些广告？');
                if (i) {
                    Axios.post(this.URL + '/game/compete/operation/order/choose/advertise?enterpriseId=' + localStorage.getItem('enterpriseId'), this.AD_data_list)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert('投放成功');
                            this.TipLink('wait');
                        }
                    })
                }
            },
            // 删除列表中的缓存广告
            deleteItem(id) {
                let i = confirm('确认删除该项吗');
                if (i) {
                    for (let i = 0; i < this.AD_data_list.length; i ++) {
                        if (this.AD_data_list[i].id === id) {
                            this.AD_data_list.splice(i, 1);
                        }
                    }
                }
            },
            // 退出选择框
            exitProduct() {
                this.$store.commit('controlFloatWindow');
                this.float.productList = !this.float.productList;
            },
            editCheck(data) {
                let arr = [];
                for (let item in data) {
                    arr = arr.concat(data[item]);
                }
                for (let i = 0; i < arr.length; i ++) {
                    arr[i] = false;
                }
                this.editable = arr;
            },
            editADcost(value) {
                this.editable[value] = !this.editable[value];
                this.refresh = false;
                this.refresh = true;
            },
            // 进程跳转
            TipLink(address) {
                for (let item in this.page) {
                    this.page[item] = false;
                }
                this.page[address] = true;
            },
            // 结束订单会
            endOrder() {
                this.$store.commit('controlFloatWindow');
                this.float.endOrder = !this.float.endOrder;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #orderManage {
        width: 100%;
        .container_default {
            display: flex;
            flex-direction: column;
            position: relative;
            min-height: 400px;
            height: 95%;

            .actions {
                position: absolute;
                bottom: 20px;
                // margin: 40px;
                right: 30px;
                button {
                    // margin: 5px;
                    width: 80px;
                    margin-left: 10px;
                }
            }
            .main {
                .header {
                    width: 100%;
                    height: 80px;
                    ul {
                        margin: 20px 10px 0 10px;
                        display: flex;
                        flex-direction: row;
                        li {
                            margin: 10px;
                            border-radius: 5px;
                            background-color: #eee;
                            height: 52px;
                            line-height: 52px;
                            font-size: 15px;
                            padding-left: 15px;
                            color: rgb(139, 139, 139);
                            text-align: left;
                            flex: 1;
                            a {
                                color: rgb(139, 139, 139);
                                font-size: 18px;
                            }
                        }
                        .active {
                            color: #fff;
                            background-color: #A9D86E;
                            a {
                                color: #fff;
                                font-size: 18px;
                            }
                        }
                    }
                }
                .form {
                    margin: 20px 30px 0 30px;
                    ul {
                        li {
                            position: relative;
                            margin-top: 20px;
                            display: flex;
                            flex-direction: row;
                            span {
                                font-size: 14px;
                                line-height: 32px;
                                color: #666;
                                flex: 0.2;
                            }
                            input {
                                border-color: rgb(212, 212, 212);
                                padding-left: 10px;
                                height: 32px;
                                border-radius: 7px;
                                flex: 0.8;
                            }
                            img {
                                position: absolute;
                                cursor: pointer;
                                right: 5px;
                                top: 2px;
                                width: 25px;
                            }
                            .hover {
                                position: absolute;
                                width: 450px;
                                height: 180px;
                                background-color: #fff;
                                right: 35px;
                                bottom: 0;
                                font-size: 14px;
                                color: #666;
                                padding: 10px;
                                line-height: 20px;
                                border: 1px solid #aaa;
                                border-radius: 20px;
                            }
                        }
                    }
                }
                .confirm {
                    padding: 20px 50px 20px 50px;
                    td {
                        position: relative;
                        img {
                            cursor: pointer;
                            position: absolute;
                            width: 30px;
                            top: 10px;
                        }
                        .delete {
                            width: 30px;
                            left: 60px;
                        }
                    }
                }
                .wait {
                    .select {
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        height: 120px;
                        .market {
                            padding: 20px;
                            flex: 0.7;
                            .area {
                                font-size: 14px;
                                line-height: 30px;
                                a {
                                    color: #aaa;
                                    font-size: 12px;
                                    padding: 4px;
                                    margin-right: 20px;
                                    &:hover {
                                        background-color: #aaa;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                        .state {
                            position: relative;
                            font-size: 14px;
                            padding: 20px;
                            flex: 0.3;
                            line-height: 30px;
                            a {
                                font-size: 12px;
                                color: #aaa;
                            }
                            img {
                                position: absolute;
                                width: 20px;
                            }
                            .wait {
                                top: 25px;
                                right: 20px;
                            }
                            .active {
                                color: #1afa29;
                            }
                        }
                    }
                    .main {
                        height: 240px;
                        margin: 0 20px 20px 20px;
                        border: 1px solid #aaa;
                        border-radius: 5px;
                    }
                }

                .putIn {
                    .container {
                        height: 480px;
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
            }
        }
    }
</style>
