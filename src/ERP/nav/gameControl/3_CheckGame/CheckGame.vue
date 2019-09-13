<template>
    <div id="checkGame">
        <div class="container_default">
            <div class="title">
                <h3>查看历史比赛</h3>
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" title="刷新" @click="freshList()">
            </div>
            <div class="main">
                <v-pagination-game type="checkGame"></v-pagination-game>
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
        .container_default {
            height: 95%;
            .title {
                img {
                    cursor: pointer;
                    width: 30px;
                    position: absolute;
                    top: 15px;
                    left: 160px;
                }
            }
        }
        .main {
            img {
                cursor: pointer;
                width: 45px;
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
</style>
