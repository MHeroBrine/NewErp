<template>
    <div class="nav_user">
        <div class="profile">
            <div class="changeProfile" @click="changeProfile()">更换头像</div>
            <img src="../../assets/Header/Nav_user_2.svg" alt="">
            <div></div>
            <span class="userName">用户名</span>
        </div>
        <div class="accountManage">
            <h3>账号管理</h3>
            <ul>
                <li><router-link to="/userInfo">个人信息</router-link></li>
                <li><router-link to="/setPassword">密码设置</router-link></li>
            </ul>
        </div>
        <div class="setProfile" v-if="isChangeProfile">
            <div class="profileSelect mg">
                <div>
                    <h3>设置头像</h3>
                </div>
                <div>
                    <img src="../../assets/logo.png" alt="">
                    <div></div>
                    <img src="../../assets/icon/circle.svg" alt=""><span>换一换</span>
                    <div></div>
                    <v-button1 value="确认" type="primary" width="150px"></v-button1>
                    <v-button1 value="取消" type="primary" width="150px" @click.native="changeProfile()"></v-button1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isChangeProfile: false
            }
        },
        methods: {
            changeProfile() {
                this.$store.commit('controlFloatWindow');
                this.isChangeProfile = !this.isChangeProfile;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav_user {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 332px;
        width: 313px;
        height: 840px;
        text-align: center;
        background-color: #fff;
        border: 2px solid #46B8ED;
        .profile {
            position: relative;
            text-align: center;
            width: 124px;
            height: 124px;
            margin-top: 70px;
            border: 2px solid #46B8ED;
            .changeProfile {
                position: absolute;
                width: 124px;
                height: 32px;
                line-height: 32px;
                left: -2px;
                bottom: 0px;
                z-index: 50;
                background-color: #000;
                opacity: 0;
                color: #fff;
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                }
            }
            img {
                position: absolute;
                width: 84px;
                height: 98px;
                left: 20px;
                bottom: 13px;
            }
            .userName {
                position: absolute;
                bottom: -46px;
                left: 39px;
            }
        }
        .accountManage {
            display: flex;
            flex-direction: column;
            margin-top: 126px;
            align-items: center;
            h3 {
                width: 100px;
                font-size: 24px;
                padding: 0 2px 4px 2px;
                border-bottom: 2px solid #409EFF;
            }
            ul {
                width: 313px;
                margin-top: 20px;
                li {
                    font-size: 20px;
                    padding: 20px;
                    background-color: #409EFF;
                    a {
                        color: #fff;
                    }
                    &:nth-of-type(2) {
                        background-color: #fff;
                        border-right: 2px solid #409EFF;
                        border-left: 2px solid #409EFF;
                        a {
                            color: #000;
                            
                        }
                    }
                }
            }
        }
        .setProfile {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 100;
            .profileSelect {
                width: 800px;
                height: 600px;
                background-color: #fff;
                margin-top: 160px;
                border: 1px solid #000;
                border-radius: 20px;
                div {
                    &:nth-of-type(1) {
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        h3 {
                            font-size: 22px;
                            text-align: center;
                            border-bottom: 1px solid #000;
                        }
                    }
                    &:nth-of-type(2) {
                        width: 100%;
                        height: 540px;
                        text-align: center;
                        div {
                            height: 0;
                        }
                        img {
                            &:nth-of-type(1) {
                                width: 400px;
                                height: 300px;
                                margin-top: 20px;
                            }
                            &:nth-of-type(2) {
                                width: 40px;
                            }
                        }
                        .button_1 {
                            margin-top: 20px;
                        }
                    }
                }
            }
        }
    }
</style>
