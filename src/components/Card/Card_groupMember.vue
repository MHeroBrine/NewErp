<template>
    <div class="card_groupMember">
        <div class="profile">
            <img src="@/assets/Nav/GameControl/profile.svg" alt="">
        </div>
        <div class="main">
            <h1 class="name">学生一</h1>
            <p>组员&nbsp;&nbsp; / &nbsp;&nbsp;2017211003</p>
            <img class="delete" src="@/assets/Nav/GameControl/false.svg">
        </div>
        <!-- <div class="fl area_1">
            <img src="../../assets/logo.png" alt="">
        </div>
        <div class="fr area_2">
            <span>学院：{{ college }}</span>
            <span>专业：{{ profession }}</span>
            <span>学号：{{ number }}</span>
            <div v-if="contribute">
                <span v-if="!isEdit">贡献值：{{ contribution }}</span>
                <span v-if="isEdit">贡献值：<input type="text" v-model="contribution"></span>
                <img src="../../assets/icon/edit.svg" @click="edit">
            </div>
            <v-button1 v-if="isEdit" value="保存" type="primary" @click.native="edit()"></v-button1>
            <v-button1 v-if="deletable" value="删除" type="primary" @click.native="deleteMember()"></v-button1>
        </div> -->
    </div>
</template>

<script>
    import Axios from 'axios'
    import Qs from 'qs'

    export default {
        data() {
            return {
                isEdit: false
            }
        },
        methods: {
            edit() {
                this.isEdit = !this.isEdit;
            },
            deleteMember() {
                this.$store.commit('controlAlert', [true, '是否删除该成员', null, null, () => {
                    Axios.delete(this.URL + '/game/manage/enterprise/member/out', {
                        params: {
                            "userId": this.id,
                            "enterpriseId": this.$store.state.gameControl.groupWatching
                        },
                        paramsSerializer: params => {
                            return Qs.stringify(params, { indices: false })
                        }
                    }).then((Response) => {
                        if (Response.data.code === 204) {
                            this.$store.commit('controlAlert', [true, '删除成功', null, null, null]);
                        } else {
                            this.$store.commit('controlAlert', [true, Response.data.msg, null, null, null]);
                        }
                    })
                }])
            }
        },
        props: ['id', 'profession', 'college', 'number', 'contribution', 'contribute', 'deletable']
    }
</script>

<style lang="scss" scoped>
    .card_groupMember {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 40px;
        width: 370px;
        height: 250px;
        background-color: #404040;
        box-shadow: 0px 0px 10px 2px #404040;
        border-radius: 8px;
        color: #E6E6E6;
        text-align: center;
        // margin-right: 100px;
        .profile {
            position: absolute;
            width: 130px;
            height: 130px;
            // border: 1px solid #000;
            border-radius: 50%;
            left: 120px;
            top: -35px;
            background-color: rgb(212, 212, 212);
            box-shadow: 0px 0px 15px 2px #fff;
            // padding-top: 130px;
            img {
                position: absolute;
                width: 100px;
                left: 15px;
                top: 10px;
            }
        }
        .main {
            letter-spacing: 2px;
            margin-top: 110px;
            font-size: 26px;
            p {
                letter-spacing: 0;
                margin-top: 15px;
                font-size: 12px;
            }
            .delete {
                width: 40px;
                margin-top: 32px;
            }
        }
    }
</style>
