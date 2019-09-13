<template>
    <div id="nav" class="center">
        <ul class="main mg">
            <li class="card" v-bind:class="{ active: activeNow.GAMECONTROL == 'middle', left: activeNow.GAMECONTROL == 'left', right: activeNow.GAMECONTROL == 'right' }">
    
            <!-- 非active时不可跳转 -->
            <svg @mouseover="turn('GAMECONTROL')"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="185px" height="170px"
                @click="pushTo_card('GAMECONTROL', '/createGame')">
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M124.034,133.176 L124.034,144.964 L118.423,144.964 C117.796,147.615 116.748,150.136 115.298,152.473 L119.272,156.438 L110.919,164.772 L106.944,160.806 C104.603,162.253 102.075,163.300 99.418,163.925 L99.418,169.522 L87.603,169.522 L87.603,163.925 C84.946,163.300 82.425,162.253 80.084,160.806 L76.106,164.772 L67.752,156.438 L71.727,152.473 C70.277,150.133 69.228,147.615 68.601,144.964 L62.990,144.964 L62.990,133.176 L68.601,133.176 C69.228,130.526 70.277,128.011 71.727,125.671 L67.752,121.706 L76.106,113.372 L80.080,117.337 C82.422,115.891 84.946,114.844 87.603,114.215 L87.603,108.621 L99.418,108.621 L99.418,114.215 C102.075,114.844 104.603,115.891 106.944,117.337 L110.919,113.372 L119.272,121.706 L115.298,125.671 C116.748,128.011 117.796,130.526 118.423,133.176 L124.034,133.176 ZM116.669,134.355 C116.067,131.404 114.907,128.618 113.221,126.078 L112.777,125.410 L116.490,121.706 L110.919,116.151 L107.209,119.852 L106.536,119.409 C103.990,117.727 101.198,116.569 98.240,115.969 L97.449,115.809 L97.449,110.586 L89.572,110.586 L89.572,115.809 L88.784,115.969 C85.827,116.569 83.034,117.727 80.488,119.409 L79.818,119.852 L76.106,116.151 L70.534,121.706 L74.247,125.410 L73.803,126.078 C72.117,128.618 70.957,131.404 70.355,134.355 L70.194,135.141 L64.960,135.141 L64.960,143.000 L70.194,143.000 L70.355,143.785 C70.957,146.739 72.117,149.522 73.803,152.066 L74.247,152.734 L70.534,156.438 L76.106,161.992 L79.818,158.292 L80.488,158.735 C83.034,160.417 85.827,161.575 88.784,162.175 L89.572,162.332 L89.572,167.558 L97.449,167.558 L97.449,162.332 L98.240,162.175 C101.198,161.575 103.990,160.417 106.536,158.735 L107.206,158.292 L110.919,161.992 L116.486,156.438 L112.777,152.734 L113.221,152.066 C114.907,149.526 116.067,146.739 116.669,143.785 L116.826,143.000 L122.065,143.000 L122.065,135.141 L116.826,135.141 L116.669,134.355 ZM91.815,148.963 C88.272,148.178 85.411,145.328 84.615,141.795 C83.032,134.766 89.222,128.611 96.259,130.205 C99.796,131.006 102.645,133.863 103.427,137.397 C104.976,144.398 98.835,150.520 91.815,148.963 ZM92.274,133.390 C90.122,133.957 88.382,135.693 87.813,137.838 C86.518,142.723 90.885,147.063 95.768,145.766 C97.913,145.196 99.647,143.466 100.218,141.327 C101.519,136.456 97.170,132.099 92.274,133.390 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M-0.000,28.000 L3.000,28.000 L3.000,169.000 L-0.000,169.000 L-0.000,28.000 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M182.000,28.000 L185.000,28.000 L185.000,169.000 L182.000,169.000 L182.000,28.000 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M138.000,31.000 L138.000,28.000 L185.000,28.000 L185.000,31.000 L138.000,31.000 ZM48.000,31.000 L-0.000,31.000 L-0.000,28.000 L48.000,28.000 L48.000,31.000 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M161.000,169.000 L161.000,166.000 L185.000,166.000 L185.000,169.000 L161.000,169.000 ZM29.000,169.000 L-0.000,169.000 L-0.000,166.000 L29.000,166.000 L29.000,169.000 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M48.000,-0.000 L51.031,-0.000 L51.031,110.000 L48.000,110.000 L48.000,-0.000 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M135.969,-0.000 L139.000,-0.000 L139.000,110.000 L135.969,110.000 L135.969,-0.000 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M48.000,-0.000 L139.000,-0.000 L139.000,2.875 L48.000,2.875 L48.000,-0.000 Z"/>
                <path fill-rule="evenodd"  :fill="activeNow.GAMECONTROL == 'middle' ? activeColor : defaultColor"
                d="M63.156,65.437 L63.156,61.594 L121.812,61.594 L121.812,65.437 L63.156,65.437 ZM63.156,49.094 L121.812,49.094 L121.812,53.906 L63.156,53.906 L63.156,49.094 ZM63.156,35.594 L121.812,35.594 L121.812,39.469 L63.156,39.469 L63.156,35.594 ZM62.156,19.250 L98.562,19.250 L98.562,24.062 L62.156,24.062 L62.156,19.250 Z"/>
            </svg>

            <a style="margin-top: 88px;" v-show="activeNow.GAMECONTROL != 'middle'">比赛管理</a>
            <router-link to="/createGame" style="margin-top: 88px;" v-show="activeNow.GAMECONTROL == 'middle'">比赛管理</router-link>
            </li>
            <li class="card" v-bind:class="{ active: activeNow.CREATEGAME == 'middle', left: activeNow.CREATEGAME == 'left', right: activeNow.CREATEGAME == 'right' }">
    
                <svg @mouseover="turn('CREATEGAME')"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="185px" height="169px"
                    @click="pushTo_card('CREATEGAME', '/createGame')">
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M-0.000,28.000 L3.000,28.000 L3.000,169.000 L-0.000,169.000 L-0.000,28.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M182.000,28.000 L185.000,28.000 L185.000,169.000 L182.000,169.000 L182.000,28.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M138.000,31.000 L138.000,28.000 L185.000,28.000 L185.000,31.000 L138.000,31.000 ZM48.000,31.000 L-0.000,31.000 L-0.000,28.000 L48.000,28.000 L48.000,31.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M-0.000,166.000 L185.000,166.000 L185.000,169.000 L-0.000,169.000 L-0.000,166.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M48.000,-0.000 L51.000,-0.000 L51.000,133.000 L48.000,133.000 L48.000,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M135.000,-0.000 L138.000,-0.000 L138.000,133.000 L135.000,133.000 L135.000,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M48.000,-0.000 L138.000,-0.000 L138.000,3.000 L48.000,3.000 L48.000,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M48.000,130.000 L138.000,130.000 L138.000,133.000 L48.000,133.000 L48.000,130.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.CREATEGAME == 'middle' ? activeColor : defaultColor"
                    d="M63.000,68.000 L63.000,64.000 L121.000,64.000 L121.000,68.000 L63.000,68.000 ZM63.000,51.000 L121.000,51.000 L121.000,56.000 L63.000,56.000 L63.000,51.000 ZM63.000,37.000 L121.000,37.000 L121.000,41.000 L63.000,41.000 L63.000,37.000 ZM62.000,20.000 L98.000,20.000 L98.000,25.000 L62.000,25.000 L62.000,20.000 Z"/>
                </svg>

                <a v-show="activeNow.CREATEGAME != 'middle'">创建比赛</a>
                <router-link to="/createGame" v-show="activeNow.CREATEGAME == 'middle'">创建比赛</router-link>
            </li>
            <li class="card" v-bind:class="{ active: activeNow.JOINGAME == 'middle', left: activeNow.JOINGAME == 'left', right: activeNow.JOINGAME == 'right' }">
                
                <svg @mouseover="turn('JOINGAME')"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="185px" height="169px"
                    @click="pushTo_card('JOINGAME', '/continueGame')">
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M120.338,169.306 L117.445,169.306 C116.477,154.522 109.056,143.032 93.976,143.032 C78.896,143.032 71.475,154.522 70.507,169.306 L67.615,169.306 C68.556,154.469 75.749,142.614 89.467,140.491 C83.469,138.725 79.082,133.134 79.082,126.497 C79.082,118.443 85.537,111.913 93.500,111.913 C101.463,111.913 107.918,118.443 107.918,126.497 C107.918,133.007 103.699,138.517 97.877,140.392 C111.996,142.251 119.384,154.247 120.338,169.306 ZM105.048,126.497 C105.048,120.050 99.875,114.825 93.494,114.825 C87.114,114.825 81.941,120.050 81.941,126.497 C81.941,132.943 87.114,138.169 93.494,138.169 C99.875,138.169 105.048,132.943 105.048,126.497 Z"/>
                    <!-- <image  x="60px" y="101px" width="62px" height="70px"  xlink:href="data:img/png;base64,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" /> -->
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M-0.000,28.000 L3.000,28.000 L3.000,169.000 L-0.000,169.000 L-0.000,28.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M182.000,28.000 L185.000,28.000 L185.000,169.000 L182.000,169.000 L182.000,28.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M138.000,31.000 L138.000,28.000 L185.000,28.000 L185.000,31.000 L138.000,31.000 ZM48.000,31.000 L-0.000,31.000 L-0.000,28.000 L48.000,28.000 L48.000,31.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M161.000,169.000 L161.000,166.000 L185.000,166.000 L185.000,169.000 L161.000,169.000 ZM29.000,169.000 L-0.000,169.000 L-0.000,166.000 L29.000,166.000 L29.000,169.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M48.000,-0.000 L51.033,-0.000 L51.033,110.000 L48.000,110.000 L48.000,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M135.967,-0.000 L139.000,-0.000 L139.000,110.000 L135.967,110.000 L135.967,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M48.000,-0.000 L139.000,-0.000 L139.000,2.887 L48.000,2.887 L48.000,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="activeNow.JOINGAME == 'middle' ? activeColor : defaultColor"
                    d="M63.167,65.444 L63.167,61.594 L121.811,61.594 L121.811,65.444 L63.167,65.444 ZM63.167,49.083 L121.811,49.083 L121.811,53.895 L63.167,53.895 L63.167,49.083 ZM63.167,35.609 L121.811,35.609 L121.811,39.459 L63.167,39.459 L63.167,35.609 ZM62.156,19.248 L98.556,19.248 L98.556,24.060 L62.156,24.060 L62.156,19.248 Z"/>
                </svg>

                <a v-show="activeNow.JOINGAME != 'middle'">加入比赛</a>
                <router-link to="/continueGame" v-show="activeNow.JOINGAME == 'middle'">加入比赛</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeNow: {
                    GAMECONTROL: 'left',
                    CREATEGAME: 'middle',
                    JOINGAME: 'right'
                },
                activeColor: 'rgb(70, 184, 237)',
                defaultColor: '#7793A0'
            }
        },
        
        methods: {
            // 翻转特效
            turn(state) {                
                switch (this.activeNow[state]) {
                    case 'left':
                        for (let item in this.activeNow) {
                            switch (this.activeNow[item]) {
                                case 'left':
                                    this.activeNow[item] = 'middle';
                                    break;
                                case 'middle':
                                    this.activeNow[item] = 'right';
                                    break;
                                case 'right':
                                    this.activeNow[item] = 'left';
                                    break;
                                default:
                                    break;
                            }
                        }
                        break;
                    case 'right':
                        for (let item in this.activeNow) {
                            switch (this.activeNow[item]) {
                                case 'left':
                                    this.activeNow[item] = 'right';
                                    break;
                                case 'middle':
                                    this.activeNow[item] = 'left';
                                    break;
                                case 'right':
                                    this.activeNow[item] = 'middle';
                                    break;
                                default:
                                    break;
                            }
                        }
                        break;
                    default:
                        break;
                }
            },
            // 跳转
            pushTo_card(state, address) {
                if (this.activeNow[state]) {
                    this.$router.push(address);
                }
            }
        },
        mounted() {
            this.$store.commit('pageState', 'nav');
        }
    }
