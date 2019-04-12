<template>
    <div class="card_group">
        <div class="fl area_1"> 
            <img src="../../assets/logo.png" alt="">
        </div>
        <div class="fr area_2">
            <div class="ready">
                <input type="checkbox" v-if="isAdmin" v-model="readyValue" :disabled="readyValue"><label>{{ groupState }}</label>
            </div>
            <span>比赛名称：{{ data.enterpriseName }}</span>
            <span>成员数量：{{ data.enterpriseMemberNumber }}</span>
        </div>
        <div class="area_3">
            <div v-if="isAdmin">
                <v-button1 value="成员管理" type="primary" width="120px" height="1px" @click.native="watchMember()"></v-button1>
                <v-button1 value="删除" type="primary" width="80px" height="1px" @click.native="del()"></v-button1>
            </div>
            <div v-if="isMember">
                <v-button1 value="成员信息" type="primary" width="120px" height="1px" @click.native="watchMember()"></v-button1>
                <v-button1 value="退出" type="primary" width="80px" height="1px" @click.native="exit()"></v-button1>
            </div>
            <div v-if="isNotMember">
                <v-button1 value="成员信息" type="primary" width="120px" height="1px" @click.native="watchMember()"></v-button1>
                <v-button1 value="加入" type="primary" width="80px" height="1px" @click.native="join()"></v-button1>
            </div>

            <div class="join" v-if="isJoin">
                <div class="context mg">
                    <span>加入***企业？</span>
                    <div></div>
                    <v-button1 value="确定" type="primary"></v-button1>
                    <v-button1 value="取消" type="primary" @click.native="join()"></v-button1>
                </div>
            </div>

            <div class="exit" v-if="isExit">
                <div class="context mg">
                    <span>退出***企业？</span>
                    <div></div>
                    <v-button1 value="确定" type="primary" @click.native="exitAlert()"></v-button1>
                    <v-button1 value="取消" type="primary" @click.native="exit()"></v-button1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import Qs from 'qs'
    import VueEvent from '../../model/VueEvent.js'

    export default {
        data() {
            return {
                isAdmin: false,
                isMember: false,
                isNotMember: false,

                isJoin: false,
                isExit: false,

                groupState: null,
                readyValue: null
            }
        },
        beforeMount() {
            this.permission();
        },
        watch: {
            'readyValue': function(val) {
                this.getReady(val);
            }
        },
        methods: {
            join() {
                this.$store.commit('controlAlert', [true, '是否加入该企业', null, null, () => {
                    Axios.post(this.URL + '/game/manage/enterprise/member/join', {
                        "enterpriseId": this.data.id,
                        "gameId": localStorage.getItem('GAME'),
                        "userId": this.$store.state.user.id
                    }).then((Response) => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, '加入成功', null, null, null]);
                        } else {
                            this.$store.commit('controlAlert', [true, Response.data.msg, null, null, null]);
                        }
                    })
                }])
            },
            exit() {
                this.$store.commit('controlAlert', [true, '是否退出该企业', null, null, () => {
                    Axios.delete(this.URL + '/game/manage/enterprise/member/out', {
                        params: {
                            "userId": this.$store.state.user.id,
                            "enterpriseId": this.data.id
                        },
                        paramsSerializer: params => {
                            return Qs.stringify(params, { indices: false })
                        }
                    }).then((Response) => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, '退出成功', null, null, null]);
                        } else {
                            this.$store.commit('controlAlert', [true, Response.data.msg, null, null, null]);
                        }
                    })
                }])
            },
            del() {
                let password = prompt("请输入你的账户密码");
                Axios.delete(this.URL + '/game/manage/enterprise/delete', {
                    params: {
                        "enterpriseId": this.data.id,
                        "userId": this.$store.state.user.id,
                        "password": password
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, { indices: false })
                    }
                }).then((Response) => {
                    // console.log(Response);
                    if (Response.data.code === 204) {
                        alert('删除企业成功');
                        VueEvent.$emit('refreshGroupList');
                    } else {
                        alert(Response.data.msg);
                    }
                })
            },
            exitAlert() {
                alert('退出成功');
                this.exit();
            },
            linkTo(address) {
                this.$router.push(address);
            },
            // 成员管理 / 查看页面
            watchMember() {
                this.$store.commit('setGroupWatching', [this.data.id, this.data.ceoId]);
                this.$router.push('/memberList');
            },

            // 获取成员信息，判定身份
            getMemberList() {
                Axios.get(this.URL + '/game/manage/enterprise/member/enterpriseMemberInfos/get?enterpriseId=' + this.data.id)
                    .then((Response) => {
                        if (Response.data.code === 200) {
                            let data = Response.data.data;
                            if (this.isAdmin === true) {
                                return;
                            }
                            if (!(this.data.ceoId === this.$store.state.user.id)) {
                                for (let item in data) {
                                    if (data[item].studentAccount === this.$store.state.user.studentAccount) {
                                        this.isMember = true;
                                        return;
                                    }
                                }
                                this.isNotMember = true;
                            }
                        }
                    })
            },
            // 从CEO位置获取判定身份
            permission() {
                if (this.data.ceoId == this.$store.state.user.id) {
                    this.isAdmin = true;
                }
                this.getMemberList();

                if (this.data.enterpriseStatus === 'CREATE') {
                    this.groupState = '正在准备';
                } else if (this.data.enterpriseStatus === 'SURE') {
                    this.readyValue = true;
                    this.groupState = '准备完成';
                }
            },
            // 修改比赛准备状态
            getReady(val) {
                // console.log(this.data);
                if (val === true) {
                    Axios.post(this.URL + '/game/manage/enterprise/sure', Qs.stringify({
                        'enterpriseId': this.data.id,
                        'userId': this.$store.state.user.id
                    })).then((Response) => {
                        if (Response.data.code === 204) {
                            alert('准备成功');
                            this.groupState = '准备完成';
                        } else {
                            val = false;
                        }
                    })
                }
            }
        },
        props: ['data']
    }
</script>

<style lang="scss" scoped>
    .card_group {
        position: relative;
        display: inline-block;
        width: 350px;
        height: 250px;
        margin: 20px;
        .area_1 {
            height: 200px;
            text-align: center;
            border: 1px solid #000;
            border-right: 0;
            width: 125px;
            line-height: 200px;
            img {
                width: 60px;
            }
        }
        .area_2 {
            height: 200px;
            text-align: center;
            border: 1px solid #000;
            width: 225px;
            padding-top: 40px;
            span {
                display: block;
                margin: 15px;
            }
            .ready {
                font-size: 13px;
                color: #666;
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        .area_3 {
            clear: both;
            width: 400px;
            height: 50px;
            .join {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 100;
                .context {
                    width: 450px;
                    height: 200px;
                    background-color: #fff;
                    border-radius: 20px;
                    margin-top: 400px;
                    text-align: center;
                    padding-top: 50px;
                    .button_1 {
                        margin-top: 30px;
                    }
                }       
            }
            .exit {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 100;
                .context {
                    width: 450px;
                    height: 200px;
                    background-color: #fff;
                    border-radius: 20px;
                    margin-top: 400px;
                    text-align: center;
                    padding-top: 50px;
                    .button_1 {
                        margin-top: 30px;
                    }
                }       
            }
        }
    }
</style>
