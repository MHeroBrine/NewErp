<template>
    <div id="continueGame">
        <div class="container_default">
            <div class="title">
                <h3>继续比赛</h3>
            </div>
            <div class="main">
                <v-pagination-game type="continueGame"></v-pagination-game>
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
            this.$store.commit('pageState', 'gameControl_continueGame');
            this.$store.commit('setGameControlTitle', '比赛管理');
        }
    }
</script>

<style lang="scss" scoped>
    #continueGame {
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
