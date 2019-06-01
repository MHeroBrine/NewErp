<template>
    <div id="Login">
        <div class="container mg">
            <div class="form" v-show="!isVerify">
                <h2>学生端</h2>
                <img src="../assets/Login/cap.svg" class="cap">
                <div class="userCount">
                    <input class="v-input" placeholder="学号/用户名" v-model="userAccount">
                    <img src="../assets/Login/people.svg">
                </div>
                <div class="password">
                    <input class="v-input" placeholder="请输入密码" type="password" v-model="userPassword" v-show="eye">
                    <input class="v-input" placeholder="请输入密码" type="text" v-model="userPassword" v-show="!eye">
                    <img src="../assets/Login/lock.svg" class="lock">
                    <img src="../assets/Login/eye_open.svg" class="eye" v-show="eye" @click="eye = !eye">
                    <img src="../assets/Login/eye_close.svg" class="eye" v-show="!eye" @click="eye = !eye">
                </div>
                <router-link class="register" to="/register">新用户注册</router-link>
                <button class="v-button b-primary login" @click="login()">登录</button>
                <div class="admin_login">
                    <span>管理员登录</span>
                    <img src="../assets/Login/step.svg">
                </div>
            </div>

            <div class="form" v-show="isVerify">
                <div class="userCount">
                    <input class="v-input" placeholder="学号/用户名" v-model="userAccount">
                    <img src="../assets/Login/people.svg">
                </div>
                <div class="password">
                    <input class="v-input" placeholder="请输入密码" type="password" v-model="userPassword" v-show="eye">
                    <input class="v-input" placeholder="请输入密码" type="text" v-model="userPassword" v-show="!eye">
                    <img src="../assets/Login/lock.svg" class="lock">
                    <img src="../assets/Login/eye_open.svg" class="eye" v-show="eye" @click="eye = !eye">
                    <img src="../assets/Login/eye_close.svg" class="eye" v-show="!eye" @click="eye = !eye">
                </div>
                <div class="verifyCode">
                    <div class="main">
                        <span>验证码:</span>
                        <input type="text" class="code">
                        <img :src="URL + '/user/student/verificationCode/get'">
                    </div>
                </div>
                <a href="" class="register" style="top: 286px">新用户注册</a>
                <button class="v-button b-primary login" @click="login()">登录</button>
                <div class="admin_login">
                    <span>管理员登录</span>
                    <img src="../assets/Login/step.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import Qs from 'qs'

    export default {
        data() {
            return {
                // 验证码
                isVerify: false,
                verifyCodeUrl: '',
                verifyCode: '',

                // 用户账号，密码
                userAccount: '',
                userPassword: '',

                // 密码是否可见
                eye: true
            }
        },
        methods: {
            // 登录
            login() {
                let data;

                // 需要验证码时更新提交格式
                if (this.verifyCode === '') {
                    data = {
                        userAccount: this.userAccount,
                        userPassword: this.userPassword
                    }
                } else {
                    data = {
                        userAccount: this.userAccount,
                        userPassword: this.userPassword,
                        verificationCode: this.verifyCode
                    }
                }

                // 登录接口
                Axios.post(this.URL + '/user/student/login', Qs.stringify(data))
                    .then((Response) => {
                        if (Response.data.code === 200) {
                            alert('登录成功');

                            // 修改
                            this.Cookie.setCookie('userId', Response.data.data, 0.5);
                            this.$store.commit('setUserInfo', [this.URL, Response.data.data]);
                            
                            this.$router.push('/nav');
                        } else if (Response.data.code === 401) {
                            alert('账户密码有误，请检查后重试');
                        } else if (Response.data.code === 400) {
                            alert('验证码输入错误');
                            this.verify();
                        }
                    })
            },
            // 获取验证码
            verify() {
                this.verifyCodeUrl = this.URL + '/user/student/verificationCode/get?d=' + Math.random()*100;
            }
        },
        mounted() {
            this.$store.commit('pageState', 'login');
        }
    }
</script>

<style lang="scss" scoped>
    #Login {
        background: url('../assets/Login/background.png');
        width: 100%;
        min-width: 800px;
        .container {
            display: flex;
            flex-direction: row-reverse;
            width: 800px;   
            .form {
                position: relative;
                margin-top: 150px;
                width: 468px;
                height: 456px;
                background-color: #fff;
                border-radius: 20px;
                div {
                    transition: all 0.5s;
                }
                img {
                    transition: all 0.5s;
                }
                h2 {
                    transition: all 0.5s;
                    position: absolute;
                    top: 65px;
                    left: 47px;
                    font-size: 30px;
                }
                .cap {
                    position: absolute;
                    right: 47px;
                    top: 65px;
                }
                .userCount {
                    position: absolute;
                    top: 130px;
                    left: 47px;
                    input {
                        padding-left: 48px;
                        width: 374px;
                        height: 48px;
                    }
                    img {
                        top: 13px;
                        left: 7px;
                        position: absolute;
                    }
                }
                .password {
                    position: absolute;
                    top: 220px;
                    left: 47px;
                    input {
                        padding-left: 48px;
                        width: 374px;
                        height: 48px;
                    }
                    .lock {
                        top: 12px;
                        left: 7px;
                        position: absolute;
                    }
                    .eye {
                        cursor: pointer;
                        position: absolute;
                        top: 16px;
                        right: 18px;
                    }
                }
                .verifyCode {
                    position: absolute;
                    width: 270px;
                    top: 280px;
                    left: 47px; 
                    overflow: hidden;
                    transition-delay: 0.5s;
                    .main {
                        width: 250px;
                        position: relative;
                        overflow: hidden;
                        .code {
                            border: 1px solid rgb(212, 210, 210);
                            width: 80px;
                            height: 26px;
                        }
                        img {
                            top: 0;
                            left: 160px;
                            position: absolute;
                            // border: 1px solid rgb(212, 210, 210);
                            width: 80px;
                            height: 28px;
                        }
                    }
                }
                .register {
                    position: absolute;
                    font-size: 16px;
                    color: rgb(8, 175, 217);
                    right: 47px;
                    top: 285px;
                    transition: all 0.5s;
                }
                .login {
                    position: absolute;
                    width: 374px;
                    height: 48px;
                    line-height: 10px;
                    top: 322px;
                    left: 47px;
                    font-size: 24px;
                }
                .admin_login {
                    position: absolute;
                    bottom: 40px;
                    right: 47px;
                    span {
                        font-size: 16px;
                        color: #333;
                        margin-right: 38px;
                    }
                    img {
                        top: -8px;
                        right: 0;
                        position: absolute;
                    }
                }
            }
            .verify {
                h2 {
                    top: 35px;
                }
                .cap {
                    top: 35px;
                }
                .userCount {
                    top: 105px;
                }
                .password {
                    top: 185px;
                }
                .register {
                    top: 265px;
                }
            }
            .introduce {
                width: 500px;
                line-height: 20px;
                margin-top: 200px;
                margin-right: 500px;
            }
        }
    }
</style>
