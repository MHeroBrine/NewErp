<template>
    <div id="register" class="mg center">
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

            <div class="select">
                学院 <select v-model="collegeNow">
                    <template v-for="item in collegeList">
                        <option :value="item.id">{{ item.college }}</option>
                    </template>
                </select>
                <div></div>
                专业 <select v-model="majorNow">
                    <template v-for="item in majorList">
                        <option :value="item.id">{{ item.major }}</option>
                    </template>
                </select>
            </div>

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

            <span><input type="checkbox" v-model="readed">我已阅读相关<a href="#" @click="showItem()">服务条款</a></span>

            <v-button1 value="确认" type="primary" width="250px" @click.native="register()"></v-button1>
        </div>
    </div>    
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 相关条例
                readed: 0,

                // 当前学院，控制当前专业
                collegeNow: 1,
                majorNow: 1,

                // 输入框
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
        },
        mounted() {
            this.$store.commit('pageState', 'register');

            // 获取学院信息
            this.collegeList = this.$store.state.college.data;
            this.setMajorInfo(this.collegeNow);
        },
        watch: {
            // 监听学院变化，通知专业改变
            collegeNow: function(val) {
                this.setMajorInfo(val);
            }
        },
        methods: {
            // 打开阅读条款
            showItem() {
                this.$store.commit('controlFloatWindow');
            },
            // 根据学院设置专业
            setMajorInfo(val) {
                for (let item in this.collegeList) {
                    if (this.collegeList[item].id === val) {
                        this.majorList = this.collegeList[item].major;
                        this.majorNow = this.majorList[0].id;
                    }
                }
            },
            // 注册
            register() {
                if (this.readed == true) {
                    let arr = this.list_1.concat(this.list_3);
                    let data = {  
                        "majorInfoId": this.majorNow,
                        "rePassword": arr[4].value,
                        "studentAccount": arr[0].value,
                        "studentClass": arr[2].value,
                        "studentName": arr[1].value,
                        "studentPassword": arr[3].value
                    }
                    console.log(data);
                    Axios.post(this.URL + '/user/student/register', data)
                        .then((Response) => {
                            console.log(Response);
                            if (Response.data.code === 200) {
                                alert('注册成功，请耐心等待老师审核');
                            } else {
                                alert('输入信息有误，请检查后重试');
                            }
                        })
                } else {
                    alert('请先阅读服务条款');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #register {
        margin-top: 50px;
        .form {
            width: 600px;
            height: 600px;
            background-color: #fff;
            border-radius: 20px;
            border: 1px solid #000;
            text-align: center;
            .select {
                line-height: 50px;
                select {
                    width: 200px;
                }
            }
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
