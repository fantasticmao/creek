<template>
    <vue-baberrage :isShow="true" :barrageList="data">
        <template v-slot:default="slotProps">
            <span style="color: white; font-size: 32px">
                {{slotProps.item.msg}}
            </span>
        </template>
    </vue-baberrage>
</template>

<script>
    import {MESSAGE_TYPE} from 'vue-baberrage';

    export default {
        name: 'Barrage',
        data: function () {
            return {
                id: 0,
                data: []
            };
        },
        methods: {
            put: function () {
                this.data.push({
                    id: this.id++,
                    msg: 'Hello, World!',
                    time: 15,
                    type: MESSAGE_TYPE.NORMAL
                });
            }
        },
        mounted() {
            setInterval(this.put, 1000)
        }
    }
</script>

<style scoped>

</style>