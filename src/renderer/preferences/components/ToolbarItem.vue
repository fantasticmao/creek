<template>
    <div class="toolbar-item" :class="{active: active}">
        <div class="icon">
            <img :src="icon" alt="icon">
        </div>

        <div class="label">
            <span>
                {{ $i18n(label) }}
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

        /* font color */
        color: #DFDFDF;
        opacity: 0.85;

        /* css grid layout */
        display: grid;
        grid-template-rows: 36px 1fr;
        justify-items: center;
        align-items: center;
    }

    .active {
        background-color: #585856;
    }

    .toolbar-item .icon {
        width: 32px;
        height: 32px;
    }

    .toolbar-item .label {
        font-size: 12px;
    }
</style>