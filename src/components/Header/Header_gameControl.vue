<template>
    <div class="header_gameControl">
        <div class="title">
            <h1 @click="linkTo('/nav')">ERP虚拟运营系统</h1>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            linkTo(address) {
                this.$router.push(address);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header_gameControl {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        min-width: 1000px;
        .title {
            width: 320px;
            h1 {
                cursor: pointer;
                margin-left: 15px;
                font-size: 22px;
            }
            img {
                margin-left: 35px;
                margin-top: 17px;
                width: 206px;
                height: 27px;
            }
        }
    }
</style>
