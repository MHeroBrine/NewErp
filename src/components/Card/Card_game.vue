<template>
    <div class="card">
        <div class="area_1" @mouseenter="cover = !cover" @mouseleave="cover = !cover">
            <img src="@/assets/Nav/GameControl/image.svg">
        </div>
        <div class="area_2" v-bind:class="{ blur: cover }" v-if="createGame">
            <h4>{{ data.gameName }}</h4>
            <img src="@/assets/Nav/GameControl/enter.svg" alt="进入比赛" class="enter" title="进入比赛" @click="createGame_enterGame()">
            <img src="@/assets/Nav/GameControl/begin.svg" alt="开始比赛" class="begin" title="开始比赛" @click="createGame_begin()">
            <img src="@/assets/Nav/GameControl/delete.svg" alt="删除比赛" class="delete" title="删除比赛" @click="createGame_delete_confirm()">   
        </div>
        <div class="area_2" v-bind:class="{ blur: cover }" v-if="joinGame">
            <h4>{{ data.gameName }}</h4>
            <img src="@/assets/Nav/GameControl/enter.svg" alt="加入" class="enter" title="加入比赛" @click="joinGame_joinGame()">
        </div>
        <div class="area_2" v-bind:class="{ blur: cover }" v-if="continueGame">
            <h4>{{ data.gameName }}</h4>
            <img src="@/assets/Nav/GameControl/enter.svg" alt="查看比赛" class="enter" title="查看比赛" @click="joinGame_joinGame()">
            <img src="@/assets/Nav/GameControl/begin.svg" alt="继续游戏" class="begin" title="继续游戏" @click="joinGame_continueGame()">
        </div>
        <div class="area_2" v-bind:class="{ blur: cover }" v-if="checkGame">
            <h4>{{ data.gameName }}</h4>
            <img src="@/assets/Nav/GameControl/enter.svg" alt="进入比赛" class="enter" title="进入比赛">
            <img src="@/assets/Nav/GameControl/begin.svg" alt="开始比赛" class="begin" title="开始比赛">
            <img src="@/assets/Nav/GameControl/delete.svg" alt="删除比赛" class="delete" title="删除比赛">   
        </div>
        <div class="cover" v-show="cover">
            <p><span>比赛名称</span> ： {{ data.gameName }}</p>
            <p><span>创建者</span> ： {{ data.creatorName }}</p>
            <p><span>创建时间</span> ： {{ data.gameCreateTime }}</p>
            <p><span>比赛状态</span> ：
                <template v-if="data.gameStatusEnum == 'CREATE'">创建中</template>
                <template v-if="data.gameStatusEnum == 'SURE'">准备完成</template>
                <template v-if="data.gameStatusEnum == 'PLAYING'">游戏中</template>
                <template v-if="data.gameStatusEnum == 'BANKRUPT'">已破产</template>
                <template v-if="data.gameStatusEnum == 'OVER'">已结束</template>
            </p>
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
                data_delete: [
                    {
                        title: '请输入密码',
                        value: ''
                    }
                ],
                // 卡片悬浮窗
                cover: false,

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
            this.getTime();
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
                this.$store.commit('controlAlert', [true, 'WARN', '确认开始比赛：' + this.data.gameName, null, null, () => {
                    Axios.post(this.URL + '/game/manage/begin', Qs.stringify({
                        "gameId": this.data.id,
                        "userId": this.$store.state.user.id
                    })).then((Response) => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, 'TRUE', '比赛初始化成功', null, null, null]);
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', Response.data.msg, null, null, null]);
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
                this.$store.commit('controlAlert', [true, 'WARN_DELETE', '确认删除比赛：' + this.data.gameName, null, this.data_delete, () => {
                    Axios.delete(this.URL + '/game/manage/delete', {
                        params: {
                            "gameId": this.data.id,
                            "userId": this.$store.state.user.id,
                            "password": this.data_delete[0].value
                        },
                        paramsSerializer: params => {
                            return Qs.stringify(params, { indices: false })
                        }
                    }).then((Response) => {
                        if (Response.data.code === 200) {
                            this.$store.commit('controlAlert', [true, 'TRUE', '删除比赛成功', null, null, null]);
                            VueEvent.$emit('refreshList');
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '删除失败', null, null, null]);
                            VueEvent.$emit('refreshList');
                        }
                    })
                }]);
            },
            // 获取当前时间
            getTime() {
                let time = new Date(this.data.gameCreateTime);
                this.data.gameCreateTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
            },

            joinGame_joinGame() {
                this.$router.push('/joinGame/joinGroup');
                this.$store.commit('setGameWatching', this.data.id);

            },
            joinGame_continueGame() {
                this.$store.commit('setGameWatching', this.data.id);
                VueEvent.$emit('noEdit', true);
                this.$router.push('/index');
            }
        },
        props: ['title', 'number', 'type', 'data']
    }
