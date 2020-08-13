<template>
    <div class="toolbar-item" :class="{active: active}">
        <div class="icon">
            <img :src="icon" alt="icon">
        </div>

        <div class="label">
            <span>
                {{ label }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToolbarItem",
        props: {
            label: {
                type: String,
                require: true
            },
            icon: {
                type: String,
                require: true
            },
            active: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .toolbar-item {
        width: 60px;
        height: 54px;
        border-radius: 5px;

        /* css grid layout */
        display: grid;
        grid-template-rows: 36px 1fr;
        justify-items: center;
    }

    .active {
        background-color: #585856;
    }

    .toolbar-item .icon {
        width: 32px;
        height: 32px;
    }

    .toolbar-item .label {
        color: #DFDFDF;
        font-size: 12px;
    }
</style>