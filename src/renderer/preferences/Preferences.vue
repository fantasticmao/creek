<template>
    <div class="preferences">
        <div class="aside">
            <Menu :items="menuItems" :default-active="defaultActive"></Menu>
        </div>

        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Menu from "./Menu";

    const url = new URL(location.href);
    const defaultActive = url.searchParams.get('active');

    export default {
        name: "Preferences",
        components: {
            Menu
        },
        data: function () {
            return {
                menuItems: [{
                    index: 1,
                    label: 'Danmu Display',
                    route: 'danmuDisplay'
                }, {
                    index: 2,
                    label: 'Danmu Server',
                    route: 'danmuServer'
                }, {
                    index: 3,
                    label: 'About Creek',
                    route: 'aboutCreek'
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
        color: #BBBBBB;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji;
    }

    .preferences {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .aside {
        width: 150px;
        height: 100%;
        background-color: #3D434D;
        border-right: 1px solid #323232;
    }

    .main {
        width: calc(100% - 150px);
        height: 100%;
        background-color: #3B3F41;
    }
</style>