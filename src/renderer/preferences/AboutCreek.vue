<template>
    <div class="about-creek" :style="{'color': this.$store.state.theme.color.font}">
        <div class="logo"><img :src="this.$store.state.theme.logo.url" alt="logo"></div>

        <p class="name">Creek</p>

        <p class="version">{{ $i18n('currentVersion') }} {{ version }}</p>

        <p class="github" @click="handleClickGitHub">https://github.com/fantasticmao/creek/</p>

        <p class="copyright">Copyright © 2020 fantasticmao</p>
    </div>
</template>

<script>
    import {shell} from 'electron';
    import packageJson from '../../../package.json';

    export default {
        name: "AboutCreek",
        data: function () {
            return {
                version: packageJson.version
            }
        },
        methods: {
            handleClickGitHub: function () {
                shell.openExternal('https://github.com/fantasticmao/creek/');
            }
        }
    }
</script>

<style scoped>
    .about-creek {
        opacity: 0.85;

        /* css flex layout */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .about-creek p {
        margin-top: 10px;
        margin-bottom: 0;
    }

    .about-creek .logo {
        width: 64px;
        height: 64px;
    }

    .about-creek .logo img {
        width: 100%;
    }

    .about-creek .name {
        font-size: 20px;
    }

    .about-creek .version {
        font-size: 13px;
    }

    .about-creek .github {
        font-size: 13px;
        user-select: all;
    }

    .about-creek .github:hover {
        text-decoration-line: underline;
    }

    .about-creek .copyright {
        font-size: 13px;
    }
</style>