<template>
    <div class="danmu" ref="danmu" :style="styleObject">
        <DanmuChannel v-for="index in channelArray" ref="channel" :key="index">
        </DanmuChannel>
    </div>
</template>

<script>
    import DanmuChannel from "./components/DanmuChannel";

    export default {
        name: 'Danmu',
        components: {
            DanmuChannel
        },
        data: function () {
            return {
                containerHeight: 0,
                channelGap: 10
            };
        },
        computed: {
            /**
             * calculate the number of rows
             */
            channelRows: function () {
                const displayHeight = this.containerHeight - this.channelGap;
                return Math.floor(displayHeight / (this.$store.state.font.size + this.channelGap));
            },
            channelArray: function () {
                const arr = [];
                for (let i = 0; i < this.channelRows; i++) {
                    arr.push(i);
                }
                return arr;
            },
            styleObject: function () {
                return {
                    'padding-top': `${this.channelGap}px`,
                    /* css grid layout */
                    'display': 'grid',
                    'grid-template-rows': `repeat(${this.channelRows}, ${this.$store.state.font.size}px)`,
                    'grid-row-gap': `${this.channelGap}px`
                };
            }
        },
        methods: {
            /**
             * send a danmu message
             * @param {String} message text
             */
            sendMessage: function (message) {
                // TODO choose a danmu channel
                this.$refs['channel'][0].sendMessage(message);
            },
            /**
             * fetch messages from danmu server
             * @return {Promise<Response | void>} message array
             */
            fetchMessage: async function () {
                const url = `http://${process.env.LOCAL_SERVER_HOST}:${process.env.LOCAL_SERVER_PORT}/dump?timestamp=${new Date().getTime()}`;
                return fetch(url)
                    .then(response => {
                        return response.ok
                            ? response.json()
                            : Promise.reject(`request failed, response status: ${response.status}`);
                    })
                    .then(json => {
                        if (json.data && json.data instanceof Array) {
                            return json.data.map(item => item.msg);
                        } else {
                            return Promise.reject(`json format error: ${json}`);
                        }
                    });
            }
        },
        mounted: function () {
            // div element's height
            this.containerHeight = this.$refs['danmu'].clientHeight;

            // fetch message data as scheduled
            const self = this;
            setInterval(function () {
                self.fetchMessage()
                    .then(messageArray => {
                        messageArray.forEach(self.sendMessage);
                    })
                    .catch(console.error);
            }, 1000);
        }
    }
</script>

<style>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji;
    }

    .danmu {
        height: 100%;
        background-color: #808080;
    }
</style>