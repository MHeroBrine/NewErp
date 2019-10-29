<template>
    <div class="card_group">
        <div class="area_1">
            <div class="leader"></div>
            <div class="info">
                <h3>{{ data.enterpriseName }}</h3>
                <p>组长：{{ data.ceoName }}</p>
                <p class="create" v-if="data.enterpriseStatusEnum == 'CREATE'">准备中</p>
                <p class="sure" v-if="data.enterpriseStatusEnum == 'SURE'">准备完毕</p>
            </div>
            <div class="btns">
                <button v-if="!(isAdmin || isMember)" @click="join()" v-show="!noEdit">加入小组</button>
                <button v-if="(!isAdmin && isMember)" @click="exit()" v-show="!noEdit">退出</button>
                <button v-if="isAdmin" @click="del()" v-show="noEdit">删除</button>
                <button v-if="isAdmin && data.enterpriseStatusEnum == 'CREATE'" @click="getReady()" v-show="!noEdit">确认准备</button>
                <button v-if="isAdmin && data.enterpriseStatusEnum == 'PLAYING'" @click="addMember()" v-show="noEdit">添加成员</button>
            </div>
        </div>
        <div class="area_2">
            <ul>
                <li v-for="item in memberList" class="item">
                    <div class="profile">

                    </div>
                    <p>{{ item.studentName }}</p>
                    <img src="@/assets/Nav/GameControl/false.svg" v-if="isAdmin && userId != item.userStudentId" @click="deleteMember(item.userStudentId)">
                    <img src="@/assets/Nav/GameControl/false.svg" v-if="isAdmin && userId == item.userStudentId" @click="deleteMember(item.userStudentId)">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import Qs from 'qs'
    import VueEvent from '../../model/VueEvent.js'
    import Ws from '../../ERP/Functions/Ws'

    export default {
        data() {
            return {
                isAdmin: false,
                isMember: false,
                isNotMember: false,

                isJoin: false,
                isExit: false,
                noEdit: false,

                memberList: [],
                data_delete: [
                    {
                        title: '请输入密码',
                        value: ''
                    }
                ],
            }
        },
        beforeMount() {
            this.permission();
            this.editCheck();
        },
        methods: {
            join() {
                this.$store.commit('controlAlert', [true, 'WARN', '是否加入该企业', null, null, () => {
                    Axios.post(this.URL + '/game/manage/enterprise/member/join', {
                        "enterpriseId": this.data.id,
                        "gameId": localStorage.getItem('GAME'),
                        "userId": this.$store.state.user.id
                    }).then((Response) => {
                        if (Response.data.code === 200) {
                            console.log(Response);
                            this.$store.commit('controlAlert', [true, 'TRUE' ,'加入成功', null, null, null]);
                            localStorage.setItem('GAME_watching', localStorage.getItem('GAME'));
                            localStorage.setItem('GAME_cache', this.$store.state.user.id);
                            localStorage.setItem('enterpriseId', Response.data.data);
                            Ws.initSocket(localStorage.getItem('GAME_watching'));
                            Ws.openSocket();
                            Ws.message();
                            VueEvent.$emit('setReadyState');
                            VueEvent.$emit('refreshGroupList');
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '加入失败', null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        }
                    })
                }])
            },
            exit() {
                this.$store.commit('controlAlert', [true, 'WARN', '是否退出该企业', null, null, () => {
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
                            this.$store.commit('controlAlert', [true, 'TRUE', '退出成功', null, null, null]);
                            setTimeout(() => {
                                this.$store.commit('controlAlert', [false]);                                
                                localStorage.clear();
                                VueEvent.$emit('refreshGroupList');
                                this.$router.push('/joinGame');
                            }, 1500);
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', Response.data.msg, null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        }
                    })
                }])
            },
            del() {
                this.$store.commit('controlAlert', [true, 'WARN_DELETE', '是否删除该小组', null, this.data_delete, () => {
                    Axios.delete(this.URL + '/game/manage/enterprise/delete', {
                        params: {
                            "enterpriseId": this.data.id,
                            "userId": this.$store.state.user.id,
                            "password": this.data_delete[0].value
                        },
                        paramsSerializer: params => {
                            return Qs.stringify(params, { indices: false })
                        }
                    }).then((Response) => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, 'TRUE', '删除成功', null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '删除失败', null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        }
                    })
                }])
            },
            // 删除成员
            deleteMember(id) {
                this.$store.commit('controlAlert', [true, 'WARN', '是否删除该成员', null, null, () => {
                    Axios.delete(this.URL + '/game/manage/enterprise/member/out', {
                        params: {
                            "userId": id,
                            "enterpriseId": this.data.id,
                            "password": this.data_delete.value
                        },
                        paramsSerializer: params => {
                            return Qs.stringify(params, { indices: false })
                        }
                    }).then((Response) => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, 'TRUE', '删除成功', null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', Response.data.msg, null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        }
                    })
                }])
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
                            this.memberList = Response.data.data;
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
                    this.userId = this.$store.state.user.id;
                }
                this.getMemberList();
            },
            // 修改比赛准备状态
            getReady() {
                let i = confirm('是否确认准备完成');
                if (i === true) {
                    Axios.post(this.URL + '/game/manage/enterprise/sure', Qs.stringify({
                        'enterpriseId': this.data.id,
                        'userId': this.$store.state.user.id
                    })).then((Response) => {
                        if (Response.data.code === 204) { 
                            // localStorage.setItem('GROUP_watching', this.data.id);                           
                            this.$store.commit('controlAlert', [true, 'TRUE', '准备成功', null, null, null]);
                            setTimeout(() => {
                                this.$store.commit('controlAlert', [false]);
                                this.data.enterpriseStatusEnum = 'SURE';
                                localStorage.setItem('GAME_watching', localStorage.getItem('GAME'));
                                localStorage.setItem('GAME_cache', this.$store.state.user.id);
                                VueEvent.$emit('setReadyState');
                            }, 1500);
                        } else {
                            val = false;
                        }
                    })
                }
            },
            // 不可编辑
            editCheck() {
                let that = this;
                VueEvent.$on('noEdit', function(val) {
                    that.noEdit = val;
                    console.log(that.noEdit);
                })
            },
            // 组长添加成员
            addMember() {
                this.$store.commit('controlAlert', [true, 'WARN', '添加一个', null, null, () => {
                    Axios.post(this.URL + '/game/manage/enterprise/member/join', {
                        "enterpriseId": this.data.id,
                        "gameId": localStorage.getItem('GAME'),
                        "userId": this.$store.state.user.id
                    }).then((Response) => {
                        if (Response.data.code === 200) {
                            this.$store.commit('controlAlert', [true, 'TRUE' ,'加入成功', null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '加入失败', null, null, null]);
                            VueEvent.$emit('refreshGroupList');
                        }
                    })
                }])
            }
        },
        props: ['data']
    }
