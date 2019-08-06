<template>
    <div class="gameControl">
        <ul class="main">
            <li @click="linkTo('/nav')" style="margin-top: 20px;" class="mainItem">
                <img src="@/assets/Game/Index/index.svg">
                <router-link to="/nav" class="home">首页</router-link>
            </li>
            <li @click="linkTo('/createGame')" class="mainItem" v-bind:class="{ active: this.$store.state.global.SIDEBAR_GAMECONTROL_CREATE }">
                <img src="@/assets/Nav/GameControl/create.svg" v-show="!this.$store.state.global.SIDEBAR_GAMECONTROL_CREATE">
                <img src="@/assets/Nav/GameControl/create_active.svg" v-show="this.$store.state.global.SIDEBAR_GAMECONTROL_CREATE">
                <router-link to="/createGame" class="home">创建比赛</router-link>
            </li>
            <li @click="linkTo('/joinGame')" class="mainItem" v-bind:class="{ active: this.$store.state.global.SIDEBAR_GAMECONTROL_JOIN }">
                <img src="@/assets/Nav/GameControl/join.svg" v-show="!this.$store.state.global.SIDEBAR_GAMECONTROL_JOIN">
                <img src="@/assets/Nav/GameControl/join_active.svg" v-show="this.$store.state.global.SIDEBAR_GAMECONTROL_JOIN">
                <router-link to="/joinGame" class="home">加入比赛</router-link>
            </li>
            <li @click="linkTo('/continueGame')" class="mainItem" v-bind:class="{ active: this.$store.state.global.SIDEBAR_GAMECONTROL_CONTINUE }">
                <img src="@/assets/Nav/GameControl/continue.svg" v-show="!this.$store.state.global.SIDEBAR_GAMECONTROL_CONTINUE">
                <img src="@/assets/Nav/GameControl/continue_active.svg" v-show="this.$store.state.global.SIDEBAR_GAMECONTROL_CONTINUE">
                <router-link to="/continueGame" class="home">继续比赛</router-link>
            </li>
            <li @click="linkTo('/checkGame')" class="mainItem" v-bind:class="{ active: this.$store.state.global.SIDEBAR_GAMECONTROL_HISTORY }">
                <img src="@/assets/Nav/GameControl/history.svg" v-show="!this.$store.state.global.SIDEBAR_GAMECONTROL_HISTORY">
                <img src="@/assets/Nav/GameControl/history_active.svg" v-show="this.$store.state.global.SIDEBAR_GAMECONTROL_HISTORY">
                <router-link to="/checkGame" class="home">查看历史比赛</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            linkTo(address) {
                this.$router.push(address);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gameControl {
        display: flex;
        flex-direction: row;
        width: 210px;
        height: 100%;
        border-right: 1px solid #000;
        background-color: #2A3542;
        .main {
            width: 100%;
            .mainItem {
                cursor: pointer;
                display: flex;
                flex-direction: column;
                position: relative;
                box-sizing: border-box;
                width: 190px;
                min-height: 47px;
                line-height: 47px;
                padding-left: 10px;
                margin-left: 10px;
                margin-top: 5px;
                border-radius: 5px;
                font-size: 14px;
                img {
                    width: 21px;
                    height: 15px;
                    top: 16px;
                    position: absolute;
                }
                .home, span {
                    color: #AEB2B7;
                    position: absolute;
                    left: 38px;
                }
                i {
                    cursor: pointer;
                    font-size: 16px;
                    color: #AEB2B7;
                    position: absolute;
                    right: 10px;
                }
                ul {
                    transition: max-height 0.5s;
                    max-height: 0;
                    overflow: hidden;
                    margin-top: 47px;
                    li {
                        a {
                            position: relative;
                            color: #AEB2B7;
                            left: 0;
                        }
                        line-height: 45px;
                        padding-left: 27.5px;
                        &:hover {
                            a {
                                color: #F9685F;
                            }
                        }
                    }
                }
                .list {
                    transition: max-height 0.75s;
                    max-height: 200px;
                }
                &:hover {
                    background-color: #35404D;
                    span, .home {
                        color: #fff;
                    }
                }
            }
            .back {
                position: absolute;
                bottom: 20px;
            }
            .active {
                background-color: #35404D;
                span, .home {
                    color: #fff;
                }
            }
        }
    }
</style>
