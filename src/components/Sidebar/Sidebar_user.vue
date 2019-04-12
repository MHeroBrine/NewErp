<template>
    <div class="nav_user">
        <div class="profile">
            <div class="changeProfile" @click="changeProfile()">更换头像</div>
            <img src="../../assets/icon/user.svg" alt="">
            <div></div>
            <span>用户名：XXX</span>
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
        width: 150px;
        height: 100%;
        background-color: #fff;
        border-right: 1px solid #000;
        .profile {
            position: relative;
            text-align: center;
            height: 150px;
            .changeProfile {
                position: absolute;
                width: 100px;
                height: 100px;
                line-height: 100px;
                left: 25px;
                top: 30px;
                background-color: #000;
                opacity: 0;
                color: #fff;
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                }
            }
            img {
                margin-top: 30px;
                width: 100px;
            }
        }
        .accountManage {
            margin-top: 20px;
            text-align: center;
            h3 {
                font-size: 20px;
                font-weight: bold;
            }
            ul {
                margin-top: 20px;
                li {
                    padding-top: 15px;
                    padding-bottom: 15px;
                    background-color: #409EFF;
                    width: 100%;
                    a {
                        color: #fff;
                    }
                    // margin-top: 10px;
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
