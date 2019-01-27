<template>
    <div class="select">
        <span>{{ title }}</span>
        <select>
            <template v-for="item in option">
                <option :value="item">{{ item }}</option>
            </template>
        </select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                option: ''
            }
        },
        props: ['title', 'option']
    }
</script>

<style lang="scss" scoped>
    .select {
        // height: 28px;
        position: relative;
        span {
            font-size: 12px;
            font-weight: bold;
            padding-bottom: 3px;
            margin-right: 50px;
        }
        select {
            box-sizing: border-box;
            border: 2px solid #EAEAEA;
            width: 230px;
            height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            margin-left: 25px;
        }
    }
</style>
