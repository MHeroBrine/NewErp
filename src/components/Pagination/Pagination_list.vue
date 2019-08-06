<template>
    <div class="pagination_list">
        <div class="paginate mg" v-show="state">
            <button class="rear" @click="pageNow = 0">&lt;</button>
            <template v-for="(i, key) in list">
                <button v-bind:class="{ active: key == pageNow }" @click="pageNow = key" :ref="key">{{ key + 1 }}</button>
            </template>
            <button class="front" @click="pageNow = list.length - 1">&gt;</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageNow: 0,
                list: [],
                state: false,

                // 分页尺寸
                little: true,
                much: false
            }
        },
        mounted() {
            const unwatch = this.$watch('data', function() {
                this.dataDivide();
                for (let i = 0; i < this.list.length; i ++) {
                    if (i > 4) {
                        setTimeout(() => {
                            this.$refs[i][0].style = 'display: none';
                        }, 0);
                    }
                }
                setTimeout(() => {
                    this.state = true;
                }, 0);
                this.$emit('change', this.list[0]);
                unwatch();
            })
        },
        watch: {
            'pageNow': function(val) {
                this.$emit('change', this.list[val]);
                this.pageTest();
            },
        },
        methods: {
            // 数据分割
            dataDivide() {
                this.list = this.Util.chunk(this.data, this.divide);
                this.data = this.list[0];
            },
            // 页面长度监测（省略号）
            pageTest() {
                // 第一页
                if (this.pageNow == 0) {
                    for (let i = 0; i < this.list.length; i ++) {
                        if (i < 5) {
                            this.$refs[i][0].style = 'display: inline-block';
                        } else {
                            this.$refs[i][0].style = 'display: none';
                        }
                    }
                    return;
                }
                // 中间页
                if (this.list.length - this.pageNow > 4) {
                    for (let i = 0; i < this.list.length; i ++) {
                        if (i < this.pageNow - 1 || i > this.pageNow + 3) {
                            this.$refs[i][0].style = 'display: none';
                        } else {
                            this.$refs[i][0].style = 'display: inline-block';
                        }
                    }
                } else {
                    // 最后五页
                    for (let i = 0; i < this.list.length; i ++) {
                        if (i < this.list.length - 5) {
                            this.$refs[i][0].style = 'display: none';
                        } else {
                            this.$refs[i][0].style = 'display: inline-block';
                        }
                    }
                }
            }
        },
        props: ['data', 'divide']
    }
</script>

<style lang="scss" scoped>
    .pagination_list {
        .paginate {
            position: absolute;
            bottom: 30px;
            left: 40px;
            button {
                cursor: pointer;
                width: 34px;
                height: 34px;
                background-color: rgb(143, 143, 226);
                border: 0;
                outline: none;  
                color: #fff;
                &:nth-of-type(1) {
                    border-radius: 5px 0 0 5px;
                }
                &:nth-last-of-type(1) {
                    border-radius: 0 5px 5px 0;
                }
            }
            .active {
                background-color: rgb(88, 88, 226);
            }
        }
    }
</style>
