<template>
    <div class="pagination_group" v-if="isReady">
        <template v-for="item in groupList[page - 1]">
            <v-card-group :data="item"></v-card-group>
        </template>
        <div class="paginate mg">
            <template v-for="i in total">
                <button v-bind:class="{ active: i == page }" @click="page = i">{{ i }}</button>
            </template>
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
                page: 1,
                total: 0,
                showingList: 0,
                isReady: false
            }
        },
        mounted() {
            this.getGroupInfo();

            // 监听小组信息
            let that = this;
            vueEvent.$on('refreshGroupList', function() {
                that.getGroupInfo();
                that.isReady = false;
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
                        if (Response.data.code === 200) {
                            this.groupList = this.F.chunk(Response.data.data, 6);
                            this.total = this.groupList.length;
                            this.isReady = true;
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            }
        },
        props: ['list', 'type']
    }
</script>

<style lang="scss" scoped>
    .pagination_group {
        position: relative;
        width: 1800px;
        min-height: 715px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        .paginate {
            position: absolute;
            bottom: -60px;
            left: 40px;
            button {
                cursor: pointer;
                width: 34px;
                height: 34px;
                background-color: rgb(143, 143, 226);
                border: 0;
                outline: none;  
                color: #fff;
                &:nth-of-type(1) {
                    border-radius: 5px 0 0 5px;
                }
                &:nth-last-of-type(1) {
                    border-radius: 0 5px 5px 0;
                }
            }
            .active {
                background-color: rgb(88, 88, 226);
            }
        }
    }
</style>
