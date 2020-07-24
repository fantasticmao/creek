<template>
    <VueBaberrage :barrageList="data">
    </VueBaberrage>
</template>

<script>
    import VueBaberrage from 'vue-baberrage';

    export default {
        name: 'Barrage',
        components: {
            VueBaberrage
        },
        data: function () {
            return {
                data: ['Hello']
            };
        },
        methods: {
            put: function () {
                this.data.push('Hello');
            }
        },
        mounted() {
            setInterval(this.put, 1000)
        }
    }
</script>

<style scoped>

</style>