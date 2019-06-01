<template>
    <div id="factoryManage">
        <div class="nav">
            <a href=""></a>
            <h3>厂房管理</h3>
        </div>
        <div class="container mg">
            <div class="search">
                <span>类型：</span>
                <select v-model="factoryTypeNow">
                    <option v-for="item in factoryType" v-bind:value="item.id">
                        {{ item.factoryType }}
                    </option>
                </select>
                <button class="v-button b-primary">查询</button>
            </div>
            <div class="main mg">
                <div class="sold fr">
                    <a @click="createFactory()">新建厂房</a>
                    <a @click="leanFactory()">租用厂房</a>
                </div>

                <div class="title mg" v-for="item in factoryInfo">
                    <div class="main">
                        <ul>
                            <li>厂房编号</li>
                            <li>规模</li>
                            <li>类型</li>
                            <li>生产线数量</li>
                            <li>状态</li>
                        </ul>
                        <ul>
                            <li>{{ item.factoryNumber }}</li>
                            <li>{{ item.factoryType }}</li>

                            <li v-if="item.factoryHoldingStatus === 'HOLDING'">非租赁</li>
                            <li v-if="item.factoryHoldingStatus === 'LEASING'">租赁</li>
                            
                            <li>{{ item.factoryCapacity }}<img src="../../../assets/icon/plus.svg" alt="" @click="createNewLine(item.id)"></li>
                        
                            <li v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === true">拥有中</li>
                            <li v-if="item.factoryHoldingStatus === 'HOLDING' && item.developStatus === false">已出售</li>

                            <li v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === true">租赁中</li>
                            <li v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === false">暂停租赁</li>
                        </ul>
                    </div>
                    <div class="btns">
                        <button class="v-button b-primary" @click="getFactoryDetail(item.id)">详情</button>
                        <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'HOLDING'" @click="sellFactory(item.id)">出售</button>
                        <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === true" @click="pause_lean(item.id)">暂停</button>
                        <button class="v-button b-primary" v-if="item.factoryHoldingStatus === 'LEASING' && item.developStatus === false" @click="_continue_lean(item.id)">继续</button>
                        <a @click="showFactoryLine(item.id)">↓</a>
                    </div>
                    <div class="line" v-show="lines">
                        <!-- 修建状态 -->
                        <ul v-for="_item in item.prodlineDevelopDisplayVoList">
                            <li>{{ _item.prodlineType }}</li>
                            <li v-if="_item.prodlineDevelopStatus === 'DEVELOPING'">正在生产</li>
                            <li v-if="_item.prodlineDevelopStatus === 'DEVELOPPAUSE'">暂停生产</li>
                            <li v-if="_item.prodlineDevelopStatus === 'DEVELOPED'">完成生产</li>
                            <li>正在生产产品：{{ _item.productName }}</li>
                            <li>
                                <button class="v-button b-primary" v-if="_item.prodlineDevelopStatus === 'DEVELOPING'" @click="pauseInstall(_item.id)">暂停</button>
                                <button class="v-button b-primary" v-if="_item.prodlineDevelopStatus === 'DEVELOPPAUSE'" @click="continueInstall(_item.id)">继续</button>
                            </li>
                        </ul>
                        <!-- 生产状态 -->
                        <ul v-for="_item in item.prodlineProduceDisplayVoList">
                            <li>{{ _item.prodlineType }}</li>
                            <li v-if="_item.prodlineProduceStatus === 'TOPRODUCE'">待生产</li>
                            <li v-if="_item.prodlineProduceStatus === 'DEVELOPING'">正在生产</li>
                            <li v-if="_item.prodlineProduceStatus === 'DEVELOPPAUSE'">暂停生产</li>
                            <li v-if="_item.prodlineProduceStatus === 'DEVELOPED'">完成生产</li>
                            <li v-if="_item.prodlineProduceStatus === 'TRANSFERRING'">运输中</li>
                            <li>已生产周期：{{ _item.producedPeriod }}</li>
                            <li>正在生产产品：{{ _item.productName }}</li>
                            <li>
                                <button class="v-button b-primary">转产</button>
                                <button class="v-button b-primary" @click="sellLine(_item.id)">出售</button>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="title mg" v-for="item in factoryInfo_Develop">
                    <div>
                        <ul class="develop">    
                            <li>规模</li>
                            <li></li>
                            <li>类型</li>
                            <li></li>
                            <li>状态</li>
                        </ul>
                        <ul class="develop">
                            <li>{{ item.factoryType }}</li>
                            <li></li>

                            <li v-if="item.factoryHoldingStatus === 'HOLDING'">非租赁</li>
                            <li v-if="item.factoryHoldingStatus === 'LEASING'">租赁</li>
                            
                            <li></li>

                            <li v-if="item.developStatus == true">建造中</li>
                            <li v-if="item.developStatus == false">暂停建造</li>
                        </ul>
                    </div>
                    <div>
                        <button class="v-button b-primary" @click="getFactoryDetail(item.id)">详情</button>
                        
                        <button class="v-button b-primary" v-if="item.developStatus == true" @click="pause_develop(item.id)">暂停</button>
                        <button class="v-button b-primary" v-if="item.developStatus == false" @click="_continue_develop(item.id)">继续</button>
                    </div>
                </div>

                <!-- 新建生产线 -->
                <div class="v-alert newLine" v-if="float.newLine">
                    <div class="pre_container">
                        <div class="pre_title">
                            <h3>新建生产线</h3>
                        </div>
                        <div class="main">
                            <p>生产线类型:<select v-model="lineNow">
                                <option v-for="item in newLineInfo.newLine" :value="item.id">{{ item.prodlineType }}</option>    
                            </select></p>
                            <p>产品类型：<select v-model="productNow">
                                <option v-for="item in newLineInfo.productType" :value="item.id">{{ item.productName }}</option>    
                            </select></p>
                            <template v-if="lineNow">
                                <p>安装周期：{{ newLineInfo.newLine[lineNow].prodlineSetupPeriod }}</p>
                                <p>每周安装费用：{{ newLineInfo.newLine[lineNow].prodlineSetupPeriodPrice }}</p>
                                <p>每周维修费用：{{ newLineInfo.newLine[lineNow].prodlineMainCost }}</p>
                                <p>每周折旧费用：{{ newLineInfo.newLine[lineNow].prodlineDepreciation }}</p>
                                <p>残值：{{ newLineInfo.newLine[lineNow].prodlineStumpcost }}</p>
                            </template>
                            <button class="v-button b-primary" @click="createNewLine_confirm()">确认</button><button class="v-button b-primary" @click="exitCreateNewLine()">取消</button>
                        </div>
                    </div>
                </div>

                <!-- 新建厂房 -->
                <div class="v-alert newFactory" v-if="float.newFactory">
                    <div class="pre_container">
                        <div class="pre_title">
                            <h3>新建厂房</h3>
                        </div>
                        <div class="main">
                            <p>厂房类型：
                                <select v-model="createFactoryNow">
                                    <option v-for="item in factoryType" v-bind:value="item.id">
                                        {{ item.factoryType }}
                                    </option> 
                                </select>
                            </p>
                            <p>修建工期：<span>文本标签</span></p>
                            <p>完工时间：<span>文本标签</span></p>
                            <p>每期修建费用：<span>文本标签</span></p>
                            <p>每期折旧费用：<span>文本标签</span></p>
                            <button class="v-button b-primary" @click="createFactory_confirm()">确认</button>
                            <button class="v-button b-primary" @click="exitCreateFactory()">取消</button>
                        </div>
                    </div>
                </div>

                <!-- 租用厂房 -->
                <div class="v-alert newFactory" v-if="float.newLendFactory">
                    <div class="pre_container">
                        <div class="pre_title">
                            <h3>租用厂房</h3>
                        </div>
                        <div class="main">
                            <p>厂房类型：
                                <select v-model="createFactoryNow">
                                    <option v-for="item in factoryType" v-bind:value="item.id">
                                        {{ item.factoryType }}
                                    </option> 
                                </select>
                            </p>
                            <p>每期租金：<span>文本标签</span></p>
                            <p>注：一年起租，租满一年的厂房在满年（如第一年的第一期租用，到第二年第二期为满年）进行退租处理。未处理，默认在满年续租。</p>
                            <button class="v-button b-primary" @click="leanFactory_confirm()">确认</button>
                            <button class="v-button b-primary" @click="exitLeanFactory()">取消</button>
                        </div>
                    </div>
                </div>

                <!-- 厂房详情 -->
                <div class="v-alert factoryDetail" v-if="float.factoryDetail">
                    <div class="pre_container">
                        <div class="pre_title">
                            <h3>厂房信息</h3>
                        </div>
                        <div class="main">
                            <p>厂房编号：{{ factoryInfoNow.factoryNumber }}</p>
                            <p>规模：{{ factoryInfoNow.factoryType }}</p>

                            <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING'">类型：非租赁</p>
                            <p v-if="factoryInfoNow.factoryHoldingStatus === 'LEASING'">类型：租赁</p>

                            <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING' && factoryInfoNow.developStatus === true">状态：拥有中</p>
                            <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING' && factoryInfoNow.developStatus === false">状态：已出售</p>

                            <p v-if="factoryInfoNow.factoryHoldingStatus === 'LEASING' && factoryInfoNow.developStatus === true">状态：租赁中</p>
                            <p v-if="factoryInfoNow.factoryHoldingStatus === 'HOLDING' && factoryInfoNow.developStatus === false">状态：暂停租赁</p>
                            
                            <p>可容纳生产线数：{{ factoryInfoNow.factoryCapacity }}</p>
                            <p>每期折旧费用：{{ factoryInfoNow.factoryDepreciation }}</p>
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

                    Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/prodline/all/type/get')
                        .then(Response => {
                            if (Response.data.code === 200) {
                                this.newLineInfo.newLine = Response.data.data;
                            } else {
                                alert('数据获取失败');
                            }
                        }).catch(e => {

                        })

                    Axios.get(this.URL + '/game/compete/operation/produce/productionplan/product/type/get?enterpriseId=' + localStorage.getItem('enterpriseId'))
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
                            this.getFactory();
                        } else {

                        }
                    }).catch(e => {

                    })
            },

            // 获取已修建厂房类型
            getFactoryType() {
                Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/type/all/get')
                    .then(Response => {
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
                Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/type/all/get')
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
                Axios.get(this.URL + '/game/compete/operation/produce/productionplan/factory/display/all/get?enterpriseId=' + localStorage.getItem('enterpriseId'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            for (let i = 0; i < Response.data.data.length; i ++) {
                                this.factoryInfo.push(Response.data.data[i]);
                            }
                        } else {
                            alert('数据获取失败');
                        }
                    }).then(() => {
                        Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/all/get?enterpriseId=' + localStorage.getItem('enterpriseId'))
                            .then(Response => {
                                if (Response.data.code === 200) {
                                    for (let i = 0; i < Response.data.data.length; i ++) {
                                        Axios.get(this.URL + '/game/compete/operation/produce/factorymanagement/factory/develop/detail/get?factoryDevelopId=' + Response.data.data[i].id)
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
            width: 1100px;
            min-height: 750px;
            padding-bottom: 30px;
            background-color: #fff;
            border: 1px solid #000;
            .search {
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #000;
                padding-left: 20px;
            }
            .main {
                width: 1050px;
                .sold {
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
                .title {
                    margin-top: 20px;
                    display: flex;
                    clear: both;
                    width: 1000px;
                    border: 1px solid #000;
                    flex-wrap: wrap;
                    flex-direction: row;
                    .main {
                        background-color: #eee;
                    }
                    .btns {
                        background-color: #eee;
                    }
                    div {
                        &:nth-of-type(1) {
                            flex: 3;
                        }
                        &:nth-of-type(2) {
                            flex: 1;
                            line-height: 100px;
                        }
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
                                img {
                                    cursor: pointer;
                                    position: absolute;
                                    width: 20px;
                                }
                            }
                        }
                    }
                    .line {
                        width: 100%;
                        ul {
                            width: 100%;
                            border-bottom: 3px solid #eee;
                            &:nth-of-type(2) {
                                margin-top: 0px;
                                color: #000;
                            }
                            li {
                                margin-top: 20px;
                            }
                        }
                    }
                }
                .newLine {
                    .pre_container {
                        width: 800px;
                        height: auto;
                        padding-bottom: 30px;
                    }
                    .main {
                        width: 800px;
                        text-align: center;
                        p {
                            line-height: 50px;
                        }
                        select, input {
                            width: 250px;
                        }
                    }
                }
                .newFactory {
                    .pre_container {
                        width: 800px;
                        height: auto;
                        padding-bottom: 30px;
                    }
                    .main {
                        width: 800px;
                        text-align: center;
                        p {
                            line-height: 50px;
                        }
                        select, input {
                            width: 250px;
                        }
                    }
                }
                .newLendFactory {
                    .pre_container {
                        width: 800px;
                    }
                    .main {
                        width: 800px;
                        text-align: center;
                        p {
                            line-height: 30px;
                        }
                        button {
                            width: 120px;
                        }
                    }
                }
                .factoryDetail {
                    .pre_container {
                        width: 800px;
                    }
                    .main {
                        text-align: center;
                        width: 800px;
                        line-height: 30px;
                    }
                }
            }
        }
    }
</style>
