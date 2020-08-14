<template>
    <div class="toolbar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Toolbar"
    }
</script>

<style scoped>
    .toolbar {
        /* css flex layout */
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>