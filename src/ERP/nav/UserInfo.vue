<template>
    <div id="userInfo" class="mg center">
        <div class="form" v-if="!isChange">
            <h3 @click="test()">个人信息</h3>
            <a>学号：{{ this.$store.state.user.studentAccount }}</a>
            <a>学院：{{ this.$store.state.user.majorInfo_college_college }}</a>
            <a>专业：{{ this.$store.state.user.majorInfo_major }}</a>
            <a>班级：{{ this.$store.state.user.studentClass }}</a>
            <v-button1 value="编辑资料" type="primary" @click.native="isChange = true" width="180px"></v-button1>
        </div>
        <div class="form" v-if="isChange">
            <h3>个人信息</h3>
            <v-input1 title="学号" type="password" :value="this.$store.state.user.studentAccount" disabled></v-input1>
            
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
            
            <div style="margin-top: 20px;"><span>性别</span><input type="radio" name="sex" value="Man" v-model="picked">男<input type="radio" name="sex" value="Woman" v-model="picked">女</div>

            <v-button1 value="确认" type="primary" width="180px" @click.native="changeUserInfo()"></v-button1>
            <v-button1 value="取消" type="primary" width="180px" @click.native="isChange = false"></v-button1>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 控制 浏览/修改信息
                isChange: false,
                // 性别选择项
                picked: this.$store.state.user.gender,

                collegeNow: 1,
                majorNow: 1,

                collegeList: [],
                list_2: [
                    {
                        title: '班级',
                        value: this.$store.state.user.studentClass
                    },
                    {
                        title: '手机',
                        value: this.$store.state.user.phone
                    },
                    {
                        title: '邮箱',
                        value: this.$store.state.user.email
                    }
                ]
            }
        },
        mounted() {
            this.$store.commit('pageState', 'navInfo');
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
            changeUserInfo() {
                let data = {
                    "email": this.list_2[2].value,
                    "gender": this.picked,
                    "id": this.$store.state.user.id,
                    "majorInfoId": this.majorNow,
                    "phone": this.list_2[1].value,
                    "studentClass": this.list_2[0].value,
                    "userAvatarInfoId": 1
                }
                Axios.post(this.URL + '/user/student/basicInfo/update', data)
                    .then((Response) => {
                        if (Response.data.code === 200) {
                            this.$store.commit('controlAlert', [true, '信息修改成功']);
                            setTimeout(() => {
                               this.$store.commit('exit');
                            }, 2500);
                        } else {
                            this.$store.commit('controlAlert', [true, '信息修改失败']);
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #userInfo {
        .form {
            text-align: center;
            width: 1000px;
            height: 600px;
            background-color: #fff;
            border: 1px solid #000;
            margin-top: 100px;
            .select {
                line-height: 50px;
                select {
                    width: 200px;
                }
            }
            a {
                cursor: default;
                display: block;
                line-height: 70px;
            }
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
