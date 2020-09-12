<template>
    <div class="preferences">
        <div class="header" :style="{
            'background-color': this.$store.state.theme.color.head,
            'border-color': this.$store.state.theme.color.head_border
        }">
            <Toolbar>
                <ToolbarItem :key="1" label="display" :icon="this.$store.state.theme.icon.display"
                             :active="route === 'display'"
                             @click.native="handleClickToolbarItem('display')">
                </ToolbarItem>

                <ToolbarItem :key="2" label="server" :icon="this.$store.state.theme.icon.server"
                             :active="route === 'server'"
                             @click.native="handleClickToolbarItem('server')">
                </ToolbarItem>

                <ToolbarItem :key="3" label="about" :icon="this.$store.state.theme.icon.about"
                             :active="route === 'about'"
                             @click.native="handleClickToolbarItem('about')">
                </ToolbarItem>
            </Toolbar>
        </div>

        <div class="main" :style="{'background-color': this.$store.state.theme.color.main}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Toolbar from "./components/Toolbar";
    import ToolbarItem from "./components/ToolbarItem";

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

            ipcRenderer.on('window-config-route', (event, route) => {
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
        width: 100%;
        border-bottom: 1px solid;
    }

    .main {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }
</style>