<template>
    <div class="danmu-channel" ref="danmu-channel">
        <DanmuMessage v-for="message in messageArray" ref="danmu-message"
                      :key="message.id" :channel-width="channelWidth"
                      @debut.once="handleMessageDebut(message)"
                      @transitionend.native="handleMessageTransitionend">
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
        props: {
            index: {
                type: Number,
                require: true
            }
        },
        data: function () {
            return {
                channelWidth: 0,
                messageCount: 0,
                messageArray: [],
                msgQueue: [],
                state: 'free' // 'free' or 'busy'
            };
        },
        methods: {
            /**
             * send a danmu messages
             * @param {String} message msg text
             */
            sendMessage: function (message) {
                this.msgQueue.push(message);
            },
            handleMessageDebut: function (message) {
                console.debug(`msg debut, channelId: ${this.index}, msgId: ${message.id}, msgText: ${message.msg}`);
                this.state = 'free';
            },
            handleMessageTransitionend: function () {
                const message = this.messageArray.shift();
                console.info(`msg end, channelId: ${this.index}, msgId: ${message.id}, msgText: ${message.msg}`);
            }
        },
        mounted: function () {
            // channel element's width
            this.channelWidth = this.$refs['danmu-channel'].clientWidth;

            setInterval(() => {
                if (this.state === 'free' && this.msgQueue.length !== 0) {
                    const msgId = this.messageCount++;
                    const msgText = this.msgQueue.shift();
                    this.messageArray.push({
                        id: msgId,
                        msg: msgText
                    });
                    console.info(`msg start, channelId: ${this.index}, msgId: ${msgId}, msgText: ${msgText}`);
                    this.state = 'busy';
                }
            }, 100);
        }
    }
</script>

<style scoped>
    .danmu-channel {
        width: 100%;
    }
</style>