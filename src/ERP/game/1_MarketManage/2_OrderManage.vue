<template>
    <div id="orderManage">
        <div class="nav">
            <a href=""></a>
            <h3>订单获取</h3>
        </div>
        <div class="container mg">
            <div class="header">
                <a>订单获取</a>
                <a>订单详情</a>
            </div>
            <div class="form mg">
                <div class="turn" v-if="!page.detail">
                    <div class="line"></div>
                    <ul>
                        <li v-bind:class="{ active: page.putIn }">...<span>投放</span></li>
                        <li v-bind:class="{ active: page.confirm }">...<span>确定</span></li>
                        <li v-bind:class="{ active: page.wait }">...<span>等待</span></li>
                        <li v-bind:class="{ active: page.select }">...<span>选取</span></li>
                        <li v-bind:class="{ active: page.end }">...<span>结束</span></li>
                    </ul>
                </div>

                <!-- Page-1 -->
                <div class="putIn" v-if="page.putIn">
                    <div class="putIn_form mg">
                        <div class="item">
                            <span>产品</span>
                            <input type="text" placeholder="请选择"><img src="../../../assets/icon/edit.svg" alt="" @click="chooseProduct()">
                        
                            <!-- 选择产品 -->
                            <div class="v-alert" v-if="float.productList">
                                <div class="pre_container">
                                    <div class="pre_title">
                                        <a @click="chooseProduct()"> <<-- </a>
                                        <h3>选择产品</h3>
                                    </div>
                                    <div class="market">
                                        <p>市场：</p><select name="" id="" v-model="marketSelected">
                                            <option value="1">本地市场</option>
                                            <option value="2">区域市场</option>
                                            <option value="3">国内市场</option>
                                            <option value="">国际市场</option>
                                        </select>
                                        {{ marketSelected }}
                                    </div>
                                    <table class="v-table mg">
                                        <tr>
                                            <th>编号</th>
                                            <th>产品名称</th>
                                            <th>操作</th>
                                        </tr>
                                        <tr>
                                            <td>29674</td>
                                            <td>P2</td>
                                            <td><button class="v-button b-primary">选择</button></td>
                                        </tr>
                                        <tr>
                                            <td>29675</td>
                                            <td>P3</td>
                                            <td><button class="v-button b-primary">选择</button></td>
                                        </tr>
                                        <tr>
                                            <td>29676</td>
                                            <td>P4</td>
                                            <td><button class="v-button b-primary">选择</button></td>
                                        </tr>
                                        <tr>
                                            <td>29673</td>
                                            <td>P1</td>
                                            <td><button class="v-button b-primary">选择</button></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <span>编号</span>
                            <input type="text">
                        </div>
                        <div class="item">
                            <span>投放广告（万元）</span>
                            <input type="text" placeholder="请输入投放金额"><img src="../../../assets/icon/warn.svg"  alt="" @mouseover="ADnotice = !ADnotice" @mouseout="ADnotice = !ADnotice">
                        
                            <!-- 广告费用 -->
                            <div class="ADnotice" v-if="ADnotice">
                                <h3>广告费用</h3>
                                <p>Ⅰ.广告费有两个用途，一是获得选取订单的机会，二是判断选单的顺序。</p>
                                <p>Ⅱ.投入1w的产品广告费就可以获得一次选择订单的机会。如果不投广告就没有选择订单的机会。一次机会允许获得一张订单。如果想要获得更多的订单机会，每增加一个机会就需要多投入2w的广告费用。比如投入1w获得一个机会，获取一张订单，投入3w获得两次机会，获得两个订单。以此类推，投入5w获得三次机会，获得三个订单。获得三次机会可以只使用一次机会。</p>
                            </div>
                        </div>
                    </div>
                    <div class="confirm">
                        <button class="v-button b-primary" @click="ADconfirm()">确定</button>
                        <button class="v-button b-primary">返回</button>
                    </div>
                </div>

                <!-- Page-2 -->
                <!-- <v-pagination-list class="confirm mg"></v-pagination-list> -->
                <div class="confirm" v-if="page.confirm">
                    <table class="v-table mg">
                        <tr>
                            <th>编号</th>
                            <th>市场</th>
                            <th>产品</th>
                            <th>广告费</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(item, index) in data_confirm[pageNow - 1]">
                            <td>{{ item.id }}</td>
                            <td>{{ item.location }}</td>
                            <!-- 暂时解决方案 -->
                            <td v-if="refresh">{{ item.production }}</td>
                            <td>
                                <span v-if="!editable[item.id - 1]">{{ item.money }}</span>
                                <input type="text" v-model="item.money" v-if="editable[item.id - 1]">
                            </td>
                            <td>
                                <img src="../../../assets/icon/edit.svg" alt="" @click="editADcost(index)">
                                <img src="../../../assets/icon/trash.svg" alt="">
                            </td>
                        </tr>
                    </table>
                    <v-pagination-list 
                    :length="data_confirm.length" 
                    v-bind:pageNow="pageNow" 
                    v-on:change="pageNow = $event">
                    </v-pagination-list>
                    <div class="confirm">
                        <button class="v-button b-primary" @click="ADconfirm()">确定</button>
                        <button class="v-button b-primary">上一步</button>
                    </div>
                </div>

                <!-- Page-3 -->
                <div class="wait" v-if="page.wait">
                    <div class="fl">
                        <div class="item">
                            <span>市场：</span>
                            <ul>
                                <li class="active">本地</li>
                                <li>区域</li>
                                <li>国内</li>
                                <li>亚洲</li>
                                <li>国际</li>
                            </ul>
                        </div>
                        <div class="item">
                            <span>产品：</span>
                            <ul>
                                <li class="active">P1</li>
                                <li>P2</li>
                                <li>P3</li>
                                <li>P4</li>
                            </ul>
                        </div>
                    </div>
                    <div class="fr">
                        <div class="time">
                            <span>当前状态：第2位/15</span>
                            <br><br>
                            <span>剩余次数：1/2次</span>
                        </div>
                    </div>
                    <div class="order mg">

                    </div>
                    <button class="v-button b-primary" @click="endOrder()">结束订单会</button>
                </div>

                <!-- Page-4 -->
                <div class="select" v-if="page.select">
                    <div class="fl">
                        <div class="item">
                            <span>市场：</span>
                            <ul>
                                <li class="active">本地</li>
                                <li>区域</li>
                                <li>国内</li>
                                <li>亚洲</li>
                                <li>国际</li>
                            </ul>
                        </div>
                        <div class="item">
                            <span>产品：</span>
                            <ul>
                                <li class="active">P1</li>
                                <li>P2</li>
                                <li>P3</li>
                                <li>P4</li>
                            </ul>
                        </div>
                    </div>
                    <div class="fr">
                        <div class="time">
                            <span>当前状态：第1位/15</span>
                            <br><br>
                            <span>剩余次数：1/2次</span>
                        </div>
                    </div>
                    <div class="order mg">
                        
                    </div>
                    <button class="v-button b-primary" @click="endOrder()">结束订单会</button>
                    <div class="v-alert" v-if="float.endOrder">
                        <div class="pre_container">
                            <div class="pre_title">
                                <h3>结束订单会？</h3>
                            </div>
                            <button class="v-button b-primary">确认</button>
                            <button class="v-button b-primary" @click="endOrder()">取消</button>
                        </div>
                    </div>
                </div>

                <!-- Page-5 -->
                <div class="end" v-if="page.end">
                    <!-- 暂时为空 -->
                </div>
                <!-- Page-6 -->
                <div class="detail" v-if="page.detail">
                    <table class="v-table mg">
                        <tr>
                            <th>编号</th>
                            <th>市场</th>
                            <th>产品</th>
                            <th>单价</th>
                            <th>交货时间</th>
                            <th>账期</th>
                            <th>罚金率</th>
                            <th>数量</th>
                        </tr>
                        <tr v-for="(item, index) in data_detail[pageNow - 1]">
                            <td>{{ item.id }}</td>
                            <td>{{ item.market }}</td>
                            <td>{{ item.production }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.pay }}</td>
                            <td>{{ item.date }}</td>
                            <td>{{ item.punish }}</td>
                            <td>{{ item.count }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 弹窗
                float: {
                    productList: false,
                    endOrder: false
                },
                // 页面
                page: {
                    putIn: true,
                    confirm: false,
                    wait: false,
                    select: false,
                    end: false,
                    detail: false
                },
                // 广告费用
                ADnotice: false,

                // 查看产品项
                marketSelected: 1,
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
        },
        methods: {
            // 输入框产品选择
            chooseProduct(id, state) {
                this.$store.commit('controlFloatWindow');
                this.float.productList = !this.float.productList;
                Axios.get(this.URL + '/game/compete/operation/market/market/infos/get/status?enterpriseId=' + id + '&marketStatus=' + state)
                    .then(Response => {
                    })
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
            .header {
                text-align: center;
                width: 100%;
                height: 60px;
                line-height: 60px;
                a {
                    padding: 20px;
                }
            }
            .form {
                text-align: center;
                width: 1000px;
                height: 600px;
                border: 1px solid #666;
                .turn {
                    position: relative;
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    .line {
                        position: absolute;
                        width: 900px;
                        top: 50px;
                        left: 50px;
                        border-top: 1px solid #000;
                    }
                    ul {
                        top: 10px;
                        position: absolute;
                        display: flex;
                        width: 900px;
                        margin-left: 50px;
                        justify-content: space-between;
                        li {
                            position: relative;
                            width: 80px;
                            line-height: 80px;
                            text-align: center;
                            height: 80px;
                            background-color: #eee;
                            border-radius: 50%;
                            span {
                                display: block;
                                position: absolute;
                                font-size: 16px;
                                top: 45px;
                                left: 25px;
                            }
                        }
                        .active {
                            background-color: aqua;
                        }
                    }
                }

                // Page-1
                .putIn {
                    height: 500px;
                    .putIn_form {
                        // display: flex;
                        flex-wrap: wrap;
                        flex-direction: column;
                        margin-top: 50px;
                        width: 880px;
                        height: 150px;
                        border-top: 1px solid #000;
                        border-left: 1px solid #000;
                        .item {
                            position: relative;
                            display: flex;
                            flex: 1;
                            width: 100%;
                            border-bottom: 1px solid #000;
                            span {
                                // display: block;
                                width: 300px;
                                line-height: 50px;
                            }
                            input {
                                width: 580px;
                                padding-left: 5px;
                            }
                            img {
                                cursor: pointer;
                                width: 35px;
                                position: absolute;
                                right: 5px;
                                top: 5px;
                            }
                            .v-alert {
                                .pre_container {
                                    height: 500px;
                                }
                                .market {
                                    display: flex;
                                    justify-content: center;
                                    margin-top: 30px;
                                }
                                .v-table {
                                    width: 400px;
                                    margin-top: 50px;
                                    th {
                                        background-color: #eee;
                                    }
                                }
                            }
                            .ADnotice {
                                position: absolute;
                                background-color: #fff;
                                right: 45px;
                                top: -260px;
                                border-radius: 10px;
                                width: 800px;
                                height: 300px;
                                border: 1px solid #000;
                                h3 {
                                    margin-top: 20px;
                                    font-weight: bold;
                                }
                                p {
                                    text-align: left;
                                    line-height: 30px;
                                    &:nth-of-type(1) {
                                        margin-top: 20px;
                                    }
                                }
                            }
                        }
                    }
                    .confirm {
                        margin-top: 100px;
                        button {
                            width: 100px;
                            margin: 50px;
                        }  
                    }
                }

                // Page-2
                .confirm {
                    margin-top: 30px;
                    img {
                        width: 30px;
                        cursor: pointer;
                    }
                    button {
                        width: 100px;
                        margin: 50px;
                    }  
                    input {
                        width: 100px;
                    }
                }

                // Page-3
                .wait {
                    margin-top: 30px;
                    .item {
                        margin-left: 30px;
                        margin-top: 20px;
                        display: flex;
                        li {
                            width: 40px;
                            height: 20px;
                            float: left;
                        }
                        .active {
                            color: #fff;
                            background-color: aqua;
                        }
                    }
                    .time {
                        text-align: left;
                        padding: 5px;
                        width: 300px;
                        height: 60px;
                        border: 1px solid #000;
                        margin-top: 20px;
                        margin-right: 30px;
                        margin-bottom: 20px;
                    }
                    .order {
                        clear: both;
                        width: 960px;
                        height: 300px;
                        border: 1px solid #000;
                    }
                    button {
                        width: 200px;
                        margin-top: 20px;
                    }
                }

                // Page-4
                .select {
                    margin-top: 30px;
                    .item {
                        margin-left: 30px;
                        margin-top: 20px;
                        display: flex;
                        li {
                            width: 40px;
                            height: 20px;
                            float: left;
                        }
                        .active {
                            color: #fff;
                            background-color: aqua;
                        }
                    }
                    .time {
                        text-align: left;
                        padding: 5px;
                        width: 300px;
                        height: 60px;
                        border: 1px solid #000;
                        margin-top: 20px;
                        margin-right: 30px;
                        margin-bottom: 20px;
                    }
                    .order {
                        clear: both;
                        width: 960px;
                        height: 300px;
                        border: 1px solid #000;
                    }
                    button {
                        width: 200px;
                        margin-top: 20px;
                    }
                    .v-alert {
                        button {
                            width: 150px;
                            margin-top: 100px;
                        }
                    }
                }

                // Page-6
                .detail {
                    .v-table {
                        margin-top: 20px;
                    }
                }
            }
        }
    }
</style>
