<template>
    <div id="memberList">
        <div class="nav">
            <img src="../../../assets/icon/circle.svg" alt=""><a @click="freshList()">刷新</a>&nbsp;&nbsp;
            <img src="../../../assets/icon/plus.svg" alt=""><a @click="addMember()">添加</a>
            <router-link to="/joinGame/joinGroup" class="fr">企业名称</router-link>
        </div>
        <div class="content mg">
            <v-pagination-groupMember></v-pagination-groupMember>
        </div>

        <div v-if="isAddMember" class="addMember">
            <div class="contexts mg">
                <div class="area_1">
                    <h3>添加成员</h3>
                </div>
                <div class="area_2">
                    <v-input1 title="学号"></v-input1>
                    <v-input1 title="姓名"></v-input1>

                    <v-button1 value="确认" type="primary" @click.native="confirm()"></v-button1>
                    <v-button1 value="返回" type="primary" @click.native="addMember()"></v-button1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            addMember() {
                this.$store.commit('controlFloatWindow');
                this.isAddMember = !this.isAddMember;
            },
            confirm() {
                this.$store.commit('controlFloatWindow');
                alert('添加成功');
                this.isAddMember = !this.isAddMember;
            }
        },
        mounted() {
            this.$store.commit('pageState', 'memberList');
            this.$store.commit('setGameControlTitle', '成员信息');
        }
    }
</script>

<style lang="scss" scoped>
    #memberList {
        width: 100%;
        .nav {
            width: 100%;
            min-width: 1200px;
            height: 70px;
            border-bottom: 1px solid #000;
            padding-top: 15px;
            padding-left: 10px;
            img {
                width: 30px;
            }
            .input_search {
                margin: 5px 10px 0 0;
            }
        }
        .content {
            margin-top: 50px;
            width: 1200px;
        }
        .addMember {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 100;
            .contexts {
                width: 800px;
                height: 400px;
                background-color: #fff;
                border-radius: 20px;
                margin-top: 200px;
                text-align: center;
                .area_1 {
                    width: 100%;
                    height: 80px;
                    line-height: 80px;
                    border-bottom: 1px solid #000;
                    h3 {
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
                .area_2 {
                    .v-input {
                        margin-top: 30px;
                    }
                    .button_1 {
                        margin-top: 40px;
                    }
                }
            } 
        }
    }
</style>
