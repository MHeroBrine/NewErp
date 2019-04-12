<template>
    <div id="checkGame">
        <div class="nav">
            <img src="../../../../assets/icon/menu.svg" alt=""><a @click="freshList()">切换视角</a>&nbsp;&nbsp;
            <img src="../../../../assets/icon/circle.svg" alt=""><a @click="createGame()">刷新</a>
            <v-input-search class="fr"></v-input-search>
        </div>
        <div class="content mg">
            <v-pagination-game :list="gameList" type="checkGame"></v-pagination-game>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                gameList: [
                    {
                        gameName: 'XXX',
                        companyNum: 3
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 5
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 7
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    },
                    {
                        gameName: 'XXX',
                        companyNum: 11
                    }
                ]
            }
        },
        mounted() {
            this.$store.commit('pageState', 'gameControl_checkGame');
            this.$store.commit('setGameControlTitle', '继续比赛');
        }
    }
</script>

<style lang="scss" scoped>
    #checkGame {
        width: 100%;
        .nav {
            width: 100%;
            min-width: 1200px;
            height: 70px;
            border-bottom: 1px solid #000;
            padding-top: 15px;
            padding-left: 10px;
            img {
                width: 30px;
            }
            .input_search {
                margin: 5px 10px 0 0;
            }
        }
        .content {
            margin-top: 50px;
            width: 1200px;
        }
    }
</style>
