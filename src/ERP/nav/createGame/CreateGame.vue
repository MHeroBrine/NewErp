<template>
    <div id="createGame">
        <div class="nav">
            <img src="../../../../src/assets/icon/circle.svg" alt=""><a @click="freshList()">刷新</a>&nbsp;&nbsp;
            <img src="../../../../src/assets/icon/plus.svg" alt=""><a @click="createGame()">新建</a>
        </div>
        <div class="content mg">
            <!-- 游戏分页组件 类型为创建游戏 -->
            <v-pagination-game type="createGame"></v-pagination-game>
        </div>
    </div>
</template>

<script>
    /*
        进入页面  ->  新建比赛
                  ->  已有比赛  ->  进入比赛  ->  新建企业
                                              ->  已有企业  ->  (非小组成员)成员信息，加入企业
                                                            ->  (小组成员)成员信息，退出
                                                                                                （成员信息）-> 成员信息卡（不可删除）
                                                            ->  (组长)成员管理，删除 ✔
                                                                                                （成员管理）-> 成员信息卡（可删除）
                                ->  开始
                                ->  删除
    */

    import Axios from 'axios'
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {
                // alert输入框
                data: [
                    {
                        title: '比赛名称',
                        value: ''
                    },
                    {
                        title: '企业数量',
                        value: ''
                    }
                ],

                gameName: null,
                maxEnterpriseNumber: null
            }
        },
        mounted() {
            this.$store.commit('pageState', 'createGame');
            this.$store.commit('setGameControlTitle', '创建比赛');
        },
        methods: {
            createGame() {
                this.$store.commit('controlAlert', [true, '新建比赛', null, this.data, () => {
                    Axios.post(this.URL + '/game/manage/create', {
                        "creatorId": this.$store.state.user.id,
                        "gameName": this.data[0].value,
                        "maxEnterpriseNumber": this.data[1].value
                    }).then((Response) => {
                        if (Response.data.code === 200) {
                            alert('新建比赛成功');
                            this.$store.commit('controlAlert', [false]);
                            this.freshList();
                        } else {
                            alert('新建失败，请重试');
                        }
                    })
                }])
            },
            freshList() {
                // 调用分页组件函数 获取游戏信息
                vueEvent.$emit('refreshGameList');
            },
        }
    }
</script>

<style lang="scss" scoped>
    #createGame {
        width: 100%;
        .nav {
            width: 100%;
            height: 70px;
            line-height: 70px;
            border-bottom: 1px solid #000;
            padding-top: 15px;
            padding-left: 10px;
            img {
                width: 30px;
            }
            .createGame {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
                .create {
                    width: 800px;
                    height: 500px;
                    margin-top: 200px;
                    background-color: #fff;
                    border-radius: 20px;
                    border: 1px solid #000;
                    .area_1 {
                        width: 100%;
                        height: 70px;
                        line-height: 70px;
                        border-bottom: 1px solid #000;
                        text-align: center;
                        h3 {
                            font-size: 22px;
                            font-weight: bold;
                        }
                    }
                    .area_2 {
                        width: 100%;
                        height: 430px;
                        // line-height: 430px;
                        text-align: center;
                        .v-input {
                            &:nth-of-type(1) {
                                margin-top: 40px;
                            }
                        }
                    }
                }
            }
        }
        .content {
            margin-top: 50px;
            width: 1200px;
        }
    }
</style>
