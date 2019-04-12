<template>
    <div class="card_groupMember">
        <div class="fl area_1">
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
        </div>
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
        mounted() {
            // console.log(this.id);
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
                        console.log(Response);
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
        display: inline-block;
        width: 350px;
        height: 250px;
        margin: 20px;
        .area_1 {
            height: 200px;
            text-align: center;
            border: 1px solid #000;
            border-right: 0;
            width: 125px;
            line-height: 200px;
            img {
                width: 60px;
            }
        }
        .area_2 {
            position: relative;
            height: 200px;
            text-align: center;
            border: 1px solid #000;
            width: 225px;
            padding-top: 40px;
            span {
                display: block;
                margin: 15px;
                input {
                    width: 30px;
                }
            }
            img {
                position: absolute;
                cursor: pointer;
                width: 30px;
                right: 0;
                bottom: 0;
            }
            .button_1 {
                position: absolute;
                top: 190px;
                left: 0px;
            }
        }
    }
</style>
