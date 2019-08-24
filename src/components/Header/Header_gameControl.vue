<template>
    <div class="header_gameControl">
        <div class="title">
            <h1 @click="linkTo('/nav')">ERP虚拟运营系统</h1>
        </div>
        <div class="title_right">
            <div class="user" @mouseover="isHide = false">
                <span class="userName">用户名</span><img src="../../assets/Header/Nav_user.png">
            </div>
        </div>
        <div class="cover" v-show="!isHide" @mouseleave="isHide = true" v-if="turn">

        </div>
        <div class="info" v-bind:class="{ show: !isHide }" @mouseenter="isHide = false" @mouseleave="isHide = true" v-if="turn">
            <div class="main">
                <img src="../../assets/Header/Nav_user_2.svg" alt="" class="user">
                <span class="name"><i>姓名：</i>{{ this.$store.state.user.studentName }}</span>
                <span class="studentAccount"><i>学号：</i>{{ this.$store.state.user.studentAccount }}</span>
                <a class="exit" @click="exit()">安全退出</a>
            </div>
            <div class="footer">
                <!-- <a class="link" @click="infoCenter()">个人中心 >></a> -->
            </div>
        </div>
        <p class="state_no" v-show="state.no">当前状态：<span class="no">未加入</span></p>
        <p class="state_ready" v-show="state.ready">当前状态：<span class="ready">准备中</span></p>
    </div>
</template>

<script>
    import vueEvent from '../../model/VueEvent';
    
    export default {
        data() {
            return {
                data: [],
                cardState: false,
                // 是否展示下拉框
                isHide: true,
                turn: true,

                state: {
                    no: false,
                    ready: false
                }
            }
        },
        created() {
            let that = this;
            this.getState();
            vueEvent.$on('setReadyState', function() {
                that.getState();
            })
        },
        methods: {
            linkTo(address) {
                this.$router.push(address);
            },
            exit() {
                this.$store.commit('exit');
            },
            infoCenter() {
                this.turn = false;
                this.isHide = true;
                this.turn = true;
                this.$router.push('/userInfo');
            },
            getState() {
                if (localStorage.getItem('GAME_watching')) {
                    this.state.ready = true;
                    this.state.no = false;
                } else {
                    this.state.ready = false;
                    this.state.no = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header_gameControl {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        min-width: 1000px;
        .title {
            width: 320px;
            h1 {
                cursor: pointer;
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
                i {
                    color: #000;
                    font-weight: bold;
                }
                // color: #aaa;
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
                    right: 50px;
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
        .state_ready {
            position: absolute;
            left: 300px;
            font-size: 12px;
            .ready {
                color: #E6A23C;
                &::before {
                    content: "";
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background-color: #E6A23C;
                    border-radius: 50%;
                    top: 27px;
                    left: -15px;
                }
            }
        }
        .show {
            height: 224px;
        }
        .state_no {
            position: absolute;
            left: 300px;
            font-size: 12px;
            .no {
                color: #F56C6C;
                &::before {
                    content: "";
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background-color: #F56C6C;
                    border-radius: 50%;
                    top: 27px;
                    left: -15px;
                }
            }
        }
    }
</style>
