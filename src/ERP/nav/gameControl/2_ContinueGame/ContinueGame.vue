<template>
    <div id="continueGame">
        <div class="nav">
            <img src="../../../../assets/icon/menu.svg" alt=""><a @click="freshList()">切换视角</a>&nbsp;&nbsp;
            <img src="../../../../assets/icon/circle.svg" alt=""><a @click="createGame()">刷新</a>
            <v-input-search class="fr"></v-input-search>
        </div>
        <div class="content mg">
            <v-pagination-game type="continueGame"></v-pagination-game>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.$store.commit('pageState', 'gameControl_continueGame');
            this.$store.commit('setGameControlTitle', '比赛管理');
        }
    }
</script>

<style lang="scss" scoped>
    #continueGame {
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
