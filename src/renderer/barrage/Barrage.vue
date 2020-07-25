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
            put: function (message) {
                this.data.push({
                    id: this.id++,
                    msg: message,
                    time: 15,
                    type: MESSAGE_TYPE.NORMAL
                });
            }
        },
        mounted() {
            setInterval(() => {
                const self = this;
                fetch(`http://${process.env.LOCAL_SERVER_HOST}:${process.env.LOCAL_SERVER_PORT}/dump`)
                    .then(response => {
                        return response.ok
                            ? response.json()
                            : Promise.reject(`request failed, response status: ${response.status}`);
                    })
                    .then(json => {
                        if (json.data && json.data instanceof Array) {
                            json.data.forEach(self.put);
                        } else {
                            return Promise.reject(`json format error: ${json}`);
                        }
                    })
                    .catch(console.error);
            }, 1000)
        }
    }
</script>

<style scoped>

</style>