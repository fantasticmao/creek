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

    const STATE_FREE = 'free';
    const STATE_BUSY = 'busy';
    export {STATE_FREE, STATE_BUSY};

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
                state: STATE_FREE // 'free' or 'busy'
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
                this.state = STATE_FREE;
            },
            handleMessageTransitionend: function () {
                const message = this.messageArray.shift();
                console.info(`msg end, channelId: ${this.index}, msgId: ${message.id}, msgText: ${message.msg}`);
            }
        },
        mounted: function () {
            // channel element's width
            this.channelWidth = this.$refs['danmu-channel'].clientWidth;
            window.addEventListener('resize', () => {
                this.channelWidth = this.$refs['danmu-channel'].clientWidth;
            });

            setInterval(() => {
                if (this.state === STATE_FREE && this.msgQueue.length !== 0) {
                    const msgId = this.messageCount++;
                    const msgText = this.msgQueue.shift();
                    this.messageArray.push({
                        id: msgId,
                        msg: msgText
                    });
                    console.info(`msg start, channelId: ${this.index}, msgId: ${msgId}, msgText: ${msgText}`);
                    this.state = STATE_BUSY;
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