<template>
    <div class="pagination_group">
        <template v-for="item in groupList[showingList]">
            <v-card-group :data="item"></v-card-group>
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
                groupList: [],
                total: 0,
                showingList: 0
            }
        },
        mounted() {
            this.getGroupInfo();

            // 监听小组信息
            let that = this;
            vueEvent.$on('refreshGroupList', function() {
                that.getGroupInfo();
            });
        },
        methods: {
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
            },
            getGroupInfo() {
                Axios.get(this.URL + '/game/manage/enterprise/enterpriseInfos/get?gameId=' + this.$store.state.gameControl.gameWatching)
                    .then((Response) => {
                        console.log(Response);
                        if (Response.data.code === 200) {
                            this.groupList = this.F.chunk(Response.data.data, 6);
                            this.total = this.groupList.length;
                            console.log(this.groupList);
                            this.isReady = true;
                        } else {
                            alert('信息获取失败');
                        }
                    })
            }
        },
        props: ['list', 'type']
    }
</script>

<style lang="scss" scoped>
    .pagination_group {
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
