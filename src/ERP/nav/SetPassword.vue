<template>
    <div id="setPassword" class="mg center">
        <div class="form">
            <h3>密码设置</h3>
            
            <v-input1 title="请输入原密码"></v-input1>
            <v-input1 title="请输入新密码" v-model="data.oldPassword"></v-input1>
            <v-input1 title="请确认新密码" v-model="data.newPassword"></v-input1>
            
            <v-button1 value="确定" type="primary" width="200px" @click.native="postReset()"></v-button1>
        
        </div>
        <div class="checkPass" v-if="isCheckPass">
            <div class="mg">
                <img src="../../assets/icon/true.svg" alt=""><span>修改成功</span>
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
                isCheckPass: false,
                data: {
                    userAccount: this.$store.state.user.userAccount,
                    oldPassword: '',
                    newPassword: ''
                }
            }
        },
        mounted() {
            this.$store.commit('pageState', 'navInfo');
        },
        methods: {
            postReset() {
                Axios.post(this.URL + '/user/student/password/update', Qs.stringfy(this.data))
                    .then((Response) => {
                        if (Response.data.data.code === 0) {
                            this.$store.commit('controlFloatWindow');
                            this.isCheckPass = true;
                            setTimeout(() => {
                                this.$router.push('/login');
                                this.$store.commit('controlFloatWindow');
                            }, 3000);
                        } else {
                            alert('修改失败，请重试');
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #setPassword {
        .form {
            text-align: center;
            width: 1000px;
            height: 600px;
            background-color: #fff;
            border: 1px solid #000;
            margin-top: 100px;
            h3 {
                margin: 30px 0 30px 0;
            }
            .v-input {
                margin-top: 35px;
            }
            .button_1 {
                margin-top: 50px;
            }
        }
        .checkPass {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            div {
                position: relative;
                width: 400px;
                height: 100px;
                line-height: 100px;
                background-color: #fff;
                border: 1px solid #000;
                border-radius: 20px;
                text-align: center;
                margin-top: 350px;
                img {   
                    width: 30px;
                }
            }
        }
    }
</style>
