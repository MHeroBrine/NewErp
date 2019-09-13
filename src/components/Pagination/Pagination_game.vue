<template>
    <div class="pagination_game">
        <div class="v-card first" @click="createMethod()" v-if="this.type === 'createGame'">
            <div class="covers"></div>
            <div class="area_1">
                <img src="@/assets/Nav/GameControl/image.svg">
            </div>
            <div class="area_2">
                <img class="add" src="@/assets/Nav/GameControl/add_2.svg">
            </div>
        </div>
        <template v-if="isReady" v-for="item in gameList">
            <v-card-game :data="item" :type="type"></v-card-game>
        </template>
        <div class="paginate mg">
            <template v-for="i in total">
                <button v-bind:class="{ active: i == page }" @click="page = i">{{ i }}</button>
            </template>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import vueEvent from '../../model/VueEvent';

    export default {
        data() {
            return {
                isReady: false,
                gameList: [],

                page: 1,
                total: 0,
            }
        },
        mounted() {
            if (this.$store.state.user.id) {
                this.getGameInfo(1);
            } else {
                vueEvent.$on('dataComplete', () => {
                    this.getGameInfo(1);
                })
            }
            

            // 监听比赛信息的修改
            let that = this;
            vueEvent.$on('refreshGameList', function() {
                that.getGameInfo(that.page);  
            })
        },
        watch: {
            page: function(val) {
                if (val < 1) {
                    this.page = 1;
                    return;
                } else if (val > this.total) {
                    this.page --;
                    return;
                } else {
                    this.getGameInfo(val);
                }
            }
        },
        methods: {
            getGameInfo(value) {
                this.page = value;

                if (this.type === 'createGame') {
                    Axios.post(this.URL + '/game/manage/search', {
                        "concurrentPage": value,
                        "pageSize": 6,
                        "gameStatusEnum": "CREATE",
                        "studentId": this.$store.state.user.id
                    }).then((Response) => {
                        console.log(Response);
                        this.gameList = Response.data.data.pageData;
                        let totalMessage = parseInt(Response.data.data.totalMessage);
                        if (totalMessage % 6 === 0) {
                            this.total = parseInt(totalMessage / 6);
                        } else {
                            this.total = parseInt((totalMessage / 6) + 1);
                        }
                        this.isReady = true;
                    })
                }

                if (this.type === 'joinGame') {
                    Axios.post(this.URL + '/game/manage/search', {
                        "concurrentPage": value,
                        "pageSize": 6,
                        "gameStatusEnum": "CREATE",
                        "teacherId": this.$store.state.user.teacherId
                    }).then((Response) => {
                        this.gameList = Response.data.data.pageData;
                        let totalMessage = parseInt(Response.data.data.totalMessage);
                        if (totalMessage % 6 === 0) {
                            this.total = parseInt(totalMessage / 6);
                        } else {
                            this.total = parseInt((totalMessage / 6) + 1);
                        }
                        this.isReady = true;
                    })
                }

                if (this.type === 'continueGame') {
                    Axios.get(this.URL + '/game/manage/status?userId=' + this.$store.state.user.id + '&gameStatus=PLAYING&currentPage=' + value + '&amountOfPage=6')
                        .then(Response => {
                            console.log(Response);
                            this.gameList = Response.data.data.gameDetailInfoVo;
                            let totalMessage = parseInt(Response.data.data.totalAmount);
                            if (totalMessage % 6 === 0) {
                                this.total = parseInt(totalMessage / 6);
                            } else {
                                this.total = parseInt((totalMessage / 6) + 1);
                            }
                            this.isReady = true;
                        })
                }

                if (this.type === 'checkGame') {
                    Axios.post(this.URL + '/game/manage/gameInfos/search', {
                        "concurrentPage": value,
                        "pageSize": 6,
                        "gameStatusEnum": "OVER",
                        "teacherId": this.$store.state.user.teacherId
                    }).then((Response) => {
                        this.gameList = Response.data.data.pageData;
                        let totalMessage = parseInt(Response.data.data.totalMessage);
                        if (totalMessage % 6 === 0) {
                            this.total = parseInt(totalMessage / 6);
                        } else {
                            this.total = parseInt((totalMessage / 6) + 1);
                        }
                        this.isReady = true;
                    })
                }
            },
        },
        props: ['list', 'type', 'gameStatus', 'createMethod']
    }
</script>

<style lang="scss" scoped>
    .pagination_game {
        max-width: 1600px;
        padding-bottom: 50px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        .first {
            cursor: pointer;
            .add {
                top: 35%;
                width: 30%;
                left: 35%;
            }
            .covers {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 20;
                background-color: #fff;
                opacity: 0.4;
            }
        }
        .paginate {
            position: absolute;
            bottom: 20px;
            left: 40px;
            button {
                cursor: pointer;
                width: 34px;
                height: 34px;
                background-color: rgb(143, 143, 226);
                border: 0;
                outline: none;  
                color: #fff;
                &:nth-of-type(1) {
                    border-radius: 5px 0 0 5px;
                }
                &:nth-last-of-type(1) {
                    border-radius: 0 5px 5px 0;
                }
            }
            .active {
                background-color: rgb(88, 88, 226);
            }
        }
    }
</style>
