<template>
    <div class="header_login mg">
        <div class="title">
            <h1>ERP虚拟运营系统</h1>
        </div>
        <div class="version">
            <a href="#">English</a> &nbsp;<span>|</span>&nbsp; <a href="#">中文版</a>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    .header_login {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 55px;
        min-width: 1000px;
        .title {
            width: 320px;
            h1 {
                margin-left: 35px;
                font-size: 26px;
                font-weight: bold;
            }
            img {
                margin-left: 35px;
                margin-top: 17px;
                width: 206px;
                height: 27px;
            }
        }
        .version {
            margin-right: 37px;
            font-size: 16px;
            span {
                font-weight: bold;
            }
        }
    }
</style>
