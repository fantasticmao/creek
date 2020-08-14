<template>
    <div class="form">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Form"
    }
</script>

<style scoped>
    .form {
        /* css grid layout */
        display: grid;
        grid-template-rows: repeat(3, 15px);
        grid-auto-rows: 15px;
        grid-row-gap: 10px;
        align-content: center;
    }
</style>