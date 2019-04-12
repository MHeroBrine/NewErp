<template>
    <div class="input_search">
        <input type="text" placeholder="请输入比赛名称">
        <i></i>
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
    .input_search {
        position: relative;
        input {
            box-sizing: border-box;
            width: 300px;
            height: 30px;
            border: 1px solid #000;
            padding: 5px;
        }
        i {
            position: absolute;
            cursor: pointer;
            right: 5px;
            top: 5px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid #000;
            &::before {
                content: "";
                position: absolute;
                width: 12px;
                height: 1px;
                top: 13px;
                right: 6px;
                background-color: #000;
                transform: rotate(-45deg);
            }
        }
    }
</style>
