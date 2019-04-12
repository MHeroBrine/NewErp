<template>
    <div class="gameControl">
        <h3>系统</h3>
        <ul>
            <li v-bind:class="{ active: this.$store.state.global.SIDEBAR_GAMECONTROL_ISREADY }"><router-link to="/joinGame">未开始</router-link></li>
            <li v-bind:class="{ active: this.$store.state.global.SIDEBAR_GAMECONTROL_ISRUNNING }"><router-link to="/continueGame">进行中</router-link></li>
            <li v-bind:class="{ active: this.$store.state.global.SIDEBAR_GAMECONTROL_ISOVER }"><router-link to="/checkGame">已结束</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .gameControl {
        width: 150px;
        height: 100%;
        background-color: #fff;
        border-right: 1px solid #000;
        padding-top: 200px;
        h3 {
            margin-bottom: 10px;
        }
        ul {
            li {
                width: 100%;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background-color: #fff;
                color: #000;
                border: 1px solid #000;
            }
            .active {
                background-color: #409EFF;
                a {
                    color: #fff;
                }
            }
        }
    }
</style>
