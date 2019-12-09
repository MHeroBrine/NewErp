<template>
    <div id="joinGroup">
        <div class="container_default">
            <div class="title">
                <h3>加入企业</h3>
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" title="刷新" @click="freshList()">
                <img src="@/assets/Nav/GameControl/back_round.svg" class="back" title="返回导航" @click="linkTo('/nav')">
                <!-- <img src="@/assets/Nav/GameControl/add.svg" class="add" title="创建企业" @click="createGroup()"> -->
                <button class="v-button b-primary delete" @click="deleteGame()" v-if="isAdmin">删除比赛</button>
                <button class="v-button b-primary begin" @click="begin()" v-if="isAdmin">开始比赛</button>
            </div>
            <div class="main">
                <v-pagination-group :createMethod="createGroup"></v-pagination-group>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import vueEvent from '../../../../../model/VueEvent';
    import Ws from '../../../../Functions/Ws'
    import Qs from 'qs'

    export default {
        data() {
            return {
                // 检测是否为组长
                isAdmin: false,
                data: [
                    {
                        title: '企业名称',
                        value: ''
                    },
                    {
                        title: '最大成员个数',
                        value: ''
                    }
                ],
                data_delete: [
                    {
                        title: '请输入密码',
                        value: ''
                    }
                ]   
            }
        },
        beforeMount() {
            let that = this;
            vueEvent.$on('ceoTrue', function() {
                that.isAdmin = true;
            })
        },
        mounted() {
            this.memberTest();
            this.$store.commit('pageState', 'gameControl_joinGame_joinGroup');
            this.checkIdentity();
        },
        methods: {
            createGroup() {
                this.$store.commit('controlAlert', [true, 'WARN', '新建企业', null, this.data, () => {
                    Axios.post(this.URL + '/game/manage/enterprise/create', {
                        "creatorId": this.$store.state.user.id,
                        "enterpriseName": this.data[0].value,
                        "gameId": localStorage.getItem('GAME'),
                        "maxMemberNumber": this.data[1].value
                    }).then((Response) => {
                        if (typeof +this.data[1].value !== 'number') {
                            alert('请检查输入是否正确');
                            return;
                        }
                        if (Response.data.code === 200) {
                            console.log(Response);
                            this.$store.commit('controlAlert', [true, 'TRUE' ,'新建企业成功', null, null, null]);
                            localStorage.setItem('GAME_watching', localStorage.getItem('GAME'));
                            localStorage.setItem('GAME_cache', this.$store.state.user.id);
                            localStorage.setItem('enterpriseId', Response.data.data.id);
                            Ws.initSocket(localStorage.getItem('GAME_watching'));
                            Ws.openSocket();
                            Ws.message();
                            vueEvent.$emit('setReadyState');
                            this.freshList();
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', Response.data.msg, null, null, null]);
                            this.freshList();
                        }
                    })
                }])
            },
            // 开始比赛
            begin() {
                let i = confirm('是否开始比赛');
                if (i) {
                    Axios.post(this.URL + '/game/manage/begin?gameId=' + localStorage.getItem('GAME_watching') + '&userId=' + this.$store.state.user.id)
                        .then(Response => {
                            if (Response.data.code === 204) {
                                alert(Response.data.msg);
                            } else {
                                alert(Response.data.msg);
                            }
                        })
                }
            },
            deleteGame() {
                this.$store.commit('controlAlert', [true, 'WARN_DELETE', '确认删除比赛该比赛吗', null, this.data_delete, () => {
                    Axios.delete(this.URL + '/game/manage/delete', {
                        params: {
                            "gameId": localStorage.getItem('GAME'),
                            "userId": this.$store.state.user.id,
                            "password": this.data_delete[0].value
                        },
                        paramsSerializer: params => {
                            return Qs.stringify(params, { indices: false })
                        }
                    }).then((Response) => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, 'TRUE', '删除比赛成功', null, null, null]);
                            setTimeout(() => {
                                vueEvent.$emit('refreshList');
                                localStorage.clear();
                                this.$router.push('/createGame');
                            }, 1500);
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '删除失败', null, null, null]);
                            setTimeout(() => {
                                vueEvent.$emit('refreshList');
                            }, 1500);
                        }
                    })
                }]);  
            },
            // 检测用户是否为该企业成员
            memberTest() {
                if (localStorage.getItem('GAME_watching')) {
                    return;
                }
                // 先派出已开始的比赛
                Axios.post(this.URL + '/game/manage/search', {
                    "concurrentPage": 1,
                    "gameId": localStorage.getItem('GAME'),
                    "pageSize": 1
                }).then(Response => {
                    if (Response.data.code === 200) {
                        if (Response.data.data.pageData.gameStatusEnum === 'PLAYING' || Response.data.data.pageData.gameStatusEnum === 'OVER') {
                            // 不计入
                            return;
                        } else {
                            Axios.get(this.URL + '/game/manage/judge?gameId=' + localStorage.getItem('GAME') + '&userId=' + this.$store.state.user.id)
                                .then(Response => {
                                    if (Response.data.code === 200) {
                                        if (Response.data.data === true) {
                                            localStorage.setItem('GAME_watching', localStorage.getItem('GAME'));
                                            localStorage.setItem('GAME_cache', this.$store.state.user.id);
                                            Ws.initSocket(localStorage.getItem('GAME_watching'));
                                            Ws.openSocket();
                                            Ws.message();
                                            vueEvent.$emit('setReadyState');
                                            this.$store.commit('controlAlert', [true, 'TRUE', '重连成功', null, null, null]);
                                            setTimeout(() => {
                                                this.$store.commit('controlAlert', [false]);
                                            }, 1500);
                                        }
                                    }
                                })
                        }
                    }
                })
            },
            freshList() {
                vueEvent.$emit('refreshGroupList');
            },
            linkTo(address) {
                if (localStorage.getItem('GAME_watching')) {
                    Axios.post(this.URL + '/game/manage/search', {
                        "concurrentPage": 1,
                        "gameId": localStorage.getItem('GAME_watching'),
                        "gameStatusEnum": "CREATE",
                        "studentId": this.$store.state.user.id, 
                        "pageSize": 1
                    }).then(Response => {
                        if (Response.data.code === 200 && Response.data.pageData) {
                            alert('你已处于准备中，不可退出');
                            return;
                        } else {
                            history.back();
                        }
                    })
                } else {
                    history.back();
                }
            },
            checkIdentity() {
                Axios.post(this.URL + '/game/manage/search', {
                    "concurrentPage": 1,
                    "gameId": localStorage.getItem('GAME'),
                    "pageSize": 1,
                    "studentId": this.$store.state.user.id
                }).then(Response => {
                    if (Response.data.code === 200) {
                        if (Response.data.data.pageData[0].creatorId === this.$store.state.user.id) {
                            this.isAdmin = true;
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #joinGroup {
        position: relative;
        width: 100%;
        .container_default {
            height: 95%;
            .title {
                img {
                    position: absolute;
                    width: 30px;
                    top: 15px;
                    cursor: pointer;
                    &:nth-of-type(1) {
                        left: 120px;
                    }
                    &:nth-of-type(2) {
                        left: 160px;
                    }
                }
            }
            .begin {
                position: absolute;
                top: 10px;
                width: 100px;
                right: 10px;
            }
            .delete {
                position: absolute;
                top: 10px;
                width: 100px;
                right: 120px;
                padding: 10px;
            }
            .main {
                padding-top: 20px;
                img {
                    cursor: pointer;
                    width: 45px;
                }
                .back {
                    width: 50px;
                    position: absolute;
                    bottom: 27px;
                    right: 170px;
                }
                .add {
                    position: absolute;
                    bottom: 30px;
                    right: 100px;
                }
                .refresh {
                    position: absolute;
                    bottom: 30px;
                    right: 30px
                }
            }
        }
    }
</style>
