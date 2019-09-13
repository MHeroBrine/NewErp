<template>
    <div id="teacher">

    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.$store.commit('pageState', 'teacher');
        }
    }
</script>

<style lang="scss" scoped>
    #teacher {

    }
</style>