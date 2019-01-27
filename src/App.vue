<template>
    <div id="app">
        <header><v-header1 v-if="false"></v-header1><v-header2></v-header2></header>
        <div class="content">
            <div class="sidebar"><v-sidebar-user></v-sidebar-user></div>
            <router-view/>
        </div>
        <footer><v-footer></v-footer></footer>
    </div>
</template>

<script>
    import Header_1 from './components/Header/Header_1.vue'
    import Header_2 from './components/Header/Header_2.vue'
    import Footer from './components/Footer/Footer.vue'
    import Sidebar_user from './components/Sidebar/Sidebar_user.vue'

    export default {
        data() {
            return {}
        },
        components: {
            'v-header1': Header_1,
            'v-header2': Header_2,
            'v-footer': Footer,
            'v-sidebar-user': Sidebar_user
        }
    }
</script>

<style lang="scss">
    #app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        .content {
            background-color: #eee;
            display: flex;
            flex-direction: row;
            flex: 1;
        }
        header, footer {
            width: 100%;
        }
        header {
            border-bottom: 1px solid #000;
        }
        footer {
            border-top: 1px solid #000;
        }
    }
</style>
