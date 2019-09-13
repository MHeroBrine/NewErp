<template>
    <div id="joinGame">
        <div class="container_default">
            <div class="title">
                <h3>加入比赛</h3>
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" title="刷新" @click="freshList()">
            </div>
            <div class="main">
                <v-pagination-game type="joinGame"></v-pagination-game>
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
            this.$store.commit('pageState', 'gameControl_joinGame');
        }
    }
</script>

<style lang="scss" scoped>
    #joinGame {
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
            .main {
                height: 95%;
                padding-bottom: 20px;
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
    }
</style>
