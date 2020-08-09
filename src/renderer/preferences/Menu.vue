<template>
    <div class="menu">
        <div v-for="item in items" class="menu-item" :class="{ active: active === item.index }"
             @click="handleClick(item)">
            <span>{{ item.label }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        props: {
            items: {
                type: Array,
                require: true
            },
            defaultActive: {
                type: [String, Number],
                default: 1
            }
        },
        data: function () {
            return {
                active: this.defaultActive
            };
        },
        methods: {
            handleClick: function (item) {
                this.active = item.index;
                this.$router.push(item.route).catch(error => {
                    // omit error: NavigationDuplicated
                    if (error.name === 'NavigationDuplicated') {
                        throw error
                    }
                });
            }
        },
        mounted() {
            const item = this.items
                .filter(item => this.active === item.index)
                .shift();
            this.$router.push(item.route).catch(error => {
                // omit error: NavigationDuplicated
                if (error.name === 'NavigationDuplicated') {
                    throw error
                }
            });
        }
    }
</script>

<style scoped>
    .menu {
        width: 100%;
        height: 100%;
    }

    .menu .active {
        background-color: #1D63D1;
    }

    .menu .menu-item {
        display: flex;
        align-items: center;
        height: 24px;
    }

    .menu .menu-item span {
        margin: auto 20px;
        font-weight: 700;
    }
</style>