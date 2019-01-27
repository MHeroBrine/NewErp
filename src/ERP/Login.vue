<template>
    <div id="Login" class="mg">
        <div class="form">
            <v-input1 placeholder="用户名" width="280"></v-input1>
            <v-input1 placeholder="密码" width="280" eye="true" type="password"></v-input1>
            <span class="fl">验证码：<input type="text"></span>
            <a class="fr">新用户注册</a>
            <v-button1 type="primary" value="登录" width="280px" height="30px"></v-button1>
        </div>
        <div class="introduce">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    #Login {
        width: 1400px;
        display: flex;
        flex-direction: row-reverse;
        .form {
            margin-top: 200px;
            text-align: center;
            width: 330px;
            height: 250px;
            background-color: #fff;
            border-radius: 10px;
            border: 1px solid #000;
            .v-input {
                margin: 10px;
                &:nth-of-type(1) {
                    margin-top: 30px;
                }
            }
            a {
                font-size: 14px;
                color: #409EFF;
                margin-right: 25px;
            }
            span {
                // clear: both;
                font-size: 14px;
                margin-left: 20px;
                input {
                    width: 60px;
                }
            }
            .button_1 {
                clear: both;
                margin-top: 40px;
            }
        }
        .introduce {
            width: 500px;
            line-height: 20px;
            margin-top: 200px;
            margin-right: 500px;
        }
    }
</style>
