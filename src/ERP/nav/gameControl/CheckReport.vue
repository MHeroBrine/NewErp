<template>
    <div id="checkReport">
        <div class="container_default">
            <div class="title">
                <h3>实验报告</h3>
            </div>
            <div class="main">
                <div>
                    <p>{{ data }}</p>
                </div>
                <!-- <img src="@/assets/Nav/GameControl/check.svg" alt="提交" title="提交" class="check" @click="confirm()"> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 心得体会
                data: null
            }
        },
        methods: {
            // 获取实验报告
            getReport() {
                Axios.post(this.URL + '/game/manage/enterprise/member/report/check?userId=' + this.$store.state.user.id + '&gameId=' + localStorage.getItem('GAME'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            this.data = Response.data.data;
                        } else {
                            alert(Response.data.msg);
                        }
                    })
            }
        },
        mounted() {
            this.$store.commit('pageState', 'report');
            this.getReport();
        }
    }
</script>

<style lang="scss" scoped>
    #checkReport {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                position: relative;
                margin-top: -60px;
                height: 100%;
                padding: 100px 90px 90px 40px;
                div {
                    resize: none;
                    border: 1px solid #aaa;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    outline: none;
                    padding: 20px;
                    font-size: 16px;
                }
                .check {
                    cursor: pointer;
                    position: absolute;
                    width: 40px;
                    right: 60px;
                    bottom: 60px;
                    opacity: 0.6;
                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
</style>