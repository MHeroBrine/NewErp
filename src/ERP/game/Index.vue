<template>
    <div id="index">
        <div class="nav">
            <a>企业信息</a>&nbsp;&nbsp;
        </div>
        <div class="groupBackground mg">
            <div>
                <h3>企业背景</h3>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
        </div>
        <div class="icon mg">
            <div class="mg">
                <a href="#"><span>订单选取</span></a>
                <a href="#"><span>原料采购</span></a>
                <a href="#"><span>产品库存</span></a>
                <a href="#"><span>生产线运行</span></a>
                <a href="#"><span>发货管理</span></a>
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
            localStorage.setItem('enterpriseId', 1);
        }
    }
</script>

<style lang="scss" scoped>
    #index {
        width: 100%;
        .nav {
            width: 100%;
            min-width: 1200px;
            height: 70px;
            border-bottom: 1px solid #000;
            padding-top: 15px;
            padding-left: 10px;
            img {
                width: 30px;
            }
            .input_search {
                margin: 5px 10px 0 0;
            }
        }
        .groupBackground {
            width: 1200px;
            height: 400px;
            background-color: #fff;
            border: 1px solid #000;
            margin-top: 50px;
            div {
                &:nth-of-type(1) {
                    height: 50px;
                    line-height: 50px;
                    width: 100%;
                    border-bottom: 1px solid #000;
                }
            }
            p {
                padding: 20px;
                line-height: 25px;
            }
        }
        .icon {
            width: 1200px;
            height: 300px;
            background-color: #fff;
            border: 1px solid #000;
            margin-top: 50px;
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 1000px;
                height: 300px;
                a {   
                    position: relative;
                    cursor: pointer;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background-color: grey;
                    span {
                        font-size: 18px;
                        font-weight: bold;
                        position: absolute;
                        top: 110px;
                        left: 10px;
                    }
                }
            }
        }
    }
</style>
