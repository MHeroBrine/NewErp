<template>
    <div class="nav_user">
        <div class="profile">
            <div class="changeProfile">更换头像</div>
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
        <div class="setProfile">
            <div class="profileSelect">

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
    }
</style>
