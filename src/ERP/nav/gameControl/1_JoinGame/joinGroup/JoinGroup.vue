<template>
    <div id="joinGroup">
        <div class="container_default">
            <div class="title">
                <h3>加入企业</h3>
                <button class="v-button b-primary begin" @click="begin()">开始比赛</button>
            </div>
            <div class="main">
                <v-pagination-group></v-pagination-group>
                <img src="@/assets/Nav/GameControl/back_round.svg" class="back" @click="linkTo('/nav')">
                <img src="@/assets/Nav/GameControl/add.svg" class="add" @click="createGroup()">
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" @click="freshList()">
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import vueEvent from '../../../../../model/VueEvent';
    import Ws from '../../../../Functions/Ws'

    export default {
        data() {
            return {
                data: [
                    {
                        title: '企业名称',
                        value: ''
                    },
                    {
                        title: '最大成员个数',
                        value: ''
                    }
                ]
            }
        },
        mounted() {
            this.memberTest();
            this.$store.commit('pageState', 'gameControl_joinGame_joinGroup');
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
                        if (Response.data.code === 200) {
                            this.$store.commit('controlAlert', [true, 'TRUE' ,'新建企业成功', null, null, null]);
                            localStorage.setItem('GAME_watching', localStorage.getItem('GAME'));
                            localStorage.setItem('GAME_cache', this.$store.state.user.id);
                            Ws.initSocket(localStorage.getItem('GAME_watching'));
                            Ws.openSocket();
                            Ws.message();
                            vueEvent.$emit('setReadyState');
                            this.freshList();
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '新建失败，您可能已经加入了一个小组', null, null, null]);
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
                                            alert('重连成功');
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
                        "pageSize": 1
                    }).then(Response => {
                        if (Response.data.code === 200) {
                            alert('你已处于准备中，不可退出');
                            return;
                        } else {
                            history.back();
                        }
                    })
                } else {
                    history.back();
                }
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
            .begin {
                position: absolute;
                top: 10px;
                width: 100px;
                right: 10px;
            }
            .main {
                padding-top: 20px;
                img {
                    cursor: pointer;
                    width: 30px;
                }
                .back {
                    width: 34px;
                    position: absolute;
                    bottom: 28px;
                    right: 130px;
                }
                .add {
                    position: absolute;
                    bottom: 30px;
                    right: 80px;
                }
                .refresh {
                    position: absolute;
                    bottom: 30px;
                    right: 30px;
                }
            }
        }
    }
</style>
