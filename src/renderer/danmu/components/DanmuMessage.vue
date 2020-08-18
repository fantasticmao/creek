<template>
    <div class="danmu-message" ref="danmu-message" :style="messageStyleObject">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "DanmuMessage",
        props: {
            channelWidth: {
                type: Number,
                require: true
            }
        },
        data: function () {
            return {
                messageStyleObject: {
                    'font-size': `${this.$store.state.font.size}px`,
                    'color': `${this.$store.state.font.color}`,
                    'opacity': `${this.$store.state.font.opacity}`,
                    'margin-right': `${this.$store.state.font.size / 2}px`,
                    'transition': `transform ${this.$store.state.scroll.time}s linear`,
                    'transform': `translate3d(${this.channelWidth}px, 0, 0)`
                }
            };
        },
        mounted: function () {
            const self = this;
            setTimeout(function () {
                self.messageStyleObject['transform'] = 'translate3d(-100%, 0, 0)';
            }, 300);
        }
    }
</script>

<style scoped>
    .danmu-message {
        text-shadow: #000000 1px 0 1px, #000000 0 1px 1px, #000000 0 -1px 1px, #000000 -1px 0 1px;

        /* css position:absolute layout */
        position: absolute;
    }
</style>