<template>
    <div id="factoryManage">
        <div class="container_default">
            <div class="title">
                <h3>厂房管理</h3>
            </div>
            <div class="main">
                <div class="search">
                    <!-- <span>厂房列表</span> -->
                    <div class="icon" @click="createFactory()">
                        <p>新建厂房</p>
                        <img src="@/assets/Game/5_ProduceManage/add.svg">
                    </div>
                    <div class="icon" @click="leanFactory()">
                        <p>租借厂房</p>
                        <img src="@/assets/Game/5_ProduceManage/loan.svg">
                    </div>
                    <!-- <select class="v-select">
                        <option value="1">请选择分类</option>
                    </select> -->
                </div>
                <table class="v-table_border">
                    <tr>
                        <th>厂房编号</th>
                        <th>规模</th>
                        <th>类型</th>
                        <th>生产线数量</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <template v-for="item in factoryInfo">
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
                                <li v-if="_item.prodlineDevelopStatus === 'DEVELOPING'">正在生产</li>
                                <li v-if="_item.prodlineDevelopStatus === 'DEVELOPPAUSE'">暂停生产</li>
                                <li v-if="_item.prodlineDevelopStatus === 'DEVELOPED'">完成生产</li>
                                <li>正在生产产品：{{ _item.productName }}</li>
                                <li>已生产周期：{{ _item.developedPeriod }}</li>
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
                                <li v-if="_item.prodlineProduceStatus === 'TOPRODUCE'">待生产</li>
                                <li v-if="_item.prodlineProduceStatus === 'DEVELOPING'">正在生产</li>
                                <li v-if="_item.prodlineProduceStatus === 'DEVELOPPAUSE'">暂停生产</li>
                                <li v-if="_item.prodlineProduceStatus === 'DEVELOPED'">完成生产</li>
                                <li v-if="_item.prodlineProduceStatus === 'TRANSFERRING'">运输中</li>
                                <!-- <li>已生产周期：{{ _item.producedPeriod }}</li> -->
                                <li>可生产产品：{{ _item.productName }}</li>
                                <li>
                                    <button class="v-button b-primary">转产</button>
                                    <button class="v-button b-primary" @click="sellLine(item.id)">出售</button>
                                </li>
                            </div>
                        </ul>
                    </template>
                </table>
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
                        <p><span>修建工期：</span>文本</p>
                        <p><span>完工时间：</span>文本</p>
                        <p><span>每期修建费用：</span>文本</p>
                        <p><span>每期折旧费用：</span>文本</p>
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
                                <option v-for="item in factoryType" v-bind:value="item.id">
                                    {{ item.factoryType }}
                                </option> 
                            </select>
                        </p>
                        <p><span>每期租金：</span>文本标签</p>
                        <p><span>注：</span>一年起租，租满一年的厂房在满年（如第一年的第一期租用，到第二年第二期为满年）进行退租处理。未处理，默认在满年续租。</p>
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
                    factoryDetail_Develop: false
                },
                // 当前要创建的工厂ID
                createFactoryNow: null,
                // 已修建厂房类型
                factoryType: [],
                // 修建已完成厂房类型信息
                factoryType_develop: [],
                // 修建完成厂房信息
                factoryInfo: [],
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
                lines: true
            }
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/factoryManage', 'produce', 'manage');
            }, 1);
            this.$store.commit('pageState', 'factoryManage');
            this.getFactoryType();
            this.getFactory();
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
                        alert('新建厂房成功');
                        this.exitCreateFactory();
                        this.getFactory();
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
                        alert('租用厂房成功');
                        this.exitLeanFactory();
                        this.getFactory();
                    }
                })
            },

            // 出售厂房
            sellFactory(factoryId) {
                Axios.post(this.URL + '/game/compete/operation/produce/factorymanagement/factory/sell', Qs.stringify({
                    'factoryId': factoryId
                })).then(Response => {
                    if (Response.data.code === 200) {
                        alert('出售成功')
                    } else {
                        alert(Response.data.msg);
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
                        alert(Response.data.msg);
                        this.$store.commit('controlFloatWindow');
                        this.float.newLine = false;
                    } else {
                        alert('获取数据失败');
                    }
                })
            },
            // 出售生产线
            sellLine(prodlineProductId) {
                Axios.post(this.URL + '/game/compete/operation/produce/factorymanagement/prodline/sell?prodlineProductId=' + prodlineProductId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            
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
                Axios.put(this.URL + '/game/compete/operation/produce/factorymanagement/prodline/develop/developing?prodlineDevelopId=' + prodlineDevelopId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            alert(Response.data.msg);
                            this.getFactory();
                        } else {

                        }
                    }).catch(e => {

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
            .newFactory {
                .main {
                    font-size: 14px;
                    line-height: 45px;
                    display: flex;
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
        }
        .newLine {
            .v-select {
                width: 80px;
            }
        }
    }
</style>