</script>

<style lang="scss" scoped>
    .card {
        position: relative;
        display: flex;
        flex-direction: row;
        width: 420px;
        height: 225px;
        margin: 40px;
        box-shadow: 0px 0px 10px 2px rgb(223, 220, 236);
        // border: 1px solid #000;
        .area_1 {
            position: relative;
            cursor: pointer;
            width: 145px;
            height: 225px;
            background-color: rgb(190, 190, 206);
            img {
                position: absolute;
                top: 42px;
                left: 10px;
                width: 120px;
            }
        }
        .area_2 {
            position: relative;
            padding: 20px;
            padding-top: 17px;
            line-height: 25px;
            transition: all 0.5s;
            h4 {
                color: rgb(153, 153, 153);
                font-size: 18px;
                font-weight: bold;
            }
            span {
                font-size: 12px;
            }
            img {
                cursor: pointer;
                position: absolute;
                width: 30px;
                bottom: 30px;
            }
            .enter {
                left: 20px;
            }
            .begin {
                left: 120px;
            }
            .delete {
                left: 215px;
            }
        }
        .blur {
           filter: blur(8px);
        }
        .cover {
            // filter: blur(0);
            position: absolute;
            display: flex;
            flex-direction: column;
            padding: 20px;
            top: 0;
            left: 145px;
            width: 280px;
            height: 225px;
            opacity: 0.5;
            color: #fff;
            background-color: #000;
            // filter: blur(5px);
            p {
                display: flex;
                font-size: 14px;
                line-height: 30px;
                span {
                    // display: flex;
                    width: 65px;
                    font-size: 14px;
                    display: block;
                    text-align: justify;
                    text-align-last: justify;
                    text-justify: distribute;
                }
            }
        }
        
        // .area_1 {
        //     height: 200px;
        //     text-align: center;
        //     border: 1px solid #000;
        //     border-right: 0;
        //     width: 125px;
        //     line-height: 200px;
        //     img {
        //         width: 60px;
        //     }
        // }
        // .area_2 {
        //     height: 200px;
        //     text-align: center;
        //     border: 1px solid #000;
        //     width: 225px;
        //     padding-top: 40px;
        //     span {
        //         display: block;
        //         margin: 15px;
        //     }
        // }
        // .area_3 {
        //     width: 400px;
        //     height: 50px;
        // }

        // .alert {
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 100%;
        //     z-index: 100;
        //     .contents {
        //         width: 450px;
        //         height: 200px;
        //         background-color: #fff;
        //         border-radius: 20px;
        //         margin-top: 400px;
        //         text-align: center;
        //         padding-top: 50px;
        //     }
        // }

        // .GameInfo {
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 100%;
        //     z-index: 100;
        //     .contents {
        //         width: 800px;
        //         height: 400px;
        //         background-color: #fff;
        //         border-radius: 20px;
        //         margin-top: 250px;
        //         .title {
        //             width: 100%;
        //             height: 70px;
        //             line-height: 70px;
        //             border-bottom: 1px solid #000;
        //             text-align: center;
        //             font-size: 22px;
        //             font-weight: bold;
        //         }
        //         .info {
        //             width: 100%;
        //             height: 330px;
        //             // text-align: center;
        //             padding-top: 30px;
        //             padding-left: 300px;
        //             span {
        //                 display: block;
        //                 line-height: 40px;
        //             }
        //         }
                
        //     }
        // }
    }
</style>
