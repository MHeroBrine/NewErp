<template>
    <div class="v-input">
        <span ref="span">{{ title }}</span>
        <input 
            v-bind:type="type" 
            v-bind:value="value" 
            v-on:input="$emit('input', $event.target.value)"
            :disabled="disabled"
            :placeholder="placeholder"
            v-bind:style="{width: width + 'px'}"
        >
        <i v-bind:class="{ eye_open: eyeOpen, eye_close: eyeClose }" @click="changeView()"></i>
        <i v-bind:class="{ pass: isPass }"></i>
        <i v-bind:class="{ wrong: isWrong }"></i>
    </div>
</template>

<script>
    // 0. 这个输入框是否真的需要被组件化，它是否会被反复调用（最重要）
    // 1. 某个属性的输入框（例如：用户名输入框，密码输入框）
    // 2. 输入信息的正则验证，正确/错误时的显示（例如：✔ ❌）
    // 3. 边边角角的一些问题，例如会不会影响页面布局，兼容性如何

    export default {
        data() {
            return {
                isPass: false,
                isWrong: false,
                eyeOpen: false,
                eyeClose: false
            }
        },
        methods: {
            changeView() {
                if (this.eye) {
                    this.eyeOpen = !this.eyeOpen;
                    this.eyeClose = !this.eyeClose;
                    if (this.type !== "password") {
                        this.type = "password";
                    } else {
                        this.type = "text";
                    }
                } else {
                    return false;
                }
            }
        },
        mounted() {
            if (this.title.length < 4) {
                this.$refs.span.innerHTML += "&#x3000;&#x3000;";
            }

            if (this.RegExp) {
                this.$watch('value', function() {
                    if (this.value === "") {
                        this.isPass = false;
                        this.isWrong = false;
                        return false;
                    }

                    let matches = this.RegExp.test(this.value);
                    console.log(matches);
                    if (matches === true) {
                        this.isPass = true;
                        this.isWrong = false;
                    } else {
                        this.isWrong = true;
                        this.isPass = false;
                    }
                })
            }

            if (this.eye) {
                this.eyeClose = true;
            }
        },
        props: ['title', 'type', 'value', 'RegExp', 'disabled', 'placeholder', 'imgsrc', 'width', "eye"]
    }
</script>

<style lang="scss" scoped>
    .v-input {
        // height: 28px;
        position: relative;
        span {
            font-size: 12px;
            font-weight: bold;
            padding-bottom: 3px;
            margin-right: 50px;
        }
        input {
            outline-color: #ffa500;
            box-sizing: border-box;
            border: 2px solid #EAEAEA;
            width: 230px;
            height: 28px;
            padding-left: 3px;
            padding-right: 3px;
        }
        .pass {
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: #67C23A;
            border-radius: 50%;
            right: 15px;
            bottom: 7px;
            &::before {
                content: "";
                position: absolute;
                top: 8px;
                left: 2px;
                width: 5px;
                height: 2px;
                transform: rotate(45deg);
                background-color: #fff;
            }
            &::after {
                content: "";
                position: absolute;
                right: 2px;
                top: 6px;
                width: 8px;
                height: 2px;
                transform: rotate(-60deg);
                background-color: #fff;
            }
        }
        .wrong {
            position: absolute;
            width: 14px;
            height: 14px;
            background-color: #D32F2F;
            border-radius: 50%;
            right: 15px;
            bottom: 7px;
            &::before {
                content: "";
                position: absolute;
                right: 3px;
                top: 6px;
                width: 8px;
                height: 2px;
                transform: rotate(45deg);
                background-color: #fff;
            }
            &::after {
                content: "";
                position: absolute;
                right: 3px;
                top: 6px;
                width: 8px;
                height: 2px;
                transform: rotate(-45deg);
                background-color: #fff;
            }
        }
        .eye_open {
            position: absolute;
            box-sizing: border-box;
            cursor: pointer;
            width: 22px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid #ABB9D4;
            right: 18px;
            bottom: 7px;
            &::before {
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                border: 1px solid #ABB9D4;
                right: 5px;
                top: 1px;
            }
        }
        .eye_close {
            position: absolute;
            box-sizing: border-box;
            cursor: pointer;
            width: 22px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid #ABB9D4;
            right: 18px;
            bottom: 7px;
            &::before {
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                border: 1px solid #ABB9D4;
                right: 5px;
                top: 1px;
            }
            &::after {
                content: "";
                position: absolute;
                width: 25px;
                height: 2px;
                background-color: #ABB9D4;
                transform: rotate(-45deg);
                left: -4px;
                top: 5px;
            }
        }
    }
</style>
