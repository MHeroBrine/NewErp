<template>
    <div id="factoryManage">
        <div class="container_default">
            <div class="title">
                <h3>厂房管理</h3>
            </div>
            <div class="main">
                <div class="search">
                    <div class="icon" @click="createFactory()">
                        <p>新建厂房</p>
                        <img src="@/assets/Game/5_ProduceManage/add.svg">
                    </div>
                    <div class="icon" @click="leanFactory()">
                        <p>租借厂房</p>
                        <img src="@/assets/Game/5_ProduceManage/loan.svg">
                    </div>
                </div>

                <div class="v-alert turn" v-show="float.turning">
                    <div class="container mg">
                        <div class="title">
                            <h3>请选择需要转产的产品</h3>
                        </div>
                        <div class="main">
                            <div class="product">
                                产品列表：<select v-model="turningProduct">
                                    <option :value="item.id" v-for="item in productAvailable">
                                        {{ item.productName }}
                                    </option>
                                </select>
                            </div>
                            <div class="button">
                                <button @click="lineConversion_confirm(turningLine, turningProduct)">确认</button>
                                <button @click="lineConversion(null)">返回</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 已修建的厂房 -->
                <div class="table_factory" v-for="item in factoryInfo">
                    <div class="head" @click="showFactoryLine(item.id)">
                        <a class="profile"><img src="@/assets/Game/5_ProduceManage/factory_2.svg" class="factory" alt=""></a>
                        <div class="titles">
                            <span>厂房编号</span>
                            <span>规模</span>
                            <span>类型</span>
                            <span>生产线数量</span>
                            <span>状态</span>
                            <span>操作</span>
                        </div>
                        <div class="info">
                            <span>{{ item.factoryNumber }}</span>
                            <span>{{ item.factoryType }}</span>
                            <span v-if="item.factoryHoldingStatus === 'HOLDING'">非租赁</span>
                            <span v-if="item.factoryHoldingStatus === 'LEASING'">租赁</span>
                            <span>{{ item.currentCapacity }} / {{ item.factoryCapacity }}<img src="@/assets/Game/5_ProduceManage/add_2.svg" class="add" @click="createNewLine(item.id)"></span>
                            <span v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === true">拥有中</span>
                            <span v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === false">已出售</span>

                            <span v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === true">租赁中</span>
                            <span v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === false">暂停租赁</span>
                            <span>
                                <button class="v-button b-primary" @click="getFactoryDetail(item.id)">详情</button>
                                <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'HOLDING'" @click="sellFactory(item.id)">出售</button>
                                <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === true" @click="pause_lean(item.id)">暂停生产</button>
                                <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === false" @click="_continue_lean(item.id)">继续生产</button>
                            </span>
                        </div>
                        <img src="@/assets/Game/5_ProduceManage/down.svg" class="down" alt="">
                        <!-- <img src="@/assets/Game/5_ProduceManage/down.svg" class="down" alt=""> -->
                    </div>
                    <!-- 修建状态 -->
                    <ul class="new_ul"v-for="_item in item.prodlineDevelopDisplayVoList" v-show="false" :ref="'list_' + item.id">
                        <img src="@/assets/Game/5_ProduceManage/tool.svg" class="tool" alt="">
                        <li>{{ _item.prodlineType }}</li>
                        <li v-if="_item.prodlineDevelopStatus === 'DEVELOPING'">正在安装</li>
                        <li v-if="_item.prodlineDevelopStatus === 'DEVELOPPAUSE'">暂停安装</li>
                        <li v-if="_item.prodlineDevelopStatus === 'DEVELOPED'">完成安装</li>
                        <li>可生产产品：{{ _item.productName }}</li>
                        <li>已修建周期：{{ _item.developedPeriod }}</li>
                         <li>
                            <button class="v-button b-primary" v-if="_item.prodlineDevelopStatus === 'DEVELOPING'" @click="pauseInstall(_item.id)">暂停安装</button>
                            <button class="v-button b-primary" v-if="_item.prodlineDevelopStatus === 'DEVELOPPAUSE'" @click="continueInstall(_item.id)">继续安装</button>
                        </li>
                    </ul>
                    <!-- 生产状态 -->
                    <ul class="new_ul" v-for="_item in item.prodlineProduceDisplayVoList" v-show="false" :ref="'list_' + item.id">
                        <img src="@/assets/Game/5_ProduceManage/assembly.svg" class="tool" alt="">
                        <li>{{ _item.prodlineType }}</li>
                        <li v-if="_item.prodlineProduceStatus === 'TOPRODUCE'">待生产</li>
                        <li v-if="_item.prodlineProduceStatus === 'PRODUCING'">正在生产</li>
                        <li v-if="_item.prodlineProduceStatus === 'PRODUCEPAUSE'">暂停生产</li>
                        <li v-if="_item.prodlineProduceStatus === 'PRODUCED'">完成生产</li>
                        <li v-if="_item.prodlineProduceStatus === 'TRANSFERRING'">转产中</li>

                        <li v-if="_item.prodlineProduceStatus === 'TOPRODUCE'">可生产产品：{{ _item.productName }}</li>
                        <li v-if="_item.prodlineProduceStatus !== 'TOPRODUCE'">正在生产产品：{{ _item.productName }}</li>
                        
                        <li>已生产周期：{{ _item.producedPeriod }}</li>
                        <li>
                            <!-- NOT_USABLE 代表生产线不可用，禁止一切操作 -->
                            <button class="v-button b-primary" v-if="_item.prodlineProduceStatus === 'TOPRODUCE' && _item.prodlineProduceStatus !== 'NOT_USABLE'" @click="startProduce(_item.id)">开始生产</button>
                            <button class="v-button b-primary" v-if="_item.prodlineProduceStatus !== 'PRODUCING' && _item.prodlineProduceStatus !== 'NOT_USABLE'" @click="lineConversion(_item.id)">转产</button>
                            <button class="v-button b-primary" v-if="_item.prodlineProduceStatus !== 'PRODUCING' && _item.prodlineProduceStatus !== 'NOT_USABLE'" @click="sellLine(_item.id)">出售</button>
                            <button class="v-button b-primary" v-if="_item.prodlineProduceStatus === 'PRODUCING' && _item.prodlineProduceStatus !== 'NOT_USABLE'" @click="pauseProduce(_item.id)">暂停生产</button>
                            <button class="v-button b-primary" v-if="_item.prodlineProduceStatus === 'PRODUCEPAUSE' && _item.prodlineProduceStatus !== 'NOT_USABLE'" @click="continueProduce(_item.id)">继续生产</button>
                            <button class="v-button b-primary" v-if="_item.prodlineProduceStatus === 'PRODUCED' && _item.prodlineProduceStatus !== 'NOT_USABLE'" @click="productBack(_item.id)">收取产品</button>
                            
                            <!-- warn图标 -->
                            <p v-if="_item.prodlineProduceStatus === 'NOT_USABLE'">生产线不可用</p>
                        
                        </li>
                    </ul>
                </div>


                <!-- 修建中的厂房 -->
                <div class="table_factory" v-for="item in factoryInfo_Develop">
                    <div class="head" @click="showFactoryLine(item.id)">
                        <a class="profile"><img src="@/assets/Game/5_ProduceManage/build.svg" class="factory" alt=""></a>
                        <div class="titles">
                            <!-- <th>厂房编号</th> -->
                            <span>规模</span>
                            <span>类型</span>
                            <span>开工时间</span>
                            <span>总建造周期</span>
                            <span>状态</span>
                            <span>操作</span>   
                        </div>
                        <div class="info">
                            <!-- <span> - </span> -->
                            <span>{{ item.factoryType }}</span>
                            <span v-if="item.factoryHoldingStatus === 'HOLDING'">非租赁</span>
                            <span v-if="item.factoryHoldingStatus === 'LEASING'">租赁</span>
                            <span>{{ item.beginPeriod }}</span>
                            <span>{{ item.factoryMakePeriod }}</span>
                            <span v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === true">拥有中</span>
                            <span v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === false">已出售</span>

                            <span v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === true">租赁中</span>
                            <span v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === false">暂停租赁</span>
                            <span class="btns">
                                <div class="temp">
                                    <button class="v-button b-primary" @click="pauseBuild(item.id)" v-if="item.developStatus">暂停修建</button>
                                    <div class="cover"></div>
                                    <button class="v-button b-primary" @click="continueBuild(item.id)" v-if="!item.developStatus">继续修建</button>
                                </div>
                            </span>
                        </div>
                        <!-- <img src="@/assets/Game/5_ProduceManage/down.svg" class="down" alt=""> -->
                        <!-- <img src="@/assets/Game/5_ProduceManage/down.svg" class="down" alt=""> -->
                    </div>
                </div>
            </div>
        </div>

            <!-- 新建厂房 -->
            <div class="v-alert newFactory" v-if="float.newFactory">
                <div class="container">
                    <div class="title">
                        <h3>新建厂房</h3>
                    </div>
                    <div class="main">
                        <p><span>厂房类型：</span>
                            <select v-model="createFactoryNow" class="v-select">
                                <option v-for="item in factoryType" v-bind:value="item.id">
                                    {{ item.factoryType }}
                                </option> 
                            </select>
                        </p>
                        <p><span>修建工期：</span>{{ this.factoryType[newFactoryCheckNow].factoryMakeCost }}</p>
                        <p><span>可容纳生产线：</span>{{ this.factoryType[newFactoryCheckNow].factoryCapacity }}</p>
                        <p><span>每期修建费用：</span>{{ this.factoryType[newFactoryCheckNow].factoryMakeCost }}</p>
                        <p><span>每期维护费用：</span>{{ this.factoryType[newFactoryCheckNow].factoryMaintainCost }}</p>
                        <p><span>每期折旧费用：</span>{{ this.factoryType[newFactoryCheckNow].factoryDepreciation }}</p>
                        <div class="button">
                            <button class="v-button b-primary" @click="createFactory_confirm()">确认</button>
                            <button class="v-button b-primary" @click="exitCreateFactory()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 租用厂房 -->
            <div class="v-alert newFactory" v-if="float.newLendFactory">
                <div class="container">
                    <div class="title">
                        <h3>租用厂房</h3>
                    </div>
                    <div class="main">
                        <p><span>厂房类型：</span>
                            <select v-model="createFactoryNow">
                                <option v-for="item in factoryLeanInfo" v-bind:value="item.id">
                                    {{ item.factoryType }}
                                </option> 
                            </select>
                        </p>
                        <p><span>每期租金：</span>{{ this.factoryLeanInfo[leanFactoryCheckNow].factoryRentCost }}</p>
                        <div class="button">
                            <button class="v-button b-primary" @click="leanFactory_confirm()">确认</button>
                            <button class="v-button b-primary" @click="exitLeanFactory()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 新建生产线 -->
            <div class="v-alert newFactory newLine" v-if="float.newLine">
                <div class="container">
                    <div class="title">
                        <h3>新建生产线</h3>
                    </div>
                    <div class="main">
                        <p><span>生产线类型:</span><select v-model="lineNow" class="v-select">
                            <option v-for="item in newLineInfo.newLine" :value="item.id">{{ item.prodlineType }}</option>    
                        </select></p>
                        <p><span>产品类型：</span><select v-model="productNow" class="v-select">
                            <option v-for="item in newLineInfo.productType" :value="item.id">{{ item.productName }}</option>    
                        </select></p>
                        <template v-if="lineNow">
                            <p><span>安装周期：</span>{{ newLineInfo.newLine[lineNow].prodlineSetupPeriod }}</p>
                            <p><span>每周安装费用：</span>{{ newLineInfo.newLine[lineNow].prodlineSetupPeriodPrice }}</p>
                            <p><span>每周维修费用：</span>{{ newLineInfo.newLine[lineNow].prodlineMainCost }}</p>
                            <p><span>每周折旧费用：</span>{{ newLineInfo.newLine[lineNow].prodlineDepreciation }}</p>
                            <p><span>残值：</span>{{ newLineInfo.newLine[lineNow].prodlineStumpcost }}</p>
                        </template>
                        <div class="button">
                            <button class="v-button b-primary" @click="createNewLine_confirm()">确认</button><button class="v-button b-primary" @click="exitCreateNewLine()">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 厂房详情 -->
            <div class="v-alert newFactory" v-if="float.factoryDetail">
                <div class="container">
                    <div class="title">
                        <h3>厂房信息</h3>
                    </div>
                    <div class="main">
                        <p><span>厂房编号：</span>{{ factoryInfoNow.factoryNumber }}</p>
                        <p><span>规模：</span>{{ factoryInfoNow.factoryType }}</p>

                        <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING'"><span>类型：</span>非租赁</p>
                        <p v-if="factoryInfoNow.factoryHoldingStatus === 'LEASING'"><span>类型：</span>租赁</p>

                        <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING' && factoryInfoNow.developStatus === true"><span>状态：</span>拥有中</p>
                        <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING' && factoryInfoNow.developStatus === false"><span>状态：</span>已出售</p>

                        <p v-if="factoryInfoNow.factoryHoldingStatus === 'LEASING' && factoryInfoNow.developStatus === true"><span>状态：</span>租赁中</p>
                        <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING' && factoryInfoNow.developStatus === false"><span>状态：</span>暂停租赁</p>
                        
                        <p><span>可容纳生产线数：</span>{{ factoryInfoNow.factoryCapacity }}</p>
                        <p><span>每期折旧费用：</span>{{ factoryInfoNow.factoryDepreciation }}</p>
                        <div class="button">
                            <button class="v-button b-primary" @click="exitFactoryDetail()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import Qs from 'qs'
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {
                // 浮窗
                float: {
                    newLine: false,
                    newFactory: false,
                    newLendFactory: false,
                    factoryDetail: false,
                    factoryDetail_Develop: false,
                    turning: false
                },
                // 当前要创建的工厂ID
                createFactoryNow: null,
                // 已修建厂房类型
                factoryType: [],
                // 修建已完成厂房类型信息
                factoryType_develop: [],
                // 修建完成厂房信息
                factoryInfo: [],
                // 可租借厂房信息
                factoryLeanInfo: [],
                // 当前查看新建厂房
                newFactoryCheckNow: 0,
                // 当前查看租借厂房
                leanFactoryCheckNow: 0,
                // 修建中厂房信息
                factoryInfo_Develop: [],
                // 当前查看的厂房信息
                factoryInfoNow: [],
                // 可生产的生产线的
                newLineInfo: null,
                // 当前选择生产的生产线
                lineNow: null,
                // 当前选择产品的类型
                productNow: null,
                // 当前选择的工厂
                factoryNow: null,
                // 控制显示
                lines: true,
                // 可转产产品
                productAvailable: [],
                // 选中的转产产品
                turningProduct: null,
                // 选中的转产线
                turningLine: null
            }
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/factoryManage', 'produce', 'manage');
            }, 1);
            this.$store.commit('pageState', 'factoryManage');
            this.getProductAvailable();
            this.getFactoryType();
            this.getFactory();
            this.getFactoryType_lean();
        },
        watch: {
            createFactoryNow: function(val) {
                for (let i = 0; i < this.factoryType.length; i ++) {
                    if (this.factoryType[i].id === val) {
                        this.newFactoryCheckNow = i;
                        this.leanFactoryCheckNow = i;
                    }
                }
            }
        },
        methods: {
            // 新建厂房
            createFactory() {
                this.$store.commit('controlFloatWindow');
                this.float.newFactory = true;
            },
            // 关闭弹窗
            exitCreateFactory() {
                this.$store.commit('controlFloatWindow');
                this.float.newFactory = false;
            },
            // 确认新建厂房
            createFactory_confirm() {
                Axios.post(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop', Qs.stringify({
                    'enterpriseId': localStorage.getItem('enterpriseId'),
                    'factoryBasicId': this.createFactoryNow
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.exitCreateFactory();
                        this.$store.commit('controlAlert', [true, 'TRUE', '新建厂房成功', null, null, null]);
                        setTimeout(() => {
                            this.$store.commit('controlAlert', [false]);
                            this.getFactory();
                        }, 1500);
                    }
                })
            },

            // 租用厂房
            leanFactory() {
                this.$store.commit('controlFloatWindow');
                this.float.newLendFactory = true;
            },
            // 关闭弹窗
            exitLeanFactory() {
                this.$store.commit('controlFloatWindow');
                this.float.newLendFactory = false;
            },
            // 确认租用厂房
            leanFactory_confirm() {
                Axios.post(this.URL + '/game/compete/operation/produce/factorymanagement/factory/lease', Qs.stringify({
                    'enterpriseId': localStorage.getItem('enterpriseId'),
                    'factoryBasicId': this.createFactoryNow
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.exitLeanFactory();
                        this.$store.commit('controlAlert', [true, 'TRUE', '租用厂房成功', null, null, null]);
                        setTimeout(() => {
                            this.$store.commit('controlAlert', [false]);
                            this.getFactory();
                        }, 1500);
                    }
                })
            },

            // 出售厂房
            sellFactory(factoryId) {
                Axios.post(this.URL + '/game/compete/operation/produce/factorymanagement/factory/sell', Qs.stringify({
                    'factoryId': factoryId
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.$store.commit('controlAlert', [true, 'TRUE', '出售成功', null, null, null]);
                        setTimeout(() => {
                            this.$store.commit('controlAlert', [false]);
                            this.getFactory();
                        }, 1500);
                    } else {
                        alert(Response.data.msg);
                    }
                })

            },

            showFactoryLine(factoryId) {    
                for (let i = 0; i < this.$refs['list_' + factoryId].length; i ++) {
                    if (this.$refs['list_' + factoryId][i].style.display == 'none') {
                        this.$refs['list_' + factoryId][i].style.display = 'flex';
                    } else {
                        this.$refs['list_' + factoryId][i].style.display = 'none';
                    }
                }
            },
            // 暂停修建厂房
            pauseBuild(factoryDevelopId) {
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/pause?factoryDevelopId=' + factoryDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            // 继续修建厂房
            continueBuild(factoryDevelopId) {
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/developing?factoryDevelopId=' + factoryDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            // 新建生产线
            createNewLine(factoryId) {
                this.$store.commit('controlFloatWindow');
                this.float.newLine = true;
                this.factoryNow = factoryId;
                if (!this.newLineInfo) {
                    this.newLineInfo = {
                        newLine: [],
                        productType: []
                    }

                    Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/prodline/type?gameId=' +  localStorage.getItem('GAME'))
                        .then(Response => {
                            if (Response.data.code === 200) {
                                this.newLineInfo.newLine = Response.data.data;
                            } else {
                                alert('数据获取失败');
                            }
                        }).catch(e => {

                        })

                    Axios.get(this.URL + '/game/compete/operation/produce/productionplan/product/type?enterpriseId=' + localStorage.getItem('enterpriseId'))
                        .then(Response => {
                            if (Response.data.code === 200) {
                                this.newLineInfo.productType = Response.data.data;
                            } else {
                                alert('数据获取失败');
                            }
                        }).catch(e => {

                        })
                }
            },
            // 确认新建生产线
            createNewLine_confirm() {
                Axios.post(this.URL + '/game/compete/operation/produce/factorymanagement/prodline/develop', Qs.stringify({
                    'prodlineBasicId': this.lineNow,
                    'productId': this.productNow,
                    'factoryId': this.factoryNow,
                    'enterpriseId': localStorage.getItem('enterpriseId')
                })).then(Response => {
                    if (Response.data.code === 200) {
                        this.$store.commit('controlFloatWindow');
                        this.float.newLine = false;
                        this.$store.commit('controlAlert', [true, 'TRUE', Response.data.msg, null, null, null]);
                        setTimeout(() => {
                            this.$store.commit('controlAlert', [false]);
                            this.getFactory();
                        }, 1500);
                    } else {
                        alert('获取数据失败');
                    }
                })
            },
            // 获取所有可转产产品
            getProductAvailable() {
                Axios.get(this.URL + '/game/compete/operation/product/type?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.productAvailable = Response.data.data;
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            // 出售生产线
            sellLine(prodlineProductId) {
                Axios.post(this.URL + '/game/compete/operation/produce/factorymanagement/prodline/sell?prodlineProductId=' + prodlineProductId)
                    .then(Response => {
                        if (Response.data.code === 204) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {
                            alert('出售失败');
                        }
                    }).catch(e => {

                    })
            },
            // 关闭浮窗
            exitCreateNewLine() {
                this.$store.commit('controlFloatWindow');
                this.float.newLine = false;
            },
            // 暂停安装生产线
            pauseInstall(prodlineDevelopId) {
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/prodline/develop/pause?prodlineDevelopId=' + prodlineDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {

                        }
                    }).catch(e => {

                    })
            },
            // 继续安装生产线
            continueInstall(prodlineDevelopId) {
                (this.URL + '/game/compete/operation/produce/factorymanagement/prodline/develop/developing?prodlineDevelopId=' + prodlineDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {

                        }
                    }).catch(e => {

                    })
            },
            // 生产线开始生产产品
            startProduce(prodlineId) {
                Axios.put(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce?prodlineId=' + prodlineId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            // 生产线暂停生产产品
            pauseProduce(prodlineId) {
                Axios.put(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce/pause?prodlineId=' + prodlineId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            // 生产线继续生产产品
            continueProduce(prodlineId) {
                Axios.put(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce/producing?prodlineId=' + prodlineId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            // 收取产品
            productBack(id) {
                Axios.put(this.URL + '/game/compete/operation/produce/productionplan/prodline/produce/receive?prodlineId=' + id)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },
            lineConversion(id) {
                this.turningLine = id;
                this.float.turning = !this.float.turning;
                this.$store.commit('controlFloatWindow');
            },
            // 生产线转产
            lineConversion_confirm(prodlineId, productDevelopId) {
                console.log(prodlineId, productDevelopId)
                Axios.put(this.URL + '/game/compete/operation/produce/productionplan/prodline/transfer?prodlineId=' + prodlineId + '&productDevelopId=' + productDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.lineConversion();
                            this.getFactory();
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            },

            // 获取已修建厂房类型
            getFactoryType() {
                Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/type?gameId=' + localStorage.getItem('GAME'))
                    .then(Response => {
                        console.log(Response);
                        if (Response.data.code === 200) {
                            this.factoryType = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    }).catch(e => {

                    })
            },
            // 获取未修建厂房类型
            getFactoryType_develop() {
                Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/type?gameId=' + localStorage.getItem('GAME'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.factoryType_develop = Response.data.data;
                        } else {
                            alert('数据获取失败');
                        }
                    }).catch(e => {

                    })
            },
            // 获取能租赁厂房类型
            getFactoryType_lean() {
                Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/lease/type?gameId=' + localStorage.getItem('GAME'))
                    .then(Response => {
                        this.factoryLeanInfo = Response.data.data;
                    })
            },

            // 根据厂房类型获取厂房信息
            getFactory() {
                this.factoryInfo = [];
                this.factoryInfo_Develop = [];
                Axios.get(this.URL + '/game/compete/operation/produce/productionplan/factory/display/all?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            for (let i = 0; i < Response.data.data.length; i ++) {
                                this.factoryInfo.push(Response.data.data[i]);
                            }
                        } else {
                            alert('数据获取失败');
                        }
                    }).then(() => {
                        Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/all/?enterpriseId=' + localStorage.getItem('enterpriseId'))
                            .then(Response => {
                                if (Response.data.code === 200) {
                                    for (let i = 0; i < Response.data.data.length; i ++) {
                                        Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/detail?factoryDevelopId=' + Response.data.data[i].id)
                                            .then(Response => {
                                                if (Response.data.code === 200) {
                                                    this.factoryInfo_Develop.push(Response.data.data);
                                                }
                                            }).catch(e => {

                                            })
                                    }
                                }
                            })
                    })
            },

            // 获取某个已修建工厂的详细信息
            getFactoryDetail(id) {
                this.$store.commit('controlFloatWindow');
                for(let i = 0; i < this.factoryInfo.length; i ++) {
                    if (this.factoryInfo[i].id === id) {
                        this.float.factoryDetail = true;
                        this.factoryInfoNow = this.factoryInfo[i];
                        return;
                    }
                }
                for (let i = 0; i < this.factoryInfo_Develop.length; i ++) {
                    if (this.factoryInfo_Develop[i].id === id) {
                        this.float.factoryDetail_Develop = true;
                        this.factoryInfoNow = this.factoryInfo[i];
                        return;
                    }
                }
            },
            // 关闭弹窗
            exitFactoryDetail() {
                this.$store.commit('controlFloatWindow');
                this.float.factoryDetail = false;
                this.float.factoryDetail_Develop = false;
            },

            // 暂停工厂建造
            pause_develop(factoryDevelopId) {
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/pause?factoryDevelopId=' + factoryDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            for (let i = 0; i < this.factoryInfo_Develop.length; i ++) {
                                if (this.factoryInfo_Develop[i].id === factoryDevelopId) {
                                    this.factoryInfo_Develop[i].developStatus = !this.factoryInfo_Develop[i].developStatus;
                                }
                            }
                            this.getFactory();
                        } else {
                            alert('暂停失败，请重试')
                        }
                    }).catch(e => {

                    })
            },
            // 继续工厂建造
            _continue_develop(factoryDevelopId) {
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/developing?factoryDevelopId=' + factoryDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            for (let i = 0; i < this.factoryInfo_Develop.length; i ++) {
                                if (this.factoryInfo_Develop[i].id === factoryDevelopId) {
                                    this.factoryInfo_Develop[i].developStatus = !this.factoryInfo_Develop[i].developStatus;
                                }
                            }
                            this.getFactory();
                        } else {
                            alert('暂停失败，请重试')
                        }
                    }).catch(e => {

                    })
            },

            // 暂停工厂租赁
            pause_lean(factoryId) {
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/factory/lease/pause?factoryId=' + factoryId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            for (let i = 0; i < this.factoryInfo.length; i ++) {
                                if (this.factoryInfo[i].id === factoryId) {
                                    this.factoryInfo[i].developStatus = !this.factoryInfo[i].developStatus;
                                }
                            }
                            this.getFactory();
                        } else {
                            alert('暂停失败，请重试')
                        }
                    }).catch(e => {

                    })
            },
            // 继续工厂租赁
            _continue_lean(factoryId) {
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/factory/lease/leasing?factoryId=' + factoryId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            for (let i = 0; i < this.factoryInfo.length; i ++) {
                                if (this.factoryInfo[i].id === factoryId) {
                                    this.factoryInfo[i].developStatus = !this.factoryInfo[i].developStatus;
                                }
                            }
                            this.getFactory();
                        } else {
                            alert('继续失败，请重试')
                        }
                    }).catch(e => {

                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #factoryManage {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                display: flex;
                flex-direction: column;
                margin: 0 50px 0 50px;
                padding-top: 20px;
                padding-bottom: 50px;
                .search {
                    position: relative;
                    height: 40px;
                    line-height: 30px;
                    .icon {
                        cursor: pointer;
                        position: absolute;
                        width: 120px;
                        top: 0;
                        border-radius: 5px;
                        height: 40px;
                        line-height: 40px;
                        padding-left: 40px;
                        font-size: 14px;
                        color: #fff;
                        right: 0px;
                        background-color: #1296db;
                        img {
                            width: 20px;
                            left: 5px;
                            top: 10px;
                            position: absolute;
                        }
                        &:nth-of-type(1) {
                            right: 150px;
                        }
                    }
                    span {
                        font-size: 18px;
                    }
                    select {
                        position: absolute;
                        top: -1px;
                        left: 150px;
                        font-size: 12px;
                        padding-left: 5px;
                        width: 240px;   
                        height: 35px;
                    }
                }
                .table_factory {
                    margin-top: 40px;
                    .head {
                        position: relative;
                        padding: 15px 120px 0 180px;
                        height: 100px;
                        // line-height: 35px;
                        background-color: #eee;
                        box-shadow: 0px 0px 5px 2px #aaa;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 14px;
                        &:hover {
                            background-color: #ddd;
                        }
                        .titles {
                            display: flex;
                            justify-content: space-between;
                            text-align: center;
                            font-size: 16px;
                        }
                        .info {
                            display: flex;
                            justify-content: space-between;
                            text-align: center;
                            font-size: 14px;
                            padding-top: 35px;
                            color: #666;
                            button {
                                position: absolute;
                                bottom: -10px;
                                left: 15px;
                            }
                            .add {
                                position: absolute;
                                width: 15px;
                                right: 5px;
                            }
                        }
                        .down {
                            position: absolute;
                            right: 0;
                            top: 30px;
                            right: 20px;
                            width: 50px;
                        }
                        .profile {
                            position: absolute;
                            border-radius: 50%;
                            width: 80px;
                            height: 80px;
                            top: 10px;
                            left: 40px;
                            // border: 1px solid #aaa;
                            .factory {
                                width: 70px;
                            }
                        }
                        span {
                            position: relative;
                            display: block;
                            width: 100px;
                            // font-size: 16px;
                            text-align: center;
                            // font-weight: bold;
                        }
                    }
                    .new_ul {
                        position: relative;
                        display: flex;
                        margin: 0 40px;
                        padding: 15px 60px 0 140px;
                        height: 60px;
                        line-height: 60px;
                        border-bottom: 1px dotted #aaa;
                        justify-content: space-between;
                        .tool {
                            position: absolute;
                            width: 50px;
                            top: 20px;
                            left: 0;
                        }
                        li {
                            width: 80px;
                            &:nth-last-of-type(1) {
                                width: 190px;
                            }
                            &:nth-last-of-type(2) {
                                width: 120px;
                            }
                            &:nth-last-of-type(3) {
                                width: 140px;
                            }
                        }
                    }
                }
                .v-table_border {
                    display: none;
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
        .newFactory {
            .title {
                padding-top: 20px;
            }
            .main {
                padding-top: 20px;
                font-size: 14px;
                line-height: 45px;
                display: flex;
                flex-direction: column;
                p {
                    display: flex;
                    span {
                        width: 120px;
                        display: block;
                        text-align: right;
                        margin-right: 10px;
                    }
                    select {
                        margin-top: 13px;
                        height: 25px;
                    }
                    
                }
            }
        }
        .newLine {
            .v-select {
                width: 80px;
            }
        }
    }
</style>
