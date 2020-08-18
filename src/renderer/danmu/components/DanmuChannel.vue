<template>
    <div class="danmu-channel" ref="danmu-channel">
        <DanmuMessage v-for="message in messageArray" :key="message.id" :channel-width="channelWidth">
            {{ message.msg }}
        </DanmuMessage>
    </div>
</template>

<script>
    import DanmuMessage from "./DanmuMessage";

    export default {
        name: "DanmuChannel",
        components: {
            DanmuMessage
        },
        data: function () {
            return {
                channelWidth: 0,
                messageCount: 0,
                messageArray: []
            };
        },
        methods: {
            /**
             * send a danmu message
             * @param {String} message text
             */
            sendMessage: function (message) {
                this.messageArray.push({
                    id: this.messageCount++,
                    msg: message
                });
            }
        },
        mounted: function () {
            // channel element's width
            this.channelWidth = this.$refs['danmu-channel'].clientWidth;
        }
    }
</script>

<style scoped>
    .danmu-channel {
        width: 100%;
    }
</style>