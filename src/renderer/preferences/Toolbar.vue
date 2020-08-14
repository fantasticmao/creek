<template>
    <div class="toolbar">
        <ToolbarItem v-for="item in items" :key="item.index" :label="item.label"
                     :icon="item.icon" :active="item.index === currentActive"
                     @click.native="handleClick(item)">
        </ToolbarItem>
    </div>
</template>

<script>
    import ToolbarItem from "./ToolbarItem";

    export default {
        name: "Toolbar",
        components: {
            ToolbarItem
        },
        props: {
            items: {
                type: Array,
                require: true
            },
            defaultActive: {
                type: Number,
                default: 1
            }
        },
        data: function () {
            return {
                currentActive: this.defaultActive
            }
        },
        methods: {
            handleClick: function (item) {
                this.currentActive = item.index;
                this.$router.push(item.route);
            }
        },
        mounted: function () {
            const item = this.items
                .filter(item => this.currentActive === item.index)
                .shift();
            if (item && item.route) {
                this.$router.push(item.route);
            } else {
                throw new Error('failed to match the default option');
            }
        }
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