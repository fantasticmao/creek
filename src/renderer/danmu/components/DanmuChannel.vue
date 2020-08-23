<template>
    <div class="danmu-channel" ref="danmu-channel">
        <DanmuMessage v-for="message in messageArray" ref="danmu-message"
                      :key="message.id" :channel-width="channelWidth"
                      @debut.once="handleMessageDebut(message)"
                      @animationend.native="handleMessageAnimationend">
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
                messageArray: [],
                msgQueue: []
            };
        },
        methods: {
            /**
             * batch send danmu messages
             * @param {String} messages msg text array
             */
            sendMessages: function (messages) {
                if (messages.length === 0) return;
                this.msgQueue = this.msgQueue.concat(messages);

                this.sendMessageFromQueue();
            },
            sendMessageFromQueue: function () {
                if (this.msgQueue.length === 0) return;

                const msgId = this.messageCount++;
                const msgText = this.msgQueue.shift();
                this.messageArray.push({
                    id: msgId,
                    msg: msgText
                });
                console.log(`msg send, id: ${msgId}, text: ${msgText}`);
            },
            handleMessageDebut: function (message) {
                console.log(`msg debut, id: ${message.id}, text: ${message.msg}`);
                this.sendMessageFromQueue();
            },
            handleMessageAnimationend: function () {
                const message = this.messageArray.shift();
                console.log(`msg end, id: ${message.id}, text: ${message.msg}`);
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

        /* css flex layout*/
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
</style>