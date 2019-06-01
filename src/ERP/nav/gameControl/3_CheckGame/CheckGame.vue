<template>
    <div id="checkGame">
        <div class="container_default">
            <div class="title">
                <h3>查看历史比赛</h3>
            </div>
            <div class="main">
                <v-pagination-game type="checkGame"></v-pagination-game>
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" @click="freshList()">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.$store.commit('pageState', 'gameControl_checkGame');
            this.$store.commit('setGameControlTitle', '继续比赛');
        }
    }
</script>

<style lang="scss" scoped>
    #checkGame {
        position: relative;
        width: 100%;
        .main {
            img {
                cursor: pointer;
                width: 30px;
            }
            .add {
                position: absolute;
                bottom: 30px;
                right: 80px;
            }
            .refresh {
                position: absolute;
                bottom: 30px;
                right: 30px
            }
        }
    }
</style>