</script>

<style lang="scss" scoped>
    .card_group {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 25%;
        margin: 30px 40px 40px 40px;
        // margin-right: 100px;
        box-shadow: 0px 0px 10px 2px rgb(223, 220, 236);
        // border: 1px solid #000;
        .area_1 {
            position: relative;
            width: 55%;
            padding-bottom: 30%;
            border-right: 1px solid #eee;
            margin: 5%;
            line-height: 150%;
            transition: all 0.5s;
            .leader {
                width: 2.2vw;
                height: 2.2vw;
                border: 2px solid #eee;
                border-radius: 50%;
            }
            .info {
                position: absolute;
                width: 70%;
                color: rgb(153, 153, 153);
                top: 0px;
                left: 23%;
                h3 {
                    color: rgb(95, 95, 95);
                    font-size: 0.8vw;
                }
                p {
                    font-size: 0.2vw;
                }
                .create {
                    position: absolute;
                    color: rgb(255, 102, 102);
                    top: -2px;
                    right: 0;
                }
                .sure {
                    position: absolute;
                    top: -2px;
                    right: 0;
                    color: rgb(88, 200, 88);
                }
            }
            .btns {
                width: 100%;
                button {
                    cursor: pointer;
                    border: 1px solid rgb(187, 187, 187);
                    background-color: #fff;
                    width: 35%;
                    padding: 3% 0 3% 0;
                    border-radius: 5px;
                    font-size: 0.2vw;
                    color: rgb(117, 117, 117);
                    outline: none;
                    transition: all 0.2s;
                    &:hover {
                        color: #fff;
                        background-color: rgb(117, 117, 117);
                    }
                }
                bottom: 5px;
                position: absolute;
            }
        }
        .area_2 {
            flex: 1;
            margin-top: 20px;
            // height: 185px;
            overflow-y: scroll;
            ul {
                .item {
                    position: relative;
                    display: flex;
                    font-size: 0.2vw;
                    width: 95%;
                    height: 10%;
                    line-height: 220%;
                    // border-bottom: 1px dotted #000;
                    color: rgb(153, 153, 153);
                    .profile {
                        width: 1.5vw;
                        height: 1.5vw;
                        border-radius: 50%;
                        border: 2px solid #eee;
                        margin-right: 6%;
                    }
                    margin-bottom: 3%;
                    img {
                        cursor: pointer;
                        position: absolute;
                        width: 15%;
                        right: 0;
                        // right: 20px;
                        top: 3px;
                    }
                }
            }
        }
        /* 设置滚动条的样式 */
        .area_2::-webkit-scrollbar {
            width: 6px;
        }
        /* 滚动槽 */
        .area_2::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
        }
        
        /* 滚动条滑块 */
        .area_2::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgba(0,0,0,0.1);
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        }
    }
</style>
