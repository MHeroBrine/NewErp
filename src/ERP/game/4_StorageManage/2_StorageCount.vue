<template>
    <div id="storageCount">
        <div class="nav">
            <a href=""></a>
            <h3>库存盘点</h3>
        </div>
        <div class="container mg">
            <div class="title">
                <span>选择时间：</span><select name="" id=""></select><button class="v-button b-primary">确定</button>
            </div>
            <div class="intro">
                <h3>本期概括</h3>
                <ul class="mg">
                    <li>出库</li>
                    <li>入库</li>
                    <li>产品库存数</li>
                </ul>
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
            this.$store.commit('pageState', 'storageCount');
        }
    }
</script>

<style lang="scss" scoped>
    #storageCount {
        width: 100%;
        .nav {
            width: 100%;
            height: 60px;   
            border-bottom: 1px solid #000;
            h3 {
                line-height: 60px;
                font-size: 22px;
                margin-left: 20px;
            }
        }
        .container {
            margin-top: 50px;
            width: 1100px;
            height: 750px;
            background-color: #fff;
            border: 1px solid #000;
            .title {
                padding: 50px;
                select {
                    width: 150px;
                }
                button {
                    width: 100px;
                    margin-left: 50px;
                }
            }
            .intro {
                width: 100%;
                display: flex;
                flex-direction: column;
                h3 {
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                }
                ul {
                    display: flex;
                    justify-content: space-between;
                    width: 900px;
                    margin-top: 50px;
                    li {
                        width: 200px;
                        height: 200px;
                        background-color: #eee;
                        border: 1px solid #000;
                        border-radius: 50%;
                        line-height: 200px;
                        text-align: center;
                    }
                }
            }
        } 
    }
</style>
