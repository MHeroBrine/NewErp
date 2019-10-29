<template>
    <div id="report">
        <div class="container_default">
            <div class="title">
                <h3>心得体会</h3>
                <!-- <button style="position: absolute; right: 10px; top: 10px; width: 100px; z-index:1000" class="v-button b-primary" @click="uploadAll()">全部上传</button> -->
            </div>
            <div class="main">
                <div class="container">
                    <div class="temp">
                        <!-- <form enctype="multipart/form-data" ref="form"> -->
                        <input type="file" class="file" name="file" ref="file" accept=".doc,.docx,.pdf,.zip" v-bind:value="file_upload" v-on:input="uploadCache($event.target)">
                        <!-- </form> -->
                        <span class="cover highlight">
                            <img src="@/assets/Nav/GameControl/add_2.svg" class="icon" alt="">
                            <p>请上传文件</p>
                        </span>
                    </div>
                    <!-- <div class="temp">
                        <span class="cover">
                            <img src="@/assets/Nav/GameControl/word.svg" alt="">
                            <p>报告.docx</p>
                        </span>
                    </div> -->
                    <div class="temp" v-show="!uploadAlready" v-for="item in uploadTemp">
                        <a class="cover">
                            <img src="@/assets/Nav/GameControl/word.svg" class="icon" v-if="/\.(docx)|(doc)$/.test(item.name)">
                            <img src="@/assets/Nav/GameControl/excel.svg" class="icon" v-if="/\.(xlsx)|(xls)$/.test(item.name)">
                            <img src="@/assets/Nav/GameControl/excel.svg" class="icon" v-if="/\.(ppt)|(pptx)$/.test(item.name)">                            
                            <img src="@/assets/Nav/GameControl/txt.svg" class="icon" v-if="/\.txt$/.test(item.name)">
                            <!-- <img src="@/assets/Nav/GameControl/others.svg" alt=""> -->
                            <p>{{ item.name }}</p>
                            <!-- <img src="@/assets/Nav/GameControl/delete_2.svg" class="delete" @click="deleteItem(item.name)"> -->
                        </a>
                    </div>
                    <div class="temp" v-for="item in uploadAlready">
                         <!-- :href="'http://' + item.href" -->
                        <a class="cover" :href="'http://' + item.href" >
                            <img src="@/assets/Nav/GameControl/others.svg" class="icon" alt="">
                            <p>{{ item.name }}</p>
                            <img src="@/assets/Nav/GameControl/delete_2.svg" class="delete" @click="deleteItem($event, path)">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                // 心得体会
                data: null,
                gameId: null,
                file_upload: null,
                uploadTemp: [],
                uploadAlready: null,
                data_delete: [
                    {
                        title: '请输入密码',
                        value: ''
                    }
                ]
            }
        },
        methods: {
            // confirm() {
            //     let i = confirm('是否确认提交报告');
            //     if (i) {
            //         Axios.post(this.URL + '/game/manage/enterprise/member/report/submit?userId=' + this.$store.state.user.id + '&gameId=' + localStorage.getItem('GAME') + '&report=' + this.data)
            //             .then(Response => {
            //                 if (Response.data.code === 200) {
            //                     alert(Response.data.msg);
            //                     this.data = null;
            //                     this.$router.push('/nav');
            //                 } else {
            //                     alert(Response.data.msg);
            //                 }
            //             })
            //     }
            // },
            // 获取学生实验报告
            getReport() {
                this.uploadAlready = [];
                Axios.get(this.URL + '/game/manage/enterprise/member/report?userId=' + this.Cookie.getCookie('userId') + '&gameId=' + localStorage.getItem('GAME'))
                    .then(Response => {
                        if (Response.data.code === 200) {
                            let obj = {
                                name: '实验报告',
                                href: Response.data.data.reportLocation
                            }
                            this.uploadAlready.push(obj)
                        }
                    })
            },
            // 上传学生实验报告
            uploadAll() {
                if (this.uploadAlready[0]) {
                    alert('检测到用户以存在报告，如果需要上传新的报告需删除之前的报告');
                    // event.preventDefault();
                    return false;
                }
                let formData = new FormData();
                formData.append('file', this.uploadTemp[0]);
                formData.append('enctype', 'multipart/form-data');
                // console.log(formData.get('file'), formData.get('enctype'));
                Axios.post(this.URL + '/game/manage/enterprise/member/report?userId=' + this.$store.state.user.id + '&gameId=' + this.gameId, formData)
                .then(Response => {
                    if (Response.data.code === 200) {
                        alert('上传成功');
                        this.getReport();
                    } else {
                        alert('上传失败');
                    }
                })
            },
            uploadCache(file) {
                // console.log(file.files);
                this.uploadTemp.push(file.files[0]);
                this.uploadAll()
            },
            deleteItem(e) {
                // 阻止下载事件
                e.preventDefault();
                if (this.uploadTemp[0]) {
                    let arr = this.uploadTemp.filter((item, index) => {
                        return item.name != name;
                    })
                    this.uploadTemp = arr;
                } else if (this.uploadAlready[0]) {
                    this.$store.commit('controlAlert', [true, 'WARN_DELETE', '确认删除该附件吗', null, this.data_delete, () => {
                        Axios.delete(this.URL + '/game/manage/enterprise/member/report?userId=' + this.Cookie.getCookie('userId') + '&password=' + this.data_delete[0].value + '&gameId=' + localStorage.getItem('GAME'))
                            .then((Response) => {
                                if (Response.data.code === 200) {
                                    this.$store.commit('controlAlert', [true, 'TRUE', '删除附件成功', null, null, null]);
                                    setTimeout(() => {
                                        this.$store.commit('controlAlert', [false]);
                                        this.getReport();
                                    }, 1500);
                                } else {
                                    this.$store.commit('controlAlert', [true, 'FALSE', '删除失败', null, null, null]);
                                    setTimeout(() => {
                                        this.$store.commit('controlAlert', [false]);
                                        this.getReport();
                                    }, 1500);
                                }
                        })
                    }]);  
                }
            }
        },
        mounted() {
            this.gameId = localStorage.getItem('GAME');
            this.$store.commit('pageState', 'report');
            this.getReport();
        }
    }
</script>

<style lang="scss" scoped>
    #report {
        width: 100%;
        .container_default {
            height: 95%;
            .main {
                position: relative;
                margin-top: -60px;
                height: 100%;
                padding: 70px 90px 90px 20px;
                .container {
                    display: flex;
                    position: relative;
                    resize: none;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    outline: none;
                    padding: 20px;
                    // border: 1px solid #666;
                    font-size: 16px;
                    .temp {
                        margin-right: 40px;
                        position: relative;
                        width: 180px;
                        height: 280px;
                        .cover {
                            position: absolute;
                            z-index: 0;
                            display: flex;
                            background-color: #eee;
                            border-radius: 15px;
                            top: 0;
                            left: 0;
                            display: block;
                            width: 180px;
                            height: 280px;
                            text-align: center;
                            .icon {
                                position: absolute;
                                width: 70px;
                                top: 50%;
                                left: 50%;
                                margin-left: -35px;
                                margin-top: -70px;
                            }
                            .divide {
                                margin: 150px 20px 0 20px;
                                border-top: 1px solid #ddd;
                            }
                            p {
                                // position: absolute;
                                font-size: 14px;
                                color: #666;
                                // left: 55px;
                                margin-top: 180px;
                            }
                            .delete {
                                position: absolute;
                                cursor: pointer;
                                width: 25px;
                                top: 5px;
                                right: 5px;
                            }
                        }
                        .highlight {
                            background-color: #aaa;
                        }
                    }
                    .file {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        z-index: 10;
                        opacity: 0;
                        width: 180px;
                        height: 280px;
                    }
                    .upload_list {
                        line-height: 40px;
                        font-size: 14px;
                        color: #666;
                        li {
                            position: relative;
                            padding-left: 15px;
                        }
                        i {
                            position: absolute;
                            top: 16px;
                            left: 0px;
                            width: 8px;
                            height: 8px;
                            background-color: green;
                            border-radius: 50%;
                        }
                    }
                }
                .check {
                    cursor: pointer;
                    position: absolute;
                    width: 40px;
                    right: 20px;
                    bottom: 20px;
                    opacity: 0.6;
                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
</style>