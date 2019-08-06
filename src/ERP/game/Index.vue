<template>
    <div id="index">
        <div class="container_default mg">
            <div class="title">
                <h3>企业背景</h3>
            </div>
            <div class="info">
                <div>
                    <h3>FlatLab Is A Fully Responsive Admin Dashboard Template Built With Bootstrap 3.0 Framework</h3>
                    <p class="p1">Lorem ipsum dolor sit amet dolor duis blandit vestibulum faucibus a, tortor.</p>
                </div>
                <div class="page">
                    <p>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.

                    Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.$store.commit('pageState', 'index');
        }
    }
</script>

<style lang="scss" scoped>
    #index {
        width: 100%;
        .container_default {
            min-width: 800px;
            .info {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                padding: 20px;
                line-height: 30px;
                height: 270px;
                border-bottom: 1px solid #eee;
                color: #757579;
                div {
                    flex: 1;
                }
                h3 {
                    margin-top: 20px;
                    color: #314558;
                    font-size: 24px;
                }
                .p1 {
                    margin-top: 10px;
                }
                .page {
                    line-height: 30px;
                    margin-top: 20px;
                    margin-left: 20px;
                    font-size: 14px;
                    right: 80px;
                }
            }
        }
    }
</style>
