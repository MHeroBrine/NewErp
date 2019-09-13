<template>
    <div class="alert">
        <div class="container mg">
            <div class="img">
                <img src="@/assets/NewIcon/info-circle.svg" class="info" v-show="icon == 'WARN'">
                <img src="@/assets/NewIcon/info-circle.svg" class="info" v-show="icon == 'WARN_DELETE'">
                <img src="@/assets/NewIcon/close-circle.svg" class="info" v-show="icon == 'FALSE'">
                <img src="@/assets/NewIcon/check-circle.svg" class="info" v-show="icon == 'TRUE'">
            </div>
            <div class="title">
                <h3>{{ title }}</h3>
            </div>
            <div class="content" v-if="content">
                {{ content }}
            </div>
            <div class="form">
                <div v-for="item in data" class="item">
                    <input :placeholder="item.title" type="text" v-model="item.value" v-if="icon != 'WARN_DELETE'">
                    <input :placeholder="item.title" type="password" v-model="item.value" v-if="icon == 'WARN_DELETE'">
                </div>
            </div>
            <div class="button" v-if="method">
                <button @click="method()">确认</button>
                <button @click="cancel()">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        beforeMount() {
            for (let item in this.data) {
                this.data[item].value = null;
            }
        },
        beforeDestroy() {
            for (let item in this.data) {
                this.data[item].value = null;
            }
        },
        mounted() {
            // console.log(this.data);
            console.log(this.icon);
        },
        watch: {
            // 监听alert，无方法弹窗定时关闭（针对比赛管理页面）（可废弃）
            method: function(val) {
                console.log('receive: ' + val);
                if (val === null) {
                    setTimeout(() => {
                        this.cancel();
                    }, 1000);
                }
            }
        },
        methods: {
            cancel() {
                this.$store.commit('controlAlert', [false]);
            }
        },
        props: ['title', 'data', 'method', 'content', 'icon']
    }
</script>

<style lang="scss" scoped>
    .alert {
        display: flex;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        .container {
            position: relative;
            width: 550px;
            min-height: 350px;
            padding-bottom: 40px;
            // background-color: #fff;
            background-color: #EEEFF3;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 5px #666;
            .img {
                text-align: center;
                width: 100%;
                height: 110px;
                line-height: 150px;
                h3 {
                    font-size: 20px;
                    font-weight: bold;
                }
                .info {
                    margin-top: 20px;
                    width: 70px;
                }
            }
            .title {
                width: 100%;
                text-align: center;
                font-size: 22px;
                color: #666;
            }
            .form {
                padding-bottom: 20px;
                text-align: center;
                .v-input {
                    margin: 25px;
                }
                .item {
                    display: flex;
                    // height: 50px;
                    line-height: 30px;
                    justify-content: center;
                    input {
                        border: 0;
                        padding: 10px;
                        width: 300px;
                        height: 20px;
                        margin: 0px;
                        margin-top: 30px;
                        box-shadow: 0 0 10px 2px rgb(202, 202, 202);
                    }
                    // &:nth-of-type(2) {
                    //     span {
                    //         height: 40px;
                    //         line-height: 40px;
                    //     }
                    //     input {
                    //         margin-top: 10px;
                    //     }
                    // }
                }
            }
            .button {
                position: absolute;
                right: 20px;
                bottom: 20px;
                button {
                    cursor: pointer;
                    width: 50px;
                    font-size: 14px;
                    color: #666;
                    border: 0;
                    outline: none;
                    // background-color: #fff;
                    background-color: #EEEFF3;
                    &:hover {
                        color: #000;
                    }
                }
            }
        }
    }
</style>
