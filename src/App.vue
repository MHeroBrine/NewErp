<template>
    <div id="app">

        <div class="floatWindow" v-if="this.$store.state.global.floatWindow"></div>

        <div class="alert" v-if="this.$store.state.global.ALERT">
            <div class="floatWindow"></div>
            <v-alert :title="this.$store.state.global.ALERT_TITLE" :content="this.$store.state.global.ALERT_CONTENT" :data="this.$store.state.global.ALERT_DATA" :method="this.$store.state.global.ALERT_METHOD" :icon="this.$store.state.global.ALERT_ICON"></v-alert>
        </div>

        <header>
            <v-header1 v-if="this.$store.state.global.HEADER_LOGIN"></v-header1>
            <v-header2 v-if="this.$store.state.global.HEADER_NAV"></v-header2>
            <v-header3 v-if="this.$store.state.global.HEADER_GAMECONTROL"></v-header3>
            <v-header-user v-if="this.$store.state.global.HEADER_USER"></v-header-user>
            <v-header-index v-if="this.$store.state.global.HEADER_INDEX"></v-header-index>
        </header>
        <div class="content">
            <div class="sidebar">
                <v-sidebar-user v-if="this.$store.state.global.SIDEBAR_USER"></v-sidebar-user>
                <v-sidebar-gameControl v-if="this.$store.state.global.SIDEBAR_GAMECONTROL"></v-sidebar-gameControl>
                <v-sidebar-index v-if="this.$store.state.global.SIDEBAR_INDEX"></v-sidebar-index>
            </div>
            <router-view/>
        </div>
        <!-- <footer><v-footer v-if="this.$store.state.global.FOTTER"></v-footer></footer> -->
    </div>
</template>

<script>
    import Header_login from './components/Header/Header_login.vue'
    import Header_nav from './components/Header/Header_nav.vue'
    import Header_user from './components/Header/Header_user.vue'
    import Header_gameControl from './components/Header/Header_gameControl.vue'
    import Header_index from './components/Header/Header_index.vue'

    import Sidebar_user from './components/Sidebar/Sidebar_user.vue'
    import Sidebar_gameControl from './components/Sidebar/Sidebar_gameControl.vue'
    import Sidebar_index from './components/Sidebar/Sidebar_index.vue'

    import Footer from './components/Footer/Footer.vue'

    export default {
        data() {
            return {}
        },
        methods: {},
        beforeMount() {
            this.College.getCollegeInfo(this.URL);
            
            this.$store.commit('refreshUserInfo');
            this.$store.commit('refreshCollegeInfo');
            this.$store.commit('refreshGameInfo');
            this.$store.commit('refreshGroupInfo');
        },
        components: {
            'v-header1': Header_login,
            'v-header2': Header_nav,
            'v-header3': Header_gameControl,
            'v-header-user': Header_user,
            'v-header-index': Header_index,
            'v-sidebar-user': Sidebar_user,
            'v-sidebar-gameControl': Sidebar_gameControl,
            'v-sidebar-index': Sidebar_index,
            'v-footer': Footer
        }
    }
</script>

<style lang="scss">
    #app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        .floatWindow {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #000;
            opacity: 0.5;
            z-index: 50;
        }

        .content {
            min-width: 1400px;
            background-color: #F1F2F7;
            display: flex;
            flex-direction: row;
            flex: 1;
        }
        header, footer {
            width: 100%;
            min-width: 1400px;
        }
        footer {
            border-top: 1px solid #000;
        }
    }
</style>
