<template>
    <div class="pagination_game">

        <template v-if="isReady" v-for="item in gameList">
            <v-card-game :data="item" :type="type"></v-card-game>
        </template>
        <div class="paginate mg">
            <icon class="back_2" @click="page = 1"></icon>
            <icon class="back_1" @click="page --"></icon>
            <div class="count"> {{ page }} / {{ total }} </div>
            <icon class="forward_1" @click="page ++"></icon>
            <icon class="forward_2" @click="page = total"></icon>
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
            this.getGameInfo(1);

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
                    Axios.post(this.URL + '/game/manage/gameInfos/search', {
                        "concurrentPage": value,
                        "pageSize": 6,
                        "gameStatus": "CREATE",
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
                    Axios.post(this.URL + '/game/manage/gameInfos/search', {
                        "concurrentPage": value,
                        "pageSize": 6,
                        "gameStatus": "CREATE",
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
                    Axios.post(this.URL + '/game/manage/gameInfos/search', {
                        "concurrentPage": value,
                        "pageSize": 6,
                        "gameStatus": "PLAYING",
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

                if (this.type === 'checkGame') {
                    Axios.post(this.URL + '/game/manage/gameInfos/search', {
                        "concurrentPage": value,
                        "pageSize": 6,
                        "gameStatus": "OVER",
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
        props: ['list', 'type', 'gameStatus']
    }
</script>

<style lang="scss" scoped>
    .pagination_game {
        width: 1200px;
        .paginate {
            display: flex;
            justify-content: center;
            margin-top: 80px;
            text-align: center;
            .count {
                margin-left: 20px;
                margin-right: 20px;
                width: 50px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                background-color: #fff;
                border: 1px solid #000;
            }
            icon {
                cursor: pointer;
            }
        }
    }
</style>
