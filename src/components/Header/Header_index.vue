<template>
    <div class="header_index">
        <div class="title">
            <h1>ERP虚拟运营系统</h1>
        </div>
        <i title="退出比赛"><img src="@/assets/Game/Index/quit.svg" @click="quit()" alt="退出比赛"></i>
        <i title="周期推进"><img src="@/assets/Game/Index/next.svg" @click="advance()" alt="周期推进"></i>
        
        <div class="title_right">
            <div class="user" @mouseover="isHide = false">
                <img src="@/assets/Header/Nav_user.png"><span class="userName">用户名</span>
            </div>
        </div>
        <div class="cover" v-show="!isHide" @mouseleave="isHide = true" v-if="turn">

        </div>
        <div class="info" v-bind:class="{ show: !isHide }" @mouseenter="isHide = false" @mouseleave="isHide = true" v-if="turn">
            <div class="main">
                <img src="@/assets/Header/Nav_user_2.svg" alt="" class="user">
                <span class="name">姓名：{{ this.$store.state.user.studentName }}</span>
                <span class="studentAccount">学号：{{ this.$store.state.user.studentAccount }}</span>
                <img src="@/assets/Header/Nav_clock.svg" class="clock">
                <span class="game">第 {{ this.$store.state.game.year }} 年 - 第 {{ this.$store.state.game.period }} 周期</span>
                <a class="exit" @click="exit()">安全退出</a>
            </div>
            <div class="footer">
                <a class="link" @click="infoCenter()">个人中心 >></a>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                isMenu: false,
                isEnd: false,
                cardState: false,
                // 是否展示下拉框
                isHide: true,
                turn: true
            }
        },
        methods: {
            showCard() {
                this.cardState = !this.cardState;
            },
            exit() {
                this.$store.commit('exit');
            },
            quit() {
                let i = confirm('是否退出游戏，返回主界面？');
                if (i) {
                    this.$router.push('/nav');
                    localStorage.clear();
                }
            },
            linkTo(address) {
                this.$router.push(address);
            },
            endGame() {
                this.$store.commit('controlFloatWindow');
                this.isEnd = !this.isEnd;
            },
            // 周期推进
            advance() {
                let i = confirm('是否结束本周期，进入下个周期？');
                if (i) {
                    Axios.get(this.URL + '/game/compete/operation/advance?enterpriseId=' + localStorage.getItem('enterpriseId'))
                        .then(Response => {
                            if (Response.data.code === 204) {
                                this.$store.commit('getPeriod', this.URL);
                                this.$router.push('/index');
                                // location.reload();
                                alert(Response.data.msg);
                            } else if (Response.data.code === 200) {
                                alert(Response.data.msg);
                                localStorage.clear();
                                this.$router.push('/index');
                            } else {
                                alert(Response.data.msg);
                            }
                        })
                }
            },
            editReport() {
                this.$router.push('/report');
                this.endGame();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header_index {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        min-width: 1000px;
        .title {
            width: 320px;
            h1 {
                margin-left: 15px;
                font-size: 22px;
            }
            img {
                margin-left: 35px;
                margin-top: 17px;
                width: 206px;
                height: 27px;
            }
        }
        i {
            position: absolute;
            width: 28px;
            height: 28px;
            border: 1px solid #eee;
            left: 250px;
            top: 15px;
            // border-radius: 50%;
            img {
                cursor: pointer;
                position: absolute;
                top: 6px;
                left: 6px;
                width: 16px;
                height: 16px;
            }
            &:nth-of-type(2) {
                left: 295px;
            }
        }
        .version {
            margin-right: 37px;
            font-size: 16px;
            span {
                font-weight: bold;
            }
        }
        .title_right {
            display: flex;
            width: 150px;
            .user {
                width: 100px;
                position: relative;
                margin-right: 260px;
                img {
                    cursor: pointer;
                    width: 38px;
                    height: 38px;
                    margin-top: 11px;
                }
                span {
                    color: #333;
                    margin-top: 2px;
                    font-size: 12px;
                    width: 100px;
                    left: 45px;
                    position: absolute;
                }
            }
            a {
                font-weight: bold;
            }
        }
        .cover {
            position: absolute;
            right: 60px;
            width: 358px;
            height: 60px;
        }
        .info {
            position: absolute;
            width: 358px;
            height: 0px;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0px 5px 10px 1.08px rgba(134, 134, 134, 0.5);
            z-index: 30;
            right: 60px;
            top: 60px;
            transition: all 0.5s;
            .main {
                position: relative;
                width: 100%;
                height: 182px;
                font-size: 12px;
                .user {
                    position: absolute;
                    left: 34px;
                    top: 28px;
                }
                .name {
                    position: absolute;
                    left: 83px;
                    top: 37px;
                }
                .studentAccount {
                    position: absolute;
                    top: 37px;
                    left: 170px;
                }
                .continue {
                    position: absolute;
                    top: 37px;
                    right: 37px;
                }
                .clock {
                    position: absolute;
                    left: 83px;
                    top: 127px;
                }
                .game {
                    position: absolute;
                    left: 120px;
                    top: 120px;
                }
                .exit {
                    position: absolute;
                    color: #46b8ed;
                    right: 37px;
                    top: 120px;
                }
            }
            .footer {
                position: relative;
                height: 42px;
                background-color: #E4E4E4;
                font-size: 14px;
                .link {
                    position: absolute;
                    right: 36px;
                    top: -8px;
                }
            }
        }
        .show {
            height: 224px;
        }
    }
</style>
