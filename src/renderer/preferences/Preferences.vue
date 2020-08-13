<template>
    <div class="preferences">
        <div class="header">
            <Toolbar :items="toolbarItems" :default-active="defaultActive"></Toolbar>
        </div>

        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Toolbar from "./Toolbar";
    import IconDisplay from '../../static/icons/display.svg';
    import IconServer from '../../static/icons/server.svg';
    import IconAbout from '../../static/icons/about.svg';

    const url = new URL(location.href);
    const defaultActive = url.searchParams.get('active');

    export default {
        name: "Preferences",
        components: {
            Toolbar
        },
        data: function () {
            return {
                toolbarItems: [{
                    index: 1,
                    label: 'Display',
                    icon: IconDisplay,
                    route: 'display'
                }, {
                    index: 2,
                    label: 'Server',
                    icon: IconServer,
                    route: 'server'
                }, {
                    index: 3,
                    label: 'About',
                    icon: IconAbout,
                    route: 'about'
                }],
                defaultActive: Number.parseInt(defaultActive)
            }
        }
    }
</script>

<style>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji;
    }

    .preferences {
        height: 100%;

        /* css grid layout */
        display: grid;
        grid-template-rows: 55px 1fr;
        justify-items: center;
    }

    .header {
        background-color: #464646;
        border-bottom: 1px solid #323232;
        width: 100%;
    }

    .main {
        background-color: #2D2D2D;
        width: 100%;
    }
</style>