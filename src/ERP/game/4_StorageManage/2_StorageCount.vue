<template>

    <!-- 已弃用 -->

    <div id="storageCount">
        <div class="container_default">
            <div class="title">
                <h3>库存盘点</h3>
            </div>
            <div class="main">
                <div class="top">
                    <p>选择时间：
                        <select class="v-select">
                            <option value=""></option>
                        </select>
                    </p>
                </div>
                <div class="container mg">
                    <div>
                        <p>0.00</p>
                        <p class="item">出库</p>
                    </div>
                    <div>
                        <p>0.00</p>
                        <p class="item">入库</p>
                    </div>
                    <div>
                        <p>0.00</p>
                        <p class="item">产品库存数</p>
                    </div>
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
            setTimeout(() => {
                vueEvent.$emit('sidebarState', '/game/storageCount', 'storage', 'count');
            }, 1);
            this.$store.commit('pageState', 'storageCount');
        }
    }
</script>

<style lang="scss" scoped>
    #storageCount {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                padding: 30px;
                p {
                    font-size: 18px;
                    color: #666;
                    select {
                        width: 200px;
                    }
                }
                .container {
                    margin-top: 150px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    max-width: 1200px;
                    div {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        line-height: 30px;
                        width: 200px;
                        height: 200px;
                        text-align: center;
                        background-color: #A9D86E;
                        border-radius: 50%;
                        p {
                            // color: #000;
                            font-size: 14px;
                        }
                        .item {
                            // color: #666;
                            font-size: 22px;
                        }
                    }
                }
            }
        }
    }
</style>
