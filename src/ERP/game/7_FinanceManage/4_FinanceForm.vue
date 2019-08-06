<template>
    <div id="financeForm">
        <div class="container_default">
            <div class="title">
                <h3>财务报表</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import vueEvent from '../../../model/VueEvent';

    export default {
        data() {
            return {}
        },
        mounted() {
            // 设置页面格式
            this.$store.commit('pageState', 'financeForm')
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/financeForm', 'money', 'finance');
            }, 1);
        }
    }
</script>

<style lang="scss" scoped>
    #financeForm {
        width: 100%;
    }
</style>