<template>
    <div id="register" class="mg center">
        <div class="form">
            <h2>注册</h2>
            <!-- <button @click="register_test()">一键注册</button> -->
            <!-- <button @click="register_test_2()">一键注册2</button> -->

            <div class="account">
                <input class="v-input" placeholder="学号" v-model="studentAccount">
                <i class="true" v-show="!isRegister && isInputOver"></i>
                <i class="false" v-show="isRegister && isInputOver"></i>
            </div>
            <div class="item">
                <select v-model="collegeNow">
                    <option value="0" selected disabled style="display: none;">学院</option>
                    <template v-for="item in collegeList">
                        <option :value="item.id">{{ item.college }}</option>
                    </template>
                </select>
                <select v-model="majorNow">
                     <option value="0" selected disabled style="display: none;">专业</option>
                    <template v-for="item in majorList">
                        <option :value="item.id">{{ item.major }}</option>
                    </template>
                </select>
            </div>
            <div v-for="item in data" class="item">
                <input :type="item.type" class="v-input" :placeholder="item.title" v-model="item.data">
                <i v-if="(item.check && Reg(item.data, item.RegExp)) == true" class="true"></i>
                <i v-if="(item.check && Reg(item.data, item.RegExp)) == false" class="false"></i>
            </div>
            <div class="radio">
                <input type="checkbox" class="v-radio" v-model="readed">&nbsp;<p>我已阅读相关<a>《服务条款》</a></p>
            </div>
            <button class="v-button b-primary" @click="register()">确定</button>
            
            <router-link to="/login" class="returnLogin">返回登录</router-link>
        </div>
    </div>    
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                data: [
                    { title: '姓名', data: null },
                    { title: '班级', data: null },
                    // { title: '邮箱', data: null },
                    { title: '联系方式', data: null, check: true, RegExp: 'phone' },
                    { title: '密码（长度6-18位）', data: null, check: true, RegExp: /^[\w_-]{6,16}$/, type: 'password' },
                    { title: '确认密码', data: null, check: true, RegExp: 'rePassword', type: 'password' },
                ],
                // 学生账号
                studentAccount: null,
                // 是否被注册
                isRegister: null,
                // 是否已输入完毕（指注册）
                isInputOver: false,
                // 密码（用于校验）
                passwordNow: null,
                // 相关条例
                readed: 0,

                // 当前学院，控制当前专业
                collegeNow: 0,
                majorNow: 0,
                collegeList: [],
                majorList: []
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
            },
            // 监听学号输入情况，返回是否被注册
            studentAccount: function(val) {
                this.checkRegister(val);
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
            // 密码正则校验
            Reg(val, Reg) {
                if (Reg === 'rePassword' && val) {
                    return val === this.passwordNow;
                }

                if (Reg === 'phone' && val) {
                    return /^[1]([3-9])[0-9]{9}$/.test(val);
                }

                // 为空
                if (val == null) {
                    return null;
                }

                // 未超过6位
                if (val.length < 6) {
                    return null;
                }

                if (Reg.test(val)) {
                    this.passwordNow = val;
                    return true;
                }
                return false;
            },
            // 账号是否重复
            checkRegister(val) {
                if (val.length != 10) {
                    this.isInputOver = false;
                } else if (val.length == 10 && /^[0-9]{10}$/.test(val)) {
                    this.isInputOver = true;
                    Axios.get(this.URL + '/user/student/basicInfo/exist?userAccount=' + val)
                        .then(Response => {
                            console.log(Response);
                            if (Response.data.code === 204) {
                                this.isRegister = true;
                            } else {
                                this.isRegister = false;
                            }
                        })
                }
            },
            // 注册
            register() {
                if (this.readed == true) {
                    if (this.majorNow != 0) {
                        let data = {  
                            "majorInfoId": this.majorNow,
                            "rePassword": this.data[4].data,
                            "studentAccount": this.studentAccount,
                            "studentClass": this.data[1].data,
                            "studentName": this.data[0].data,
                            "studentPassword": this.data[3].data,
                            "phone": this.data[2].data
                        }
                        Axios.post(this.URL + '/user/student/register', data)
                            .then((Response) => {
                                if (Response.data.code === 200) {
                                    alert('注册成功，请耐心等待老师审核');
                                    this.$router.push('/login');
                                } else {
                                    alert('输入信息有误，请检查后重试');
                                }
                            })
                    } else {
                        alert('请先阅读服务条款');
                    }
                }
            },
            // 注册测试
            register_test() {
                let data = {  
                    "majorInfoId": 1,
                    "rePassword": '123456',
                    "studentAccount": '2017211003',
                    "studentClass": '03011702',
                    "studentName": '王昊岩',
                    "studentPassword": '123456',
                    "phone": '1375971109'
                }
                Axios.post(this.URL + '/user/student/register', data)
                    .then((Response) => {
                        if (Response.data.code === 200) {
                            alert('注册成功，请耐心等待老师审核');
                            this.$router.push('/login');
                        } else {
                            alert('输入信息有误，请检查后重试');
                        }
                    })
            },
            // 注册测试
            register_test_2() {
                let data = {  
                    "majorInfoId": 1,
                    "rePassword": '123456',
                    "studentAccount": '2017210988',
                    "studentClass": '03011702',
                    "studentName": '袁乙文',
                    "studentPassword": '123456',
                    "phone": '1375971109'
                }
                Axios.post(this.URL + '/user/student/register', data)
                    .then((Response) => {
                        if (Response.data.code === 200) {
                            alert('注册成功，请耐心等待老师审核');
                            this.$router.push('/login');
                        } else {
                            alert('输入信息有误，请检查后重试');
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #register {
        width: 100%;
        background: url('../assets/Register/background_shallow.png');
        .form {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 600px;
            height: 700px;
            background-color: #fff;
            border-radius: 15px;
            border: 3px solid rgb(222, 222, 222);
            text-align: center;
            margin-top: 110px;
            .select {
                line-height: 50px;
                select {
                    width: 200px;
                }
            }
            h2 {
                font-size: 24px;
                margin-top: 20px;
                color: #46b8ed;
            }
            .account {
                position: relative;
                margin-top: 16px;
                .v-input {
                    position: relative;
                    width: 325px;
                    height: 40px;
                    padding-left: 8px;
                    font-size: 14px;
                    &::-webkit-input-placeholder {
                        color: #666;
                    }
                }
                .true {
                    position: absolute;
                    right: -27px;
                    top: 10px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-color: #43B14D;
                    &::before {
                        position: absolute;
                        content: url('../assets/Register/true.svg');
                        top: 1px;
                        left: 3px;
                    }
                }
                .false {
                    position: absolute;
                    right: -27px;
                    top: 10px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-color: #FE3824;
                    &::before {
                        position: absolute;
                        content: url('../assets/Register/false.svg');
                        transform: scale(0.8);
                        top: 2px;
                        left: 2.5px;
                    }
                }
            }
            .item {
                position: relative;
                margin-top: 24px;
                select {
                    cursor: pointer;
                    outline: none;
                    box-sizing: border-box;
                    font-size: 16px;
                    border: 1px solid #c5c5c5;
                    &:focus {
                        border: 1px solid rgb(70, 184, 237);
                    }
                    position: relative;
                    width: 325px;
                    height: 40px;
                    padding-left: 4px;
                    font-size: 14px;
                    color: #666;
                    &:nth-of-type(2) {
                        margin-top: 24px;
                    }
                }
                .v-input {
                    position: relative;
                    width: 325px;
                    height: 40px;
                    padding-left: 8px;
                    font-size: 14px;
                    &::-webkit-input-placeholder {
                        color: #666;
                    }
                }
                .true {
                    position: absolute;
                    right: -27px;
                    top: 10px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-color: #43B14D;
                    &::before {
                        position: absolute;
                        content: url('../assets/Register/true.svg');
                        top: 1px;
                        left: 3px;
                    }
                }
                .false {
                    position: absolute;
                    right: -27px;
                    top: 10px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-color: #FE3824;
                    &::before {
                        position: absolute;
                        content: url('../assets/Register/false.svg');
                        transform: scale(0.8);
                        top: 2px;
                        left: 2.5px;
                    }
                }
            }
            .radio {
                position: relative;
                width: 330px;
                height: 30px;
                margin-top: 15px;
                text-align: left;
                font-size: 14px;
                .v-radio {
                    position: absolute;
                    top: 1px;
                }
                p {
                    left: 28px;
                    top: 5px;
                    position: absolute;
                }
            }
            button {
                width: 312px;
                height: 38px;
                margin-top: 8px;
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
            .returnLogin {
                position: absolute;
                bottom: 15px;
                right: 15px;
                font-size: 14px;
                color: #46b8ed;
            }
        }   
    }
</style>
