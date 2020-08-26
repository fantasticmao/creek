<template>
    <div class="danmu-server">
        <Form>
            <FormItem :key="1" label="Enable Local Server:">
                <input type="checkbox" :checked="enableLocalServer"
                       @change="handleChangeEnableLocalServer">
            </FormItem>

            <FormItem :key="2" label="Local Server Port:" :disabled="!enableLocalServer">
                <input type="number" style="width: 45px" value="9508" placeholder="9508"
                       :disabled="!enableLocalServer" @change="handleLocalServerPort">
            </FormItem>

            <FormItem :key="3" label="Remote Server URL:" :disabled="enableLocalServer">
                <input type="url" style="width: 155px" placeholder="https://example.com"
                       :disabled="enableLocalServer" @change="handleRemoteServerUrl">
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Form from "./components/Form";
    import FormItem from "./components/FormItem";

    import {ipcRenderer} from 'electron';

    export default {
        name: "DanmuServer",
        components: {
            Form,
            FormItem
        },
        data: function () {
            return {
                enableLocalServer: true
            }
        },
        methods: {
            handleChangeEnableLocalServer: function () {
                this.enableLocalServer = !this.enableLocalServer;
                ipcRenderer.send('enableLocalServer', this.enableLocalServer);
            },
            handleLocalServerPort: function (event) {
                ipcRenderer.send('localServerPort', event.target.value);
            },
            handleRemoteServerUrl: function (event) {
                ipcRenderer.send('remoteServerUrl', event.target.value);
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