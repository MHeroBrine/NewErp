<template>
    <div class="card">
        <div class="fl area_1">
            <img src="../../assets/logo.png" alt="">
        </div>
        <div class="fr area_2">
            <span>比赛名称：{{ data.gameName }}</span>
            <span>企业数量：{{ data.enterpriseNumber }}</span>
        </div>
        <div class="area_3">

            <div v-if="createGame">
                <v-button1 value="进入比赛" type="primary" width="120px" height="1px" @click.native="createGame_enterGame()"></v-button1>
                <v-button1 value="开始" type="primary" width="80px" height="1px" @click.native="createGame_begin()"></v-button1>
                <v-button1 value="删除" type="primary" width="80px" height="1px" @click.native="createGame_delete()"></v-button1>
            </div>

            <div v-if="joinGame">
                <v-button1 value="比赛信息" type="primary" width="155px" height="1px" @click.native="gameInfo()"></v-button1>
                <v-button1 value="加入比赛" type="primary" width="155px" height="1px" @click.native="joinGame_joinGame()"></v-button1>
            </div>

            <div v-if="continueGame">
                <v-button1 value="比赛信息" type="primary" width="80px" height="1px" @click.native="gameInfo()"></v-button1>
                <v-button1 value="成员管理" type="primary" width="80px" height="1px" @click.native="linkTo('/memberList')"></v-button1>
                <v-button1 value="继续" type="primary" width="80px" height="1px"></v-button1>
            </div>

            <div v-if="checkGame">
                <v-button1 value="比赛信息" type="primary" width="80px" height="1px" @click.native="gameInfo()"></v-button1>
                <v-button1 value="成员管理" type="primary" width="80px" height="1px" @click.native="linkTo('/memberList')"></v-button1>
                <v-button1 value="历史数据" type="primary" width="80px" height="1px" @click.native="checkGame_history()"></v-button1>
            </div>
        </div>

        <!-- <div v-if="createGame_isBegin" class="alert">
            <div class="contents mg">
                <span>开始***比赛？</span>
                <div></div>
                <v-button1 value="确认" type="primary" @click.native="createGame_begin_confirm()"></v-button1>
                <v-button1 value="取消" type="primary" @click.native="createGame_begin()"></v-button1>
            </div>
        </div> -->
        <div v-if="createGame_isDelete" class="alert">
            <div class="contents mg">
                <span>删除***比赛？</span>
                <div></div>
                <v-button1 value="确认" type="primary" @click.native="createGame_delete_confirm()"></v-button1>
                <v-button1 value="取消" type="primary" @click.native="createGame_delete()"></v-button1>
            </div>
        </div>

        <div v-if="isGameInfo" class="GameInfo">
            <div class="contents mg">
                <div class="title">比赛信息</div>
                <div class="info">
                    <span>比赛名称：{{ data.gameName }}</span>
                    <span>企业数量：{{ data.enterpriseNumber }}</span>
                    <span>创建人：{{ data.creatorName }}</span>
                    <span>持续年数：{{ data.totalYear }}</span>
                    <span>创建时间：{{ data.gameCreateTime }}</span>
                    <v-button1 value="返回" type="primary" width="200px" @click.native="gameInfo()"></v-button1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueEvent from '../../model/VueEvent.js'
    import Axios from 'axios'
    import Qs from 'qs'

    export default {
        data() {
            return {
                data: {
                    id: null,
                    gameName: null,
                    creatorName: null,
                    totalYear: null,
                    period: null,
                    gameStatus: null,
                    gameCreateGame: null,
                    enterpriseNumber: null
                },

                isGameInfo: false,

                createGame: false,
                    createGame_isBegin: false,
                    createGame_isDelete: false,

                joinGame: false,
                    // joinGame_isGameInfo: false,

                continueGame: false,
                    // continueGame_isGameInfo: false,
                
                checkGame: false,
                    // checkGame_isGameInfo: false,
            }
        },
        mounted() {
            this.reset();
            switch (this.type) {
                case 'createGame':
                    this.createGame = true;
                    break;
                case 'joinGame':
                    this.joinGame = true;
                    break;
                case 'continueGame':
                    this.continueGame = true;
                    break;
                case 'checkGame':
                    this.checkGame = true;
                    break;
            }
        },
        methods: {
            reset() {
                this.createGame = false;
                this.joinGame = false;
                this.continueGame = false;
                this.checkGame = false;
            },
            linkTo(address) {
                this.$router.push(address);
            },

            createGame_enterGame() {
                this.$store.commit('setGameWatching', this.data.id);
                this.$router.push('/joinGame/joinGroup');
            },
            createGame_begin() {
                this.$store.commit('controlAlert', [true, '是否开始 ' + this.data.gameName, null, null, () => {
                    Axios.post(this.URL + '/game/manage/begin', Qs.stringify({
                        "gameId": this.data.id,
                        "userId": this.$store.state.user.id
                    })).then((Response) => {
                        console.log(Response);
                        if (Response.data.code === 200) {
                            this.$store.commit('controlAlert', [true, '比赛初始化成功', null, null, null]);
                        } else {
                            this.$store.commit('controlAlert', [true, Response.data.msg, null, null, null]);
                        }
                    })
                }]);
            },
            createGame_begin_confirm() {
                let data = {
                    "gameId": this.data.id,
                    "userId": this.$store.state.user.id
                }
                Axios.post(this.URL + '/game/manage/begin', Qs.stringify(data))
                    .then((Response) => {
                        console.log(Response);
                    })
            },
            createGame_delete() {
                this.$store.commit('controlFloatWindow');
                this.createGame_isDelete = !this.createGame_isDelete
            },
            createGame_delete_confirm() {
                let data = {
                    "gameId": this.data.id,
                    "userId": this.$store.state.user.id
                }
                Axios.delete(this.URL + '/game/manage/delete', {
                    params: {
                        "gameId": this.data.id,
                        "userId": this.$store.state.user.id
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, { indices: false })
                    }
                }).then((Response) => {
                    if (Response.data.code === 200) {
                        alert('删除比赛成功');
                        VueEvent.$emit('refreshList');
                        this.createGame_delete();
                    } else {
                        alert('删除失败，请稍后重试');
                    }
                })
            },


            gameInfo() {
                let time = new Date(this.data.gameCreateTime);
                this.data.gameCreateTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                this.$store.commit('controlFloatWindow');
                this.isGameInfo = !this.isGameInfo;
            },

            joinGame_joinGame() {
                this.$router.push('/joinGame/joinGroup');
                this.$store.commit('setGameWatching', this.data.id);
            },

            continueGame_gameInfo() {
                this.$store.commit('controlFloatWindow');
                this.continueGame_isGameInfo = !this.continueGame_isGameInfo;
            },

            checkGame_gameInfo() {
                this.$store.commit('controlFloatWindow');
                this.checkGame_isGameInfo = !this.checkGame_isGameInfo;
            },
            checkGame_history() {
                
            }
        },
        props: ['title', 'number', 'type', 'data']
    }
</script>

<style lang="scss" scoped>
    .card {
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
        }
        .area_3 {
            width: 400px;
            height: 50px;
        }

        .alert {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            .contents {
                width: 450px;
                height: 200px;
                background-color: #fff;
                border-radius: 20px;
                margin-top: 400px;
                text-align: center;
                padding-top: 50px;
            }
        }

        .GameInfo {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            .contents {
                width: 800px;
                height: 400px;
                background-color: #fff;
                border-radius: 20px;
                margin-top: 250px;
                .title {
                    width: 100%;
                    height: 70px;
                    line-height: 70px;
                    border-bottom: 1px solid #000;
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                }
                .info {
                    width: 100%;
                    height: 330px;
                    // text-align: center;
                    padding-top: 30px;
                    padding-left: 300px;
                    span {
                        display: block;
                        line-height: 40px;
                    }
                }
                
            }
        }
    }
</style>
