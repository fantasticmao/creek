<template>
    <div class="danmu-server" :style="{'color': this.$store.state.theme.color.font}">
        <Form>
            <FormItem :key="1" label="enableLocalServer">
                <input type="checkbox" v-model="enableLocalServer">
            </FormItem>

            <FormItem :key="2" label="localServerPort" :disabled="!enableLocalServer">
                <input type="number" style="width: 45px" placeholder="9508"
                       v-model.lazy.number="localServerPort" :disabled="!enableLocalServer">
            </FormItem>

            <FormItem :key="3" label="remoteServerURL" :disabled="enableLocalServer">
                <input type="url" style="width: 155px" placeholder="https://example.com"
                       v-model.lazy="remoteServerUrl" :disabled="enableLocalServer">
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Form from "./components/Form";
    import FormItem from "./components/FormItem";

    import electron, {ipcRenderer} from 'electron';

    const config = electron.remote.getGlobal('__config');

    export default {
        name: "DanmuServer",
        components: {
            Form,
            FormItem
        },
        data: function () {
            return {
                enableLocalServer: config.enableLocalServer,
                localServerPort: config.localServerPort,
                remoteServerUrl: config.remoteServerUrl
            }
        },
        watch: {
            enableLocalServer: function (value) {
                ipcRenderer.send('main-config-changed-enableLocalServer', value);
            },
            localServerPort: function (value) {
                ipcRenderer.send('main-config-changed-localServerPort', value);
            },
            remoteServerUrl: function (value) {
                ipcRenderer.send('main-config-changed-remoteServerUrl', value);
            }
        }
    }
</script>

<style scoped>
    .danmu-server {
        opacity: 0.85;
    }
</style>