<template>
    <div class="nav_user">
        <ul class="main">
            <li @click="linkTo('/nav')" style="margin-top: 20px;" class="mainItem">
                <img src="@/assets/Game/Index/index.svg">
                <router-link to="/nav" class="home">首页</router-link>
            </li>
            <li class="mainItem" v-bind:class="{ active: sidebarActive.info }">
                <img src="@/assets/Nav/UserInfo/info.svg" v-show="!sidebarActive.info">
                <img src="@/assets/Nav/UserInfo/info_active.svg" v-show="sidebarActive.info">
                <a class="home">个人信息</a>
            </li>
            <!-- <li class="mainItem" v-bind:class="{ active: sidebarActive.password }">
                <img src="@/assets/Nav/UserInfo/password.svg" v-show="!sidebarActive.password">
                <img src="@/assets/Nav/UserInfo/password_active.svg" v-show="sidebarActive.password">
                <a class="home">修改密码</a>
            </li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sidebarActive: {
                    info: true,
                    password: false
                },
                isChangeProfile: false
            }
        },
        methods: {
            changeProfile() {
                this.$store.commit('controlFloatWindow');
                this.isChangeProfile = !this.isChangeProfile;
            },
            linkTo(address) {
                this.$router.push(address);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav_user {
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
