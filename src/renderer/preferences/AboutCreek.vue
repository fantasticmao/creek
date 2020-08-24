<template>
    <div class="about-creek">
        <div class="logo"></div>

        <p class="name">Creek</p>

        <p class="version">Version 1.0.0</p>

        <!-- TODO link to GitHub -->
        <p class="github">https://github.com/fantasticmao/creek/</p>

        <p class="copyright">Copyright © 2020 fantasticmao</p>
    </div>
</template>

<script>
    export default {
        name: "AboutCreek"
    }
</script>

<style scoped>
    .about-creek {
        /* font color */
        color: #DFDFDF;
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
        background-color: #FFFFFF;
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