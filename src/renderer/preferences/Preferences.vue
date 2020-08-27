<template>
    <div class="preferences">
        <div class="header">
            <Toolbar>
                <ToolbarItem :key="1" label="Display" :icon="iconDisplay"
                             :active="route === 'display'"
                             @click.native="handleClickToolbarItem('display')">
                </ToolbarItem>

                <ToolbarItem :key="2" label="Server" :icon="iconServer"
                             :active="route === 'server'"
                             @click.native="handleClickToolbarItem('server')">
                </ToolbarItem>

                <ToolbarItem :key="3" label="About" :icon="iconAbout"
                             :active="route === 'about'"
                             @click.native="handleClickToolbarItem('about')">
                </ToolbarItem>
            </Toolbar>
        </div>

        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Toolbar from "./components/Toolbar";
    import ToolbarItem from "./components/ToolbarItem";

    import IconDisplay from '../../static/icons/display.svg';
    import IconServer from '../../static/icons/server.svg';
    import IconAbout from '../../static/icons/about.svg';

    import {ipcRenderer} from 'electron';

    const url = new URL(location.href);
    const defaultRoute = url.searchParams.get('defaultRoute') || 'display';

    export default {
        name: "Preferences",
        components: {
            Toolbar,
            ToolbarItem
        },
        data: function () {
            return {
                route: defaultRoute,
                iconDisplay: IconDisplay,
                iconServer: IconServer,
                iconAbout: IconAbout
            }
        },
        methods: {
            handleClickToolbarItem: function (route) {
                this.route = route;
                this.$router.push(route);
            }
        },
        mounted: function () {
            if (this.route) {
                this.$router.push(this.route);
            } else {
                throw new Error('failed to match the default route');
            }

            ipcRenderer.on('push-route', (event, route) => {
                this.handleClickToolbarItem(route);
            });
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
        user-select: none;
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
        width: 100%;
        border-bottom: 1px solid #000000;
    }

    .main {
        background-color: #2D2D2D;
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }
</style>