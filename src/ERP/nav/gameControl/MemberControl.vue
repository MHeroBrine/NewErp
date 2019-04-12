<template>
    <div id="memberControl">
        <div class="nav">
            <img src="../../../assets/icon/circle.svg" alt=""><a @click="freshList()">刷新</a>
            <router-link to="/joinGame/joinGroup" class="fr">企业名称</router-link>
        </div>
        <div class="content mg">
            <v-pagination-groupMember :list="memberList" editable></v-pagination-groupMember>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                memberList: [
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribute: true,
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    },
                    {
                        college: '经济管理学院',
                        profession: '电子商务',
                        number: '201621000',
                        contribution: '20'
                    }
                ],
            }
        },
        methods: {
        },
        mounted() {
            this.$store.commit('pageState', 'memberControl');
            this.$store.commit('setGameControlTitle', '成员管理');
        }
    }
</script>

<style lang="scss" scoped>
    #memberControl {
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
