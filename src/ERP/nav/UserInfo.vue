<template>
    <div id="userInfo">
        <div class="profile">
            <div class="profile_img">
                <div class="img">

                </div>
                <h2>{{ this.$store.state.user.studentName }}</h2>
                <h3>{{ this.$store.state.user.studentAccount }}&nbsp; / &nbsp;{{ this.$store.state.user.studentClass }}</h3>
            </div>
            <ul>
                <li v-bind:class="{ active: page.checkInfo }" @click="page.checkInfo = true; page.changeInfo = false"><img src="@/assets/Nav/UserInfo/info.svg">个人信息</li>
                <li v-bind:class="{ active: page.changeInfo }" @click="page.checkInfo = false; page.changeInfo = true"><img src="@/assets/Nav/UserInfo/edit.svg">修改信息</li>
                <!-- <li v-bind:class="{ active: page.profile }"><img src="@/assets/Nav/UserInfo/profile.svg">修改头像</li> -->
            </ul>
        </div>
        <div class="contents">
            <div class="info" v-show="page.checkInfo">
                <div class="header"></div>
                <div class="main">
                    <h2>个人信息</h2>
                    <ul>
                        <div class="item">
                            <li><span>姓名：</span>{{ this.$store.state.user.studentName }}</li>
                            <li><span>学号：</span>{{ this.$store.state.user.studentAccount }}</li>
                        </div>
                        <div class="item">
                            <li><span>班级：</span>{{ this.$store.state.user.studentClass }}</li>
                            <li><span>性别：</span>{{ this.$store.state.user.gender == 'Man' ? '男' : '女' }}</li>
                        </div>
                        <div class="item">
                            <li><span>学院：</span>{{ this.$store.state.user.majorBasicInfo.major }}</li>
                            <li><span>专业：</span>{{ this.$store.state.user.majorBasicInfo.college.college }}</li>
                        </div>
                        <div class="item">
                            <li><span>Email：</span>{{ this.$store.state.user.email || "" }}</li>
                            <li><span>Phone：</span>{{ this.$store.state.user.phone || "" }}</li>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="changeInfo" v-show="page.changeInfo">
                <div class="header">
                    <h2>修改基本信息</h2>
                </div>
                <div class="main">
                    <!-- <h2>信息修改</h2> -->
                    <ul>
                        <li class="item"><span>姓名</span><input type="text" class="v-input" v-model="data.studentName"></li>
                        <li class="item"><span>学号</span><input type="text" class="v-input" v-model="data.studentAccount"></li>
                        <li class="item"><span>班级</span><input type="text" class="v-input" v-model="data.studentClass"></li>
                        <li class="item"><span>性别</span><select class="v-input" v-model="data.gender">
                            <option value="Man">男</option>
                            <option value="Woman">女</option>    
                        </select></li>
                        <li class="item"><span>学院</span><select class="v-input" v-model="collegeNow">
                            <option value="0" selected disabled style="display: none;">学院</option>
                            <template v-for="item in collegeList">
                                <option :value="item.id">{{ item.college }}</option>
                            </template>
                        </select></li>
                        <li class="item"><span>专业</span><select class="v-input" v-model="majorNow">
                            <option value="0" selected disabled style="display: none;">专业</option>
                            <template v-for="item in majorList">
                                <option :value="item.id">{{ item.major }}</option>
                            </template>
                        </select></li>
                        <li class="item"><span>Email</span><input type="text" class="v-input" v-model="data.email"></li>
                        <li class="item"><span>Phone</span><input type="text" class="v-input" v-model="data.phone"></li>
                    </ul>
                    <button class="v-button b-success" @click="updateInfo()">保存</button>
                    <button class="v-button b-info" @click="getInfo_default()">重置</button>
                </div>
                <div class="changePassword">
                    <div class="header">
                        <h2>修改密码</h2>
                    </div>
                    <div class="main">
                        <ul>
                            <li class="item"><span>旧密码</span><input type="password" class="v-input" v-model="password.old"></li>
                            <li class="item"><span>新密码</span><input type="password" class="v-input" v-model="password.new"></li>
                            <li class="item"><span>重新输入新密码</span><input type="password" class="v-input" v-model="password.reNew"></li>
                        </ul>
                        <button class="v-button b-primary" @click="updatePassword()">修改</button>
                        <button class="v-button b-info" @click="resetPassword()">重置</button>
                    </div>
                </div>
                <div class="changeProfile">
                    <div class="header">
                        <h2>修改头像</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Qs from 'qs'
    import VueEvent from '../../model/VueEvent'
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 页面显示
                page: {
                    checkInfo: true,
                    changeInfo: false
                },

                // 缓存用户信息数据
                data: [],

                // 专业，学院
                collegeList: [],
                collegeNow: 1,
                majorNow: 1,              

                // 密码项
                password: {
                    old: null,
                    new: null,
                    reNew: null
                }
            }
        },
        mounted() {
            this.getInfo_default();

            this.$store.commit('pageState', 'user');
            this.collegeList = this.$store.state.college.data;

            this.setMajorInfo(this.collegeNow);
        },
        watch: {
            collegeNow: function(val) {
                this.setMajorInfo(val);
            }
        },
        methods: {
            linkTo(address) {
                this.$router.push(address);
            },
            setMajorInfo(val) {
                for (let item in this.collegeList) {
                    if (this.collegeList[item].id === val) {
                        this.majorList = this.collegeList[item].major;
                        this.majorNow = this.majorList[0].id;
                    }
                }
            },
            // 获取修改前信息默认值
            getInfo_default() {
                let { id, studentAccount, studentName, gender, majorBasicInfo, studentClass, email, phone, teacherId, userAvatarInfo } = this.$store.state.user;
                if (!id && !studentAccount) {
                    VueEvent.$on('dataComplete', () => {
                        this.getInfo_default();
                    });
                }
                let data = { id, studentAccount, studentName, gender, majorBasicInfo, studentClass, email, phone, teacherId, userAvatarInfo };
                this.collegeNow = this.$store.state.user.majorBasicInfo.college.id;
                this.majorNow = this.$store.state.user.majorBasicInfo.id;   
                this.data = data;
            },
            // 修改个人信息
            updateInfo() {
                Axios.post(this.URL + '/user/student/basicInfo/update', {
                    email: this.data.email,
                    gender: this.data.gender,
                    id: this.data.id,
                    majorInfoId: this.majorNow,
                    phone: this.data.phone,
                    studentClass: this.data.studentClass,
                }).then(Response => {
                    if (Response.data.code === 200) {
                        this.$store.commit('controlAlert', [true, 'TRUE', '操作成功', null, null, null]);
                        setTimeout(() => {
                            this.$store.commit('controlAlert', [false]);
                            this.$router.push('/nav');
                        }, 1500);
                        this.$store.commit('setUserInfo', [this.URL, this.Cookie.getCookie('userId')]);
                    } else {
                        alert(Response.data.msg);
                    }
                })
            },
            // 重置密码
            resetPassword() {
                for (let item in this.password) {
                    this.password[item] = null;
                }
            },
            // 修改密码
            updatePassword() {
                if (this.password.new === this.password.reNew) {
                    Axios.post(this.URL + '/user/student/password/update', Qs.stringify({
                        userId: this.data.id,
                        oldPassword: this.password.old,
                        newPassword: this.password.new
                    })).then(Response => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, 'TRUE', '操作成功', null, null, null]);
                            setTimeout(() => {
                                this.$store.commit('controlAlert', [false]);
                                this.$router.push('/nav');
                            }, 1500);
                        } else {
                            alert(Response.data.msg);
                        }
                    })
                } else {
                    alert('两次密码不同，请检查输入');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #userInfo {
        display: flex;
        flex-direction: row;
        padding: 20px;
        width: 100%;
        .profile {
            // width: 397px;
            min-width: 300px;
            flex: 0.25;
            height: 421px;
            .profile_img {
                padding-top: 30px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 268px;
                background-color: #FF766C;
                border-radius: 5px 5px 0 0;
                // line-height: 100px;
                h2 {
                    margin-top: 20px;
                    font-size: 22px;
                    color: #fff;
                    // font-weight: lighter;
                }
                h3 {
                    font-size: 12px;
                    color: #fff;
                    margin-top: 8px;
                }
                .img {
                    width: 132px;
                    height: 132px;
                    border: 10px solid #FF9F98;
                    border-radius: 50%;
                }
            }
            ul {
                li {
                    box-sizing: border-box;
                    position: relative;
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    padding-left: 45px;
                    color: rgb(119, 119, 119);
                    font-size: 14px;
                    background-color: #fff;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                    &:hover {
                        background-color: #F8F7F5;
                        &::before {
                            content: "";
                            position: absolute;
                            left: 0;
                            height: 50px;
                            width: 5px;
                            background-color: #FF766C;
                        }
                    }
                    img {
                        top: 17px;
                        left: 14px;
                        position: absolute;
                        width: 17px;
                    }
                }
                .active {
                    background-color: #F8F7F5;
                    &::before {
                        content: "";
                        position: absolute;
                        left: 0;
                        height: 50px;
                        width: 5px;
                        background-color: #FF766C;
                    }
                }
            }
        }
        .contents {
            display: flex;
            flex-direction: column;
            flex: 0.75;
            padding: 30px;
            padding-top: 0;
            .info {
                width: 100%;
                height: 350px;
                .header {
                    width: 100%;
                    min-width: 500px;
                    height: 100px;
                    border-radius: 5px 5px 0 0;
                    background-color: #41CAC0;
                }
                .main {
                    width: 100%;
                    height: 250px;
                    background-color: #fff;
                    padding: 15px;
                    h2 {
                        font-size: 20px;
                        color: #666;
                    }
                    ul {
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                        .item {
                            margin-top: 24px;
                            height: 22px;
                            font-size: 14px;
                            display: flex;
                            flex-direction: row;
                            color: #aaa;
                            li {
                                flex: 0.5;
                                display: flex;
                                flex-direction: row;
                                span {
                                    width: 80px;
                                }
                            }
                        }
                    }
                }
            }
            .changeInfo {
                width: 100%;
                .header {
                    width: 100%;
                    min-width: 500px;
                    height: 70px;
                    border-radius: 5px 5px 0 0;
                    background-color: #41CAC0;
                    line-height: 70px;
                    padding-left: 15px;
                    h2 {
                        color: #fff;
                        font-size: 18px;
                    }
                }
                .main {
                    width: 100%;
                    height: 620px;
                    background-color: #fff;
                    padding: 15px;
                    color: #aaa;
                    h2 {
                        font-size: 20px;
                        color: #666;
                    }
                    ul {
                        display: flex;
                        flex-direction: column;
                        .item {
                            height: 35px;
                            line-height: 30px;
                            display: flex;
                            flex-direction: row;
                            margin-top: 30px;
                            &:nth-of-type(1) {
                                margin-top: 10px;
                            }
                            .v-input {
                                min-width: 300px;
                                flex: 0.4;
                                border-color: rgb(212, 212, 212);
                                height: 35px;
                                border-radius: 5px;
                                box-sizing: border-box;
                                padding-left: 10px;
                                font-size: 14px;
                            }
                            select {
                                cursor: pointer;
                            }
                            span {
                                flex: 0.2;
                                min-width: 150px;
                            }
                        }
                    }
                    button {
                        margin-top: 40px;
                        &:nth-of-type(2) {
                            margin-left: 10px;
                        }
                    }
                }
            }
            .changePassword {
                width: 100%;
                margin-top: 30px;
                height: 323px;
                .header {
                    width: 100%;
                    min-width: 500px;
                    height: 43px;
                    border-radius: 5px 5px 0 0;
                    background-color: #337AB7;
                    line-height: 43px;
                    padding-left: 15px;
                    h2 {
                        color: #fff;
                        font-size: 16px;
                    }
                }
                .main {
                    height: 280px;
                    background-color: #fff;
                    ul {
                        display: flex;
                        flex-direction: column;
                        .item {
                            height: 35px;
                            line-height: 30px;
                            display: flex;
                            flex-direction: row;
                            margin-top: 30px;
                            &:nth-of-type(1) {
                                margin-top: 10px;
                            }
                            .v-input {
                                min-width: 300px;
                                flex: 0.4;
                                border-color: rgb(212, 212, 212);
                                height: 35px;
                                border-radius: 5px;
                            }
                            span {
                                flex: 0.2;
                                min-width: 150px;
                            }
                        }
                    }
                }
            }
            .changeProfile {
                width: 100%;
                margin-top: 30px;
                // height: 323px;
                .header {
                    width: 100%;
                    height: 43px;
                    border-radius: 5px 5px 0 0;
                    background-color: rgb(189, 82, 183);
                    line-height: 43px;
                    padding-left: 15px;
                    h2 {
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>
