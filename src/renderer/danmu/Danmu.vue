<template>
    <div class="danmu" ref="danmu" :style="styleObject">
        <DanmuChannel v-for="index in channelArray" ref="channel"
                      :key="index" :index="index">
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
                channelGap: 10,
                msg: 0
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
             * batch send danmu messages
             * @param {String} messages msg text array
             */
            sendMessages: function (messages) {
                if (messages.length === 0 || !messages instanceof Array) return;

                messages.forEach(message => {
                    this.selectChannel()
                        .then(channel => {
                            channel.sendMessage(message);
                        });
                });
            },
            /**
             * choose an available free channel
             * @return {Promise<channel>} channel component
             */
            selectChannel: async function () {
                let resultChannel = null;
                for (let i = 0; i < this.channelRows; i++) {
                    const channel = this.$refs['channel'][i];
                    if (channel.state === 'free') {
                        resultChannel = channel;
                        break;
                    }
                }

                if (resultChannel !== null) {
                    return Promise.resolve(resultChannel);
                } else {
                    return Promise.resolve(setTimeout(this.selectChannel, 300));
                }
            },
            /**
             * fetch danmu messages from danmu server
             * @return {Promise<Response | void>} message array
             */
            fetchMessage: async function () {
                let url;
                if (this.$store.state.server.enableLocalServer) {
                    url = `http://${this.$store.state.server.localServerHost}:${this.$store.state.server.localServerPort}/dump?timestamp=${new Date().getTime()}`;
                } else {
                    url = `${this.$store.state.server.remoteServerUrl}?timestamp=${new Date().getTime()}`;
                }
                return fetch(url)
                    .then(response => response.ok
                        ? response.json()
                        : Promise.reject(`request failed, response status: ${response.status}`)
                    )
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

            // fetch danmu messages as scheduled
            setInterval(() => {
                this.fetchMessage()
                    .then(this.sendMessages)
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
    }
</style>