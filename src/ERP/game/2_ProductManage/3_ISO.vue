<template>
    <div id="ISO">
        <div class="nav">
            <a href=""></a>
            <h3>ISO认证</h3>
        </div>
        <div class="ISO_list mg">
            <ul class="mg">
                <li v-for="item in ISOdata">
                    <span>{{ item.isoName }}</span>
                    <a v-if="item.isoStatus == 'DEVELOPED'" style="backgroundColor: #eee">维护中</a>
                    <a v-if="item.isoStatus == 'TODEVELOP'">未开拓</a>
                    <a v-if="item.isoStatus == 'DEVELOPING'" class="active">开拓中</a>
                    <a v-if="item.isoStatus == 'DEVELOPPAUSE'" class="active">开拓中</a>
                </li>
            </ul>
        </div>
        <div class="form mg">
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
                        未开拓
                    </td>
                    <td v-if="item.isoStatus == 'DEVELOPING'">
                        开拓中
                    </td>
                    <td v-if="item.isoStatus == 'DEVELOPPAUSE'">
                        开拓中
                    </td>
                    <td>
                        <button class="v-button b-primary" v-if="item.isoStatus == 'TODEVELOP'" @click="start(item.id)">开拓市场</button>
                        <button class="v-button b-primary" v-if="item.isoStatus == 'DEVELOPING'" @click="pause(item.id)">暂停开拓</button>
                        <button class="v-button b-primary" v-if="item.isoStatus == 'DEVELOPPAUSE'" @click="develop(item.id)">继续开拓</button>
                        <button class="v-button b-info b-disabled" v-if="item.isoStatus == 'DEVELOPED'">已研发</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // ISO认证信息
                ISOdata: []
            }
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'ISO')
            this.getISOInfo(localStorage.getItem('enterpriseId'));
        },
        methods: {
            // 获取某个企业的全部ISO认证信息
            getISOInfo(enterpriseId) {
                Axios.get(this.URL + '/game/compete/operation/iso/iso/infos/get?enterpriseId=' + enterpriseId)
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
                Axios.put(this.URL + '/game/compete/operation/iso/iso/infos/update/start?isoDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getISOInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('开拓市场失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            },
            // 暂停开拓
            pause(id) {
                Axios.put(this.URL + '/game/compete/operation/iso/iso/infos/update/pause?isoDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getISOInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('暂停开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            },
            // 继续开拓
            develop(id) {
                Axios.put(this.URL + '/game/compete/operation/iso/iso/infos/update/develop?isoDevelopId=' + id)
                    .then(Response => {
                        if (Response.data.code == 200) {
                            this.getISOInfo(localStorage.getItem('enterpriseId'));
                        } else {
                            alert('继续开拓失败，请稍后重试');
                        }
                    }).catch(e => {

                    }) 
            }
        }
    }
</script>

<style lang="scss" scoped>
    #ISO {
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
        .ISO_list {
            margin-top: 50px;
            width: 1100px;
            height: 350px;
            background-color: #fff;
            border: 1px solid #000;
            ul {
                width: 1000px;
                margin-top: 80px;
                display: flex;
                flex-wrap: wrap;
                li {
                    margin-right: 60px;
                    background-color: #eee;
                    position: relative;
                    width: 200px;
                    height: 150px;
                    border: 1px solid #000;
                    span {
                        position: absolute;
                        display: block;
                        font-size: 20px;
                        width: 200px;
                        text-align: center;
                        top: 170px;
                    }
                    a {
                        position: absolute;
                        right: -50px;
                        top: -50px;
                        display: block;
                        width: 100px;
                        height: 100px;
                        line-height: 100px;
                        text-align: center;
                        border-radius: 50%;
                        border: 1px solid #000;
                        background-color: #fff;
                    }
                    .active {
                        background-color: aqua;
                    }
                }
            }
        }
        .form {
            margin-top: 50px;
            width: 1100px;
            height: 350px;
            background-color: #fff;
            border: 1px solid #000;
            table {
                margin-top: 20px;
                width: 1000px;
            }
        }
    }
</style>
