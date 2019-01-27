<template>
    <div id="nav">
        <div><a href="#">创建比赛</a></div>
        <div><a href="#">比赛管理</a></div>
        <div><a href="#">参加比赛</a></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    #nav {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        div {
            text-align: center;
            margin: 50px;
            margin-top: 150px;
            width: 300px;
            height: 500px;
            background-color: #fff;
            border: 1px solid #000;
            a {
                display: block;
                margin-top: 350px;
                font-size: 30px;
                font-weight: bold;
            }
        }
    }
</style>
