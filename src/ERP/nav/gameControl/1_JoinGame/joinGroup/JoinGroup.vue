<template>
    <div id="joinGroup">
        <div class="nav">
            <img src="../../../../../assets/icon/circle.svg" alt=""><a @click="freshList()">刷新</a>&nbsp;&nbsp;
            <img src="../../../../../assets/icon/plus.svg" alt=""><a @click="createGroup()">新建企业</a>
            <router-link class="fr" to="/joinGame">比赛名称</router-link>
        </div>
        <div class="content mg">
            <v-pagination-group></v-pagination-group>
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
                        title: '成员数量',
                        value: ''
                    }
                ],
            }
        },
        mounted() {
            this.$store.commit('pageState', 'gameControl_joinGame_joinGroup');
            this.$store.commit('setGameControlTitle', '加入企业');
        },
        methods: {
            createGroup() {
                this.$store.commit('controlAlert', [true, '新建企业', null, this.data, () => {
                    Axios.post(this.URL + '/game/manage/enterprise/create', {
                        "creatorId": this.$store.state.user.id,
                        "enterpriseName": this.data[0].value,
                        "gameId": localStorage.getItem('GAME'),
                        "maxMemberNumber": this.data[1].value
                    }).then((Response) => {
                        console.log(Response);
                        if (Response.data.code === 200) {
                            alert('新建企业成功');
                            this.$store.commit('controlAlert', [false]);
                            this.freshList();
                        } else {
                            alert('新建失败，请重试');
                        }
                    })
                }])
            },
            freshList() {
                vueEvent.$emit('refreshGroupList');
            }
        }
    }
</script>

<style lang="scss" scoped>
    #joinGroup {
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
    }
</style>
