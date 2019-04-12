<template>
    <div class="header_index">
        <div class="title">
            <h1>ERP虚拟运营系统</h1>&nbsp;&nbsp;&nbsp;<span>第一年第一期</span>&nbsp;&nbsp;
            <img src="../../assets/icon/play.svg" alt="">
            <img src="../../assets/icon/exit.svg" alt="" @click="endGame()">

            <div class="endGame" v-if="isEnd">
                <div class="container mg">
                    <div class="top">
                        <h3>退出经营？</h3>
                    </div>
                    <div class="context">
                        <p>填写实验报告&nbsp;&nbsp;<a @click="editReport()">--></a></p>
                    </div>
                    <div class="form">
                        <template v-for="item in data">
                            <v-input1 :title="item.title" v-model="item.value"></v-input1>
                        </template>
                    </div>
                    <div class="button">
                        <v-button1 type="primary" value="确认" width="140px" @click.native="confirm()"></v-button1>
                        <v-button1 type="primary" value="返回" width="140px" @click.native="endGame()"></v-button1>
                    </div>
                </div>
            </div>

        </div>
        <div>
            <div class="menu">
                实验报告&nbsp;<a @click="isMenu = !isMenu">↓</a>
                <ul v-if="isMenu">
                    <li>查看报告</li>
                    <li>在线编辑</li>
                </ul>
                &nbsp;&nbsp;&nbsp;
            </div>
            <img src="../../assets/icon/home.svg" alt="" @click="linkTo('/nav')">
            <img src="../../assets/icon/user.svg" alt="" class="user" @click="showCard()">
            <div class="card" v-if="cardState">
                <div>
                    <img src="../../assets/icon/user.svg" alt="">
                    <a>{{ this.$store.state.user.studentName }}</a> / <a>{{ this.$store.state.user.studentAccount }}</a>
                    <a href="#" @click="exit()">安全退出</a>
                </div>
                <div>
                    <span>xxx比赛</span><a>继续</a>
                </div>
                <div>
                    <router-link to="/userInfo" class="fr" @click.native="cardState = false">个人中心</router-link>
                </div>
            </div>
            {{ this.$store.state.user.studentName }}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isMenu: false,
                isEnd: false,
                cardState: false
            }
        },
        methods: {
            showCard() {
                this.cardState = !this.cardState;
            },
            exit() {
                this.$store.commit('exit');
            },
            linkTo(address) {
                this.$router.push(address);
            },
            endGame() {
                this.$store.commit('controlFloatWindow');
                this.isEnd = !this.isEnd;
            },
            editReport() {
                this.$router.push('/report');
                this.endGame();
            },
            confirm() {

            },
        }
    }
</script>

<style lang="scss" scoped>
    .header_index {
        display: flex;
        justify-content: space-between;
        height: 70px;
        line-height: 70px;
        min-width: 1000px;
        padding: 10px;
        background-color: #666;
        h1 {
            font-size: 30px;
            font-weight: bold;
        }
        div {
            display: flex;
            a {
                font-weight: bold;
            }
        }
        img {
            cursor: pointer;
            width: 50px;
            height: 50px;
        }
        .title {
            img {
                width: 40px;
            }
            .endGame {
                display: flex;
                align-items: center;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 100;
                .container {
                    display: block;
                    position: relative;
                    width: 600px;
                    height: 300px;
                    background-color: #fff;
                    border-radius: 20px;
                    border: 1px solid #000;
                    .top {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        border-bottom: 1px solid #000;
                        h3 {
                            font-size: 20px;
                            font-weight: bold;
                        }
                    }
                    .context {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        height: 100px;
                        line-height: 100px;
                        
                    }
                    .button {
                        display: flex;
                        justify-content: center;
                    }
                }
            }
        }
        .menu {
            position: relative;
            margin-right: 30px;
            a {
                cursor: pointer;
            }
            ul {
                position: absolute;
                top: 62px;
                li {
                    display: flex;
                    flex-direction: row;
                    width: 80px;
                    line-height: 30px;
                    background-color: #fff;
                }
            }
        }
         .card {
            display: block;
            position: absolute;
            width: 350px;
            height: 200px;
            top: 61px;
            right: 0;
            border: 1px solid #000;
            border-top: 0px;
            background-color: #fff;
            div {
                display: block;
                padding: 10px;
                width: 100%;
                &:nth-of-type(1) {
                    // width: 100%;
                    height: 100px;
                }       
                &:nth-of-type(2) {
                    // width: 100%;
                    height: 70px;
                    border-bottom: 2px solid #eee;
                    span {
                        margin-left: 100px;
                    }
                    a {
                        margin-left: 30px;
                    }
                }   
                &:nth-of-type(3) {
                    padding: 0;
                    line-height: 28px;
                    height: 28px;
                    a {
                        margin-right: 10px;
                    }
                }          
                a {
                    font-weight: normal;
                    font-size: 13px;
                    &:nth-of-type(3) {
                        margin-left: 120px;
                    }
                }
            }
        }
    }
</style>
