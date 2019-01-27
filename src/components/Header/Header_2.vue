<template>
    <div class="header_2 mg">
        <div>
            <img src="../../assets/logo.png" alt="">
            <h1>虚拟运营系统</h1>
        </div>
        <div>
            <img src="../../assets/icon/user.svg" alt="" class="user" @click="showCard()">
            <div class="card" v-if="cardState">
                <div>
                    <img src="../../assets/icon/user.svg" alt="">
                    <a>姓名</a> / <a>用户名</a>
                    <a href="#">安全退出</a>
                </div>
                <div>
                    <span>xxx比赛</span><a>继续</a>
                </div>
                <div>
                    <a class="fr" href="#" @click="toUserInfo()">个人中心</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cardState: false
            }
        },
        methods: {
            showCard() {
                this.cardState = !this.cardState;
            },
            toUserInfo() {
                this.$router.push('/userInfo'),
                this.cardState = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header_2 {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        min-width: 1000px;
        margin: 10px;
        div {
            display: flex;
            .user {
                cursor: pointer;
            }
            a {
                font-weight: bold;
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
        img {
            width: 50px;
            height: 50px;
        }   
    }
</style>
