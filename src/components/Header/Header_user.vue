<template>
    <div class="header_nav mg">
        <div class="title">
            <h1>ERP虚拟运营系统</h1>
        </div>
        <div class="title_right">
            <div class="user" @mouseover="isHide = false">
                <img src="../../assets/Header/User_back.svg">
                <img src="../../assets/Header/User_house.svg">
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
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
            linkTo(address) {
                this.$router.push(address);
            },
            infoCenter() {
                this.turn = false;
                this.isHide = true;
                this.turn = true;
                this.$router.push('/userInfo');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header_nav {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 55px;
        min-width: 1000px;
        .title {
            width: 440px;
            h1 {
                margin-left: 198px;
                font-size: 30px;
                // font-weight: bold;
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
            .user {
                width: 200px;
                position: relative;
                margin-right: 68px;
                img {
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    margin-top: 12px;
                    margin-left: 24px;
                }
                span {
                    color: #333;
                    margin-top: 2px;
                    font-size: 12px;
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
            box-shadow: 0px 5px 16.92px 1.08px rgba(46, 124, 160, 0.5);
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
