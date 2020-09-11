<template>
    <div class="danmu-display">
        <Form>
            <FormItem :key="1" label="fontSize">
                <select style="width: 80px" v-model.number="fontSize">
                    <option v-for="size in fontSizeArray" :value="size">
                        {{ size }}
                    </option>
                </select>
            </FormItem>

            <FormItem :key="2" label="fontColor">
                <input type="text" style="width: 80px" placeholder="#FFFFFF"
                       v-model.lazy="fontColor">
            </FormItem>

            <FormItem :key="3" label="fontOpacity">
                <input type="range" style="max-width: 120px" min="0" max="1" step="0.05"
                       v-model.number="fontOpacity">
            </FormItem>

            <FormItem :key="4" label="scrollSpeed">
                <select style="width: 80px" v-model.number="scrollSpeed">
                    <option v-for="item in scrollSpeedEnum" :value="item.speed">
                        {{ $i18n(item.desc) }}
                    </option>
                </select>
            </FormItem>

            <FormItem :key="6" label="displayForOutput">
                <select style="min-width: 120px" v-model.number="display">
                    <option v-for="(item, index) in displayArray" :value="item.id">
                        Display {{ index + 1 }} ({{ item.size.width }} x {{ item.size.height }})
                    </option>
                </select>
            </FormItem>

            <FormItem :key="7" label="preview">
                <input type="checkbox" :checked="preview" @click="handlePreviewClick">
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Form from "./components/Form";
    import FormItem from "./components/FormItem";
    import electron, {ipcRenderer} from 'electron';
    import logoUrl from '../../resources/icon-white.iconset/icon_64x64.png';

    const config = electron.remote.getGlobal('__config');
    const dialog = electron.remote.dialog;
    const nativeImage = electron.remote.nativeImage;

    export default {
        name: "DanmuDisplay",
        components: {
            Form,
            FormItem
        },
        data: function () {
            const fontSizeArray = [];
            for (let i = 20; i < 100; i += 4) {
                fontSizeArray.push(i);
            }
            let ensureDisplay = this.getEnsureDisplay(config.displayId);
            return {
                fontSize: config.fontSize,
                fontSizeArray: fontSizeArray,
                fontColor: config.fontColor,
                fontOpacity: config.fontOpacity,
                scrollSpeed: config.scrollSpeed,
                scrollSpeedEnum: [
                    {speed: 100, desc: 'scrollSpeed_Slow'},
                    {speed: 200, desc: 'scrollSpeed_Default'},
                    {speed: 400, desc: 'scrollSpeed_Fast'}
                ],
                pauseOnMouseHover: config.pauseOnMouseHover,
                preview: false,
                intervalId: 0,
                display: ensureDisplay.id,
                displayArray: electron.remote.screen.getAllDisplays()
            };
        },
        methods: {
            getEnsureDisplay: function (displayId) {
                if (displayId !== 0) {
                    const ensureDisplay = electron.remote.screen.getAllDisplays()
                        .filter(display => display.id === displayId);
                    if (ensureDisplay.length === 1) {
                        return ensureDisplay[0];
                    }
                }
                return electron.remote.screen.getPrimaryDisplay();
            },
            updateDisplayArray: function () {
                this.displayArray = electron.remote.screen.getAllDisplays();
                this.display = this.getEnsureDisplay(config.displayId).id;
            },
            handlePreviewClick: function (event) {
                if (!this.preview && !config.startupState) {
                    const selectButtonId = dialog.showMessageBoxSync({
                        message: this.$i18n('preview_Message'),
                        buttons: [this.$i18n('preview_TurnOn'), this.$i18n('preview_Cancel')],
                        defaultId: 0,
                        icon: nativeImage.createFromDataURL(logoUrl)
                    });
                    if (selectButtonId !== 0) { // Cancel
                        event.preventDefault();
                        return;
                    } else { // Turn On
                        const result = ipcRenderer.sendSync('tray-turn-on');
                        console.info(`trying to turn Creek on: ${result}`);
                    }
                }
                this.preview = event.target.checked;
            }
        },
        mounted: function () {
            electron.remote.screen.on('display-added', this.updateDisplayArray);
            electron.remote.screen.on('display-removed', this.updateDisplayArray);
            electron.remote.screen.on('display-metrics-changed', this.updateDisplayArray);
        },
        watch: {
            fontSize: function (value) {
                ipcRenderer.send('main-config-changed-fontSize', value);
            },
            fontColor: function (value) {
                ipcRenderer.send('main-config-changed-fontColor', value);
            },
            fontOpacity: function (value) {
                ipcRenderer.send('main-config-changed-fontOpacity', value);
            },
            scrollSpeed: function (value) {
                ipcRenderer.send('main-config-changed-scrollSpeed', value);
            },
            pauseOnMouseHover: function (value) {
                ipcRenderer.send('main-config-changed-pauseOnMouseHover', value);
            },
            display: function (value) {
                ipcRenderer.send('main-config-changed-displayId', value);
                ipcRenderer.send('window-danmu-move', value);
            },
            preview: function (value) {
                const previewData = this.$i18n('previewData');

                if (value) {
                    // start the scheduled task
                    let i = 0;
                    this.intervalId = setInterval(() => {
                        const url = `http://${config.localServerHost}:${config.localServerPort}/?msg=${previewData[i]}`;
                        fetch(url)
                            .then(response => response.ok
                                ? Promise.resolve()
                                : Promise.reject(`request failed, response status: ${response.status}`)
                            )
                            .catch(console.error);
                        if (++i === previewData.length) {
                            i = 0;
                        }
                    }, 200);
                } else {
                    // clear the scheduled task
                    clearInterval(this.intervalId);
                    this.intervalId = 0;
                }
            }
        },
        beforeRouteLeave: function (to, from, next) {
            if (this.preview || this.intervalId !== 0) {
                clearInterval(this.intervalId);
            }
            next();
        }
    }
</script>

<style scoped>
    .danmu-display {
        /* font color */
        color: #DFDFDF;
        opacity: 0.85;
    }
</style>