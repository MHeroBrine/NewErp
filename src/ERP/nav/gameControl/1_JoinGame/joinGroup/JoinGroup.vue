<template>
    <div id="joinGroup">
        <div class="container_default">
            <div class="title">
                <h3>加入企业</h3>
            </div>
            <div class="main">
                <v-pagination-group></v-pagination-group>
                <img src="@/assets/Nav/GameControl/back_round.svg" class="back" @click="linkTo('/nav')">
                <img src="@/assets/Nav/GameControl/add.svg" class="add" @click="createGroup()">
                <img src="@/assets/Nav/GameControl/refresh.svg" class="refresh" @click="freshList()">
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import vueEvent from '../../../../../model/VueEvent';

    export default {
        data() {
            return {
                data: [
                    {
                        title: '企业名称',
                        value: ''
                    },
                    {
                        title: '最大成员个数',
                        value: ''
                    }
                ]
            }
        },
        mounted() {
            this.$store.commit('pageState', 'gameControl_joinGame_joinGroup');
        },
        methods: {
            createGroup() {
                this.$store.commit('controlAlert', [true, 'WARN', '新建企业', null, this.data, () => {
                    Axios.post(this.URL + '/game/manage/enterprise/create', {
                        "creatorId": this.$store.state.user.id,
                        "enterpriseName": this.data[0].value,
                        "gameId": localStorage.getItem('GAME'),
                        "maxMemberNumber": this.data[1].value
                    }).then((Response) => {
                        if (Response.data.code === 200) {
                            this.$store.commit('controlAlert', [true, 'TRUE' ,'新建企业成功', null, null, null]);
                            this.freshList();
                        } else {
                            this.$store.commit('controlAlert', [true, 'FALSE', '新建失败，您可能已经加入了一个小组', null, null, null]);
                            this.freshList();
                        }
                    })
                }])
            },
            freshList() {
                vueEvent.$emit('refreshGroupList');
            },
            linkTo(address) {
                history.back();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #joinGroup {
        position: relative;
        width: 100%;
        .container_default {
            max-width: 1850px;
            .main {
                padding-top: 20px;
                img {
                    cursor: pointer;
                    width: 30px;
                }
                .back {
                    width: 34px;
                    position: absolute;
                    bottom: 28px;
                    right: 130px;
                }
                .add {
                    position: absolute;
                    bottom: 30px;
                    right: 80px;
                }
                .refresh {
                    position: absolute;
                    bottom: 30px;
                    right: 30px;
                }
            }
        }
    }
</style>
