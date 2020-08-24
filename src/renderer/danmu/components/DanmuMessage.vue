<template>
    <div class="danmu-message" ref="danmu-message" :style="styleObject"
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
                animationPlayState: 'running'
            };
        },
        computed: {
            styleObject: function () {
                const duration = (this.channelWidth + this.messageWidth) / this.$store.state.scroll.speed;
                return {
                    'font-size': `${this.$store.state.font.size}px`,
                    'color': `${this.$store.state.font.color}`,
                    'opacity': `${this.$store.state.font.opacity}`,
                    'margin-right': `${this.$store.state.font.size / 2}px`,
                    'animation-duration': `${duration}s`,
                };
            }
        },
        methods: {
            handleMouseover: function () {
                if (this.$store.state.scroll.pauseOnMouseHover) {
                    this.animationPlayState = 'paused';
                }
            },
            handleMouseleave: function () {
                if (this.$store.state.scroll.pauseOnMouseHover) {
                    this.animationPlayState = 'running'
                }
            }
        },
        mounted: function () {
            // message element's width
            this.messageWidth = this.$refs['danmu-message'].clientWidth + this.$store.state.font.size / 2;

            // debut timeout
            const delay = this.messageWidth / this.$store.state.scroll.speed;
            const self = this;
            setTimeout(function () {
                self.$emit('debut');
            }, delay * 1000);
        },
    }
</script>

<style scoped>
    .danmu-message {
        position: absolute;
        text-shadow: #000000 1px 0 1px, #000000 0 1px 1px, #000000 0 -1px 1px, #000000 -1px 0 1px;

        animation-name: danmu-message;
        animation-timing-function: linear;
    }

    @keyframes danmu-message {
        from {
            transform: translate3d(1200px, 0, 0);
        }

        to {
            transform: translate3d(-100%, 0, 0);
        }
    }
</style>