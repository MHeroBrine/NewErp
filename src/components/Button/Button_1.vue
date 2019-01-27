<template>
    <div class="button_1">
        <button
            :value="value"
            v-bind:class="[type, size, {
                disabled: disabled
            }]"
            v-bind:style="{ minWidth: width, minHeight: height }"
            :disabled="disabled"
        >
        {{ value }}
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: ['value', 'type', 'disabled', 'width', 'height', 'size']
    }
</script>

<style lang="scss" scoped>
    .button_1 {
        margin: 10px;
        button {
            cursor: pointer;
            outline: none;
            color: #fff;
            font-size: 18px;
            letter-spacing: 1px;
            border-radius: 10px;
            min-width: 100px;
            min-height: 50px;
            padding: 10px;
            background-color: #fff;
            color: #000;
            border: 0px;
            box-shadow: 0px 2px 2px 0 grey;
            transition: all 0.3s;
            &:hover {
                opacity: 0.7;
            }
            &:active {
                opacity: 1.0;
            }
        }
        .primary {
            color: #fff;
            background-color: #409EFF;
        }
        .success {
            color: #fff;
            background-color: #67C23A;
        }
        .info {
            color: #fff;
            background-color: #909399;
        }
        .warning {
            color: #fff;
            background-color: #E6A23C;
        }
        .danger {
            color: #fff;
            background-color: #F56C6C;
        }
        .disabled {
            opacity: 0.4;
            cursor: not-allowed;
            &:hover {
                opacity: 0.4;
            }
        }
        .small {
            font-size: 16px;
            min-width: 80px;
            min-height: 40px;
        }
        .medium {
            min-width: 100px;
            min-height: 50px;
        }
        .large {
            font-size: 22px;
            min-width: 140px;
            min-height: 70px;
        }
    }
</style>