</script>

<style lang="scss" scoped>
    #nav {
        button {
            position: absolute;
        }
        width: 100%;
        background: url('../../assets/Nav/background.png');
        background-size: cover;
        .main {
            position: relative;
            width: 1020px;
            display: flex;
            margin-top: 120px;
            padding-bottom: 700px;
            .card {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                // margin-top: 120px;
                background-color: #fff;
                box-shadow: 0px 21px 30.08px 1.92px rgba(81, 160, 196, 0.42);
                top: 50px;
                font-size: 24px;
                z-index: 2;
                width: 360px;
                height: 490px;
                transition: all 1s;
                a {
                    color: #666;
                    display: block;
                    font-size: 24px;
                    margin-top: 55px;
                }
                svg {
                    cursor: pointer;
                    transform: scale(0.77);
                    margin-top: 110px;
                    transition: all 1s;
                }
            }
            .right {
                left: 663px;
                z-index: 0;
            }
            .left {
                left: 0;
                z-index: 0;
            }
            .active {
                top: 0;
                font-size: 33px;
                line-height: 1.2;
                z-index: 3;
                left: 288px;
                width: 450px;
                height: 590px;
                box-shadow: 0px 36px 63px 7px rgba(46, 124, 160, 0.54);
                a {
                    margin-top: 75px;
                    color: #000;
                }
                svg {
                    transform: scale(1);
                    margin-top: 180px;
                    color: #000;
                }
            }
        }
    }
</style>
