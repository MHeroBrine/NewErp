<template>
    <div class="select">
        <span>{{ title }}</span>
        <select :value="selected" @change="$emit('change', $event.target.value)">
            <template v-for="item in option">
                <option :value="item.value">{{ item.text }}</option>
            </template>
        </select>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'selected',
            event: 'change'
        },
        props: ['title', 'option', 'selected']
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
