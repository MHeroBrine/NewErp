<template>
    <div class="pagination_list">
        <div class="paginate mg">
            <icon class="back_2" @click="toTopOrBottom(1)"></icon>
            <icon class="back_1" @click="changePage(-1)"></icon>
            <div class="count"> {{ pageNow }} / {{ length }} </div>
            <icon class="forward_1" @click="changePage(1)"></icon>
            <icon class="forward_2" @click="toTopOrBottom(0)"></icon>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        watch: {
            'pageNow': function(val) {
                this.$emit('change', val)
            }
        },
        methods: {
            // changeValue() {
            //     this.$emit('change', ++ this.pageNow);
            // },
            changePage(num) {
                this.pageNow += num;
                if (this.pageNow === 0) {
                    this.pageNow = 1;
                } else if (this.pageNow > this.length) {
                    this.pageNow -= 1;
                }
            },
            toTopOrBottom(num) {
                if (num === 1) {
                    this.pageNow = 1;
                } else if (num === 0) {
                    this.pageNow = this.length;
                }
            }
        },
        props: ['length', 'pageNow']
    }
</script>

<style lang="scss" scoped>
    .pagination_list {
        .paginate {
            display: flex;
            justify-content: center;
            margin-top: 80px;
            text-align: center;
            .count {
                margin-left: 20px;
                margin-right: 20px;
                width: 50px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                background-color: #fff;
                border: 1px solid #000;
            }
            icon {
                cursor: pointer;
            }
        }
    }
</style>
