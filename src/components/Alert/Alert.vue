<template>
    <div class="alert">
        <div class="container mg">
            <div class="title">
                <h3>{{ title }}</h3>
            </div>
            <div class="content" v-if="content">
                {{ content }}
            </div>
            <div class="form">
                <template v-for="item in data">
                    <v-input1 :title="item.title" v-model="item.value"></v-input1>
                </template>
            </div>
            <div class="button" v-if="method">
                <v-button1 type="primary" value="确认" width="140px" @click.native="method()"></v-button1>
                <v-button1 type="primary" value="返回" width="140px" @click.native="cancel()"></v-button1>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        beforeDestroy() {
            for (let item in this.data) {
                this.data[item].value = null;
            }
        },
        watch: {
            method: function(val) {
                console.log(val);
                if (val === null) {
                    setTimeout(() => {
                        this.cancel();
                    }, 1500);
                }
            }
        },
        methods: {
            cancel() {
                this.$store.commit('controlAlert', [false]);
            }
        },
        props: ['title', 'data', 'method', 'content']
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
            width: 600px;
            height: 300px;
            background-color: #fff;
            border-radius: 20px;
            border: 1px solid #000;
            .title {
                text-align: center;
                width: 100%;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #000;
                h3 {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
            .form {
                text-align: center;
                .v-input {
                    margin: 25px;
                }
            }
            .button {
                text-align: center;
            }
        }
    }
</style>
