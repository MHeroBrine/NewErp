<template>
    <div class="pagination_groupMember">
        <template v-for="item in memberList[showingList]">
            <v-card-groupMember :id="item.id" :college="item.college" :profession="item.major" :number="item.studentAccount" :contribute="item.contribute" :contribution="item.studentAccount" :deletable="deletable"></v-card-groupMember>
        </template>
        <div class="paginate mg">
            <icon class="back_2" @click="toTopOrBottom(1)"></icon>
            <icon class="back_1" @click="changePage(-1)"></icon>
            <div class="count"> {{ showingList + 1 }} / {{ total }} </div>
            <icon class="forward_1" @click="changePage(1)"></icon>
            <icon class="forward_2" @click="toTopOrBottom(0)"></icon>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import vueEvent from '../../model/VueEvent';

    export default {
        data() {
            return {
                memberList: [],
                deletable: false,

                total: 0,
                showingList: 0
            }
        },
        mounted() {
            this.permission();
            this.getMemberInfo();
            // this.itemList = this.Util.chunk(this.list, 6);
            // this.total = this.itemList.length;
        },
        methods: {
            getMemberInfo() {
                Axios.get(this.URL + '/game/manage/enterprise/member/enterpriseMemberInfos/get?enterpriseId=' + this.$store.state.gameControl.groupWatching)
                    .then((Response) => {
                        if (Response.data.code === 200) {
                            this.memberList = this.Util.chunk(Response.data.data, 6);
                            this.total = this.memberList.length;
                            this.isReady = true;
                        } else {
                            alert('信息获取失败');
                        }
                    })
            },
            permission() {
                if (this.$store.state.user.id == this.$store.state.gameControl.groupWatchingCEOId) {
                    this.deletable = true;
                }
            },

            changePage(num) {
                this.showingList += num;
                if (this.showingList === -1) {
                    this.showingList = 0
                } else if (this.showingList > this.total - 1) {
                    this.showingList -= 1;
                }
            },
            toTopOrBottom(num) {
                if (num === 1) {
                    this.showingList = 0;
                } else if (num === 0) {
                    this.showingList = this.total - 1;
                }
            }
        },
        props: ['list', 'type', 'editable']
    }
</script>

<style lang="scss" scoped>
    .pagination_groupMember {
        width: 1200px;
        .paginate {
            display: flex;
            justify-content: center;
            margin-top: 80px;
            text-align: center;
            .count {
                margin-left: 20px;
                margin-right: 20px;
                width: 50px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                background-color: #fff;
                border: 1px solid #000;
            }
            icon {
                cursor: pointer;
            }
        }
    }
</style>
