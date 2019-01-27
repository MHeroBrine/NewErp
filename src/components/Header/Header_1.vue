<template>
    <div class="header_1 mg">
        <div>
            <img src="../../assets/logo.png" alt="">
            <h1>虚拟运营系统</h1>
        </div>
        <div>
            <a href="#">English</a> &nbsp;|&nbsp; <a href="#">中文版</a>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    .header_1 {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        min-width: 1000px;
        margin: 10px;
        div {
            display: flex;
            a {
                font-weight: bold;
            }
        }
        img {
            width: 50px;
            height: 50px;
        }
    }
</style>
