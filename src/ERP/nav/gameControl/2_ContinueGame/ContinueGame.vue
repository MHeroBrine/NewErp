<template>
    <div id="continueGame">
        <div class="container_default">
            <div class="title">
                <h3>继续比赛</h3>
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" title="刷新" @click="freshList()">
            </div>
            <div class="main">
                <v-pagination-game type="continueGame"></v-pagination-game>
            </div>
        </div>
    </div>
</template>

<script>
    import vueEvent from '../../../../model/VueEvent';

    export default {
        data() {
            return {}
        },
        methods: {
            freshList() {
                // 调用分页组件函数 获取游戏信息
                vueEvent.$emit('refreshGameList');
            },
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
        .container_default {
            height: 95%;
            .title {
                img {
                    cursor: pointer;
                    width: 30px;
                    position: absolute;
                    top: 15px;
                    left: 120px;
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
