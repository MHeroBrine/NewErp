<template>
    <div id="report">
        <div class="nav">
            <a>实验报告</a>&nbsp;&nbsp;
        </div>
        
        <div class="report">

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
    #report {
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
        .report {
            
        }
    }
</style>
