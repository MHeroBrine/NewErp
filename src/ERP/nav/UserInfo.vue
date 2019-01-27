<template>
    <div id="userInfo" class="mg">
        <div class="form">
            <h3>个人信息</h3>
            <v-input1 title="学号"></v-input1>
            <template v-for="item in list_1">
                <v-select :title="item.title" :option="item.option"></v-select>
            </template>
            <template v-for="item in list_2">
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
            
            <div style="margin-top: 20px;"><span>性别</span><input type="radio" name="sex">男<input type="radio" name="sex">女</div>

            <v-button1 value="确认" type="primary" width="180px"></v-button1><v-button1 value="返回" type="primary" width="180px"></v-button1>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list_1: [
                    {
                        title: '学院',
                        option: ['通信学院', '通信学院', '通信学院']
                    },
                    {
                        title: '专业',
                        option: ['信息管理与信息系统', '信息管理与信息系统']
                    }
                ],
                list_2: [
                    {
                        title: '班级',
                        value: ''
                    },
                    {
                        title: '手机',
                        value: ''
                    },
                    {
                        title: '邮箱',
                        value: ''
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    #userInfo {
        display: flex;
        justify-content: center;
        width: 1200px;
        .form {
            text-align: center;
            width: 1000px;
            height: 600px;
            background-color: #fff;
            border: 1px solid #000;
            margin-top: 100px;
            h3 {
                font-weight: bold;
                font-size: 25px;
                margin-top: 20px;
                margin-bottom: 50px;
            }
            .select {
                margin-top: 20px;
            }
            .v-input {
                margin-top: 20px;
            }
            .button_1 {
                margin: 30px;
                display: inline-block;
            }
        }
    }
</style>
