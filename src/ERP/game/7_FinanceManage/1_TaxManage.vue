<template>
    <div id="taxManage">
        <div class="container_default">
            <div class="title">
                <h3>税金管理</h3>
            </div>
            <div class="main">
                <div class="tax">
                    <img src="@/assets/Game/7_FinanceManage/tax.svg" alt="">
                    <span>￥200.00</span>
                </div>
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
            this.$store.commit('pageState', 'taxManage')
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/taxManage', 'money', 'tax');
            }, 1);
        }
    }
</script>

<style lang="scss" scoped>
    #taxManage {
        width: 100%;
        .container_default {
            height: 95%;
            .title {
                margin-bottom: -60px;
            }
            .main {
                padding: 40px;
                padding-top: 100px;
                width: 100%;
                height: 100%;
                .tax {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #eee;
                    border: 1px solid #eee;
                    width: 100%;
                    height: 100%;
                    span {
                        font-size: 26lpx;
                    }
                }
            }
        }
    }
</style>
