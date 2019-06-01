<template>
    <div id="createGame">
        <div class="container_default">
            <div class="title">
                <h3>创建比赛</h3>
            </div>
            <div class="main">
                <v-pagination-game type="createGame"></v-pagination-game>
                <img src="@/assets/Nav/GameControl/add.svg" class="add" @click="createGame()">
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" @click="freshList()">
            </div>
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
        },
        methods: {
            createGame() {
                this.$store.commit('controlAlert', [true, 'WARN' ,'新建比赛', null, this.data, () => {
                    Axios.post(this.URL + '/game/manage/create', {
                        "creatorId": this.$store.state.user.id,
                        "gameName": this.data[0].value,
                        "maxEnterpriseNumber": this.data[1].value
                    }).then((Response) => {
                        console.log(Response);
                        if (Response.data.code === 200) {
                            this.$store.commit('controlAlert', [true, 'TRUE', '操作成功', null, null, null]);
                            this.freshList();
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '操作失败', null, null, null]);
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
        position: relative;
        width: 100%;
        .main {
            img {
                cursor: pointer;
                width: 30px;
            }
            .add {
                position: absolute;
                bottom: 30px;
                right: 80px;
            }
            .refresh {
                position: absolute;
                bottom: 30px;
                right: 30px
            }
        }
    }
</style>
