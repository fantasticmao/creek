<template>
    <div class="danmu-message" ref="danmu-message" :style="[baseStyleObject, transitionStyleObject[state]]"
         @mouseover="handleMouseover" @mouseleave="handleMouseleave">
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
                messageWidth: 0,
                state: 'start' // 'start' -> 'paused' -> 'end'
            };
        },
        computed: {
            baseStyleObject: function () {
                const duration = (this.channelWidth + this.messageWidth) / this.$store.state.scroll.speed;
                return {
                    'font-size': `${this.$store.state.font.size}px`,
                    'color': `${this.$store.state.font.color}`,
                    'opacity': `${this.$store.state.font.opacity}`,
                    'margin-right': `${this.$store.state.font.size / 2}px`,
                    'transition': `transform ${duration}s linear`
                };
            },
            transitionStyleObject: function () {
                return {
                    'start': {
                        'transform': `translate3d(${this.channelWidth}px, 0, 0)`
                    },
                    'end': {
                        'transform': 'translate3d(-100%, 0, 0)'
                    }
                };
            }
        },
        methods: {
            handleMouseover: function () {
                if (this.$store.state.scroll.pauseOnMouseHover) {
                    // TODO pause on mouse hover
                }
            },
            handleMouseleave: function () {
                if (this.$store.state.scroll.pauseOnMouseHover) {
                    // TODO unpause on mouse leave
                }
            }
        },
        mounted: function () {
            // message element's width
            this.messageWidth = this.$refs['danmu-message'].clientWidth + this.$store.state.font.size / 2;

            const self = this;
            /*
             * Trigger a transition event requires a delayed execution function
             * see more: https://github.com/vuejs/vue/issues/7706#issuecomment-368218972
             */
            const transitionTimeout = 100; // ms
            setTimeout(function () {
                self.state = 'end';
            }, transitionTimeout);

            // trigger message debut event, will be used to send the next message in the queue
            const debutTimeout = (this.messageWidth / this.$store.state.scroll.speed) * 1000; // ms
            setTimeout(function () {
                self.$emit('debut');
            }, debutTimeout + transitionTimeout);
        }
    }
</script>

<style scoped>
    .danmu-message {
        position: absolute;
        text-shadow: #000000 1px 0 1px, #000000 0 1px 1px, #000000 0 -1px 1px, #000000 -1px 0 1px;
    }
</style>