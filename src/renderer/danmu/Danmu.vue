<template>
    <vue-baberrage :isShow="true" :barrageList="data">
        <template v-slot:default="slotProps">
            <span class="danmu">
                {{slotProps.item.msg}}
            </span>
        </template>
    </vue-baberrage>
</template>

<script>
    import {MESSAGE_TYPE} from 'vue-baberrage';

    export default {
        name: 'Danmu',
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
                const url = `http://${process.env.LOCAL_SERVER_HOST}:${process.env.LOCAL_SERVER_PORT}/dump?timestamp=${new Date().getTime()}`;
                fetch(url)
                    .then(response => {
                        return response.ok
                            ? response.json()
                            : Promise.reject(`request failed, response status: ${response.status}`);
                    })
                    .then(json => {
                        if (json.data && json.data instanceof Array) {
                            json.data
                                .map(item => item.msg)
                                .forEach(self.put);
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
    .danmu {
        color: #FFFFFF;
        font-size: 32px;
    }
</style>