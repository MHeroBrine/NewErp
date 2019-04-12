<template>
    <div class="header_gameControl">
        <div>
            <img src="../../assets/logo.png" alt="">
            <h1>{{ this.$store.state.gameControl.pageTitle }}</h1>
        </div>
        <div>
            <img src="../../assets/icon/home.svg" alt="" @click="linkTo('/nav')">
            <img src="../../assets/icon/back.svg" alt="" @click="go(-1)">
            <img src="../../assets/icon/user.svg" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            go(num) {
                this.$router.go(num);
            },
            linkTo(address) {
                this.$router.push(address);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header_gameControl {
        display: flex;
        justify-content: space-between;
        height: 70px;
        line-height: 70px;
        min-width: 1000px;
        padding: 10px;
        background-color: #666;
        div {
            display: flex;
            a {
                font-weight: bold;
            }
        }
        img {
            width: 50px;
            height: 50px;
            cursor: pointer;
            &:nth-of-type(1) {
                margin-right: 10px;
            }
        }
    }
</style>
