<template>
    <div class="danmu-server">
        <Form>
            <FormItem :key="1" label="Enable Local Server:">
                <input type="checkbox" v-model="enableLocalServer">
            </FormItem>

            <FormItem :key="2" label="Local Server Port:" :disabled="!enableLocalServer">
                <input type="number" style="width: 45px" placeholder="9508"
                       v-model.lazy.number="localServerPort" :disabled="!enableLocalServer">
            </FormItem>

            <FormItem :key="3" label="Remote Server URL:" :disabled="enableLocalServer">
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
                ipcRenderer.send('enableLocalServer', value);
            },
            localServerPort: function (value) {
                ipcRenderer.send('localServerPort', value);
            },
            remoteServerUrl: function (value) {
                ipcRenderer.send('remoteServerUrl', value);
            }
        }
    }
</script>

<style scoped>
    .danmu-server {
        /* font color */
        color: #DFDFDF;
        opacity: 0.85;
    }
</style>