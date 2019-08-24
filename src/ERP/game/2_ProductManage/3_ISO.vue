<template>
    <div id="ISO">
        <div class="container_default">
            <div class="title">
                <h3>ISO认证</h3>
            </div>
            <div class="main mg">
                <div class="intro">
                    <div class="inside">
                        <div class="cover" v-for="item in ISOdata">
                            <img src="@/assets/Nav/GameControl/image.svg" alt="">
                            <span>{{ item.isoName }}</span>
                            <div class="state DEVELOPED" v-if="item.isoStatus == 'DEVELOPED'">
                                <p>维护中</p>
                            </div>
                            <div class="state TODEVELOP" v-if="item.isoStatus == 'TODEVELOP'">
                                <p>未研究</p>
                            </div>
                            <div class="state DEVELOPING" v-if="item.isoStatus == 'DEVELOPING'">
                                <p>研究中</p>
                            </div>
                            <div class="state DEVELOPPAUSE" v-if="item.isoStatus == 'DEVELOPPAUSE'">
                                <p>暂停研究</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table">
                    <table class="v-table mg">
                        <tr>
                            <th>ISO认证名称</th>
                            <th>研发总期数</th>
                            <th>每期研发费用(万元)</th>
                            <th>每期维护费用(万元)</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="item in ISOdata">
                            <td>{{ item.isoName }}</td>
                            <td>{{ item.isoResearchPeriod }}</td>
                            <td>{{ item.isoResearchCost }}</td>
                            <td>{{ item.isoMaintainCost }}</td>
                            <td v-if="item.isoStatus == 'DEVELOPED'">
                                维护中
                            </td>
                            <td v-if="item.isoStatus == 'TODEVELOP'">
                                未认证
                            </td>
                            <td v-if="item.isoStatus == 'DEVELOPING'">
                                认证中
                            </td>
                            <td v-if="item.isoStatus == 'DEVELOPPAUSE'">
                                暂停认证
                            </td>
                            <td>
                                <button class="v-button b-primary" v-if="item.isoStatus == 'TODEVELOP'" @click="start(item.id)">开始认证</button>
                                <button class="v-button b-primary" v-if="item.isoStatus == 'DEVELOPING'" @click="pause(item.id)">暂停认证</button>
                                <button class="v-button b-primary" v-if="item.isoStatus == 'DEVELOPPAUSE'" @click="develop(item.id)">继续认证</button>
                                <button class="v-button b-info b-disabled" v-if="item.isoStatus == 'DEVELOPED'">已认证</button>
                            </td>
                        </tr>
                    </table>
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
                // ISO认证信息
                ISOdata: []
            }
        },
        mounted() {
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/ISO', 'productManage', 'ISO');
            }, 1);
            // 设置页面格式
            this.$store.commit('pageState', 'ISO')
            this.getISOInfo(localStorage.getItem('enterpriseId'));
        },
        methods: {
            // 获取某个企业的全部ISO认证信息
            getISOInfo(enterpriseId) {
                Axios.get(this.URL + '/game/compete/operation/iso?enterpriseId=' + enterpriseId)
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.ISOdata = Response.data.data;
                        } else {
                            alert('信息获取失败')
                        }
                    }).catch(e => {
                        
                    })
            },

            // 认证部分
            // 开始开拓
            start(id) {
                let i = confirm('开始研究该认证？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/iso/start?isoDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getISOInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('开拓市场失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            },
            // 暂停开拓
            pause(id) {
                let i = confirm('暂停研究该认证？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/iso/pause?isoDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getISOInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('暂停开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            },
            // 继续开拓
            develop(id) {
                let i = confirm('继续研究该认证？');
                if (i) {
                    Axios.put(this.URL + '/game/compete/operation/iso/develop?isoDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            alert(Response.data.msg);
                            this.getISOInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('继续开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #ISO {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                padding: 0 20px 0 20px;
                max-width: 1400px;
                display: flex;
                flex-direction: column;
                .intro {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    box-sizing: content-box;
                    padding-top: 4%;
                    padding-bottom: 4%;
                    border-bottom: 1px dotted #aaa;
                    .inside {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        .cover {
                            // cursor: pointer;
                            margin: 20px;
                            position: relative;
                            border-radius: 10px;
                            width: 13%;
                            padding-bottom: 13%;
                            background-color: rgb(160, 198, 207);
                            img {
                                position: absolute;
                                width: 60%;
                                top: 20%;
                                left: 20%;
                            }
                            span {
                                position: absolute;
                                text-align: center;
                                width: 100%;
                                font-size: 14px;
                                bottom: -40px;
                                a {
                                    font-size: 14px;
                                    color: #fff;
                                    border-radius: 5px;
                                    background-color: rgb(114, 216, 114);
                                    padding: 5px;
                                }
                            }
                            .state {
                                position: absolute;
                                right: -20%;
                                top: -20%;
                                color: #fff;
                                font-size: 18px;
                                text-align: center;
                                border-radius: 50%;
                                width: 10vh;
                                height: 10vh;
                                line-height: 10vh; 
                                font-size: 14px;
                                background-color: rgb(127, 193, 209);
                            }
                            .TODEVELOP {
                                    border-radius: 50%;
                                    background-color: #aaa;
                                }
                                .DEVELOPING {
                                    border-radius: 50%;
                                    background-color: #F8D347;
                                }
                                .DEVELOPPAUSE {
                                    border-radius: 50%;
                                    background-color: #aaa;
                                }
                                .DEVELOPED {
                                    border-radius: 50%;
                                    background-color: rgb(90, 196, 223);
                                }
                            .active {
                                border-radius: 50%;
                                background-color: rgb(46, 189, 221);
                            }
                        }
                    }
                }
                .table {
                    width: 100%;
                    height: 350px;
                    margin-top: 10px;
                    padding: 20px 50px 20px 50px;
                    button {
                        width: 80px;
                    }
                }
            }
        }
    }
</style>
