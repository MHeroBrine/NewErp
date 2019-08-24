<template>
    <div id="report">
        <div class="container_default">
            <div class="title">
                <h3>心得体会</h3>
            </div>
            <div class="main">
                <textarea placeholder="请在此处填写心得体会......（企业经营全部结束后才能填写）" v-model="data"></textarea>
                <img src="@/assets/Nav/GameControl/check.svg" alt="提交" title="提交" class="check" @click="confirm()">
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
            confirm() {
                let i = confirm('是否确认提交报告');
                if (i) {
                    Axios.post(this.URL + '/game/manage/enterprise/member/report/submit?userId=' + this.$store.state.user.id + '&gameId=' + localStorage.getItem('GAME') + '&report=' + this.data)
                        .then(Response => {
                            if (Response.data.code === 200) {
                                alert(Response.data.msg);
                                this.data = null;
                                this.$router.push('/nav');
                            } else {
                                alert(Response.data.msg);
                            }
                        })
                }
            }
        },
        mounted() {
            this.$store.commit('pageState', 'report');
        }
    }
</script>

<style lang="scss" scoped>
    #report {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                position: relative;
                margin-top: -60px;
                height: 100%;
                padding: 100px 90px 90px 40px;
                textarea {
                    resize: none;
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