<template>
    <div class="header_nav mg">
        <div class="title">
            <h1>ERP虚拟运营系统</h1>
        </div>
        <div class="title_right">
            <div class="user">
                <img src="../../assets/Header/Nav_user.png" @click="showCard()"><span class="userName">用户名</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
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
            width: 320px;
            h1 {
                margin-left: 35px;
                font-size: 26px;
                font-weight: bold;
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
                    left: 45px;
                    position: absolute;
                }
            }
            a {
                font-weight: bold;
            }
        }
        img {
            width: 50px;
            height: 50px;
        }   
    }
</style>
