<template>
    <div id="register" class="mg">
        <div class="form">
            <h2>注册</h2>
            <template v-for="item in list_1">
                <v-input1
                    :title="item.title"
                    v-model="item.value"
                    :type="item.type"
                    :RegExp="item.RegExp"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder"
                    :eye="item.eye"
                />
            </template>

            <template v-for="item in list_2">
                <v-select :title="item.title" :option="item.option"></v-select>
            </template>

            <template v-for="item in list_3">
                <v-input1
                    :title="item.title"
                    v-model="item.value"
                    :type="item.type"
                    :RegExp="item.RegExp"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder"
                    :eye="item.eye"
                />
            </template>

            <span><input type="checkbox">我已阅读相关<a href="#">服务条款</a></span>

            <v-button1 value="确认" type="primary" width="250px"></v-button1>
        </div>
    </div>    
</template>

<script>
    export default {
        data() {
            return {
                list_1: [
                    {
                        title: '学号',
                        value: ''
                    },
                    {
                        title: '姓名',
                        value: ''
                    }
                ],
                list_2: [
                    {
                        title: '学院',
                        option: ['通信学院', '通信学院', '通信学院']
                    },
                    {
                        title: '专业',
                        option: ['信息管理与信息系统', '信息管理与信息系统']
                    }
                ],
                list_3: [
                    {
                        title: '班级',
                        value: ''
                    },
                    {
                        title: '密码',
                        value: '',
                        type: 'password',
                    },
                    {
                        title: '确认密码',
                        value: '',
                        type: 'password',
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    #register {
        width: 1400px;
        display: flex;
        justify-content: center;
        margin-top: 50px;
        .form {
            width: 600px;
            height: 600px;
            background-color: #fff;
            border-radius: 20px;
            border: 1px solid #000;
            text-align: center;
            h2 {
                font-size: 24px;
                font-weight: bold;
                margin-top: 20px;
            }
            .v-input {
                margin: 10px;
                margin-top: 20px;
                &:nth-of-type(1) {
                    margin-top: 40px;
                }
            }
            .select {
                margin: 10px;
                margin-top: 20px;
            }
            span {
                display: block;
                margin-top: 40px;
                font-size: 14px;
                a {
                    color: #409EFF;
                }
            }
            .button_1 {
                margin-top: 50px;
            }
        }   
    }
</style>
