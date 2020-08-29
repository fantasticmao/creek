<template>
    <div class="danmu-display">
        <Form>
            <FormItem :key="1" label="Font Size:">
                <select style="width: 80px" v-model.number="fontSize">
                    <option v-for="size in fontSizeArray" :value="size">
                        {{ size }}
                    </option>
                </select>
            </FormItem>

            <FormItem :key="2" label="Font Color:">
                <input type="text" style="width: 80px" placeholder="#FFFFFF"
                       v-model.lazy="fontColor">
            </FormItem>

            <FormItem :key="3" label="Font Opacity:">
                <input type="range" style="max-width: 120px" min="0" max="1" step="0.05"
                       v-model.number="fontOpacity">
            </FormItem>

            <FormItem :key="4" label="Scroll Speed:">
                <select style="width: 80px" v-model.number="scrollSpeed">
                    <option v-for="item in scrollSpeedEnum" :value="item.speed">
                        {{ item.desc }}
                    </option>
                </select>
            </FormItem>

            <!-- TODO choose display screen -->
            <FormItem :key="6" label="Display for Output">
                <select style="min-width: 120px">
                    <option>Built-in Display</option>
                </select>
            </FormItem>

            <!-- TODO preview -->
            <FormItem :key="7" label="Preview:">
                <input type="checkbox" v-model="preview">
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Form from "./components/Form";
    import FormItem from "./components/FormItem";
    import electron, {ipcRenderer} from 'electron';
    import testData from './test-data';

    const config = electron.remote.getGlobal('__config');
    const appLocal = electron.remote.app.getLocale();

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
            return {
                fontSize: config.fontSize,
                fontSizeArray: fontSizeArray,
                fontColor: config.fontColor,
                fontOpacity: config.fontOpacity,
                scrollSpeed: config.scrollSpeed,
                scrollSpeedEnum: [
                    {speed: 100, desc: 'Slow'},
                    {speed: 200, desc: 'Default'},
                    {speed: 400, desc: 'Fast'}
                ],
                pauseOnMouseHover: config.pauseOnMouseHover,
                preview: false,
                intervalId: 0
            };
        },
        watch: {
            fontSize: function (value) {
                ipcRenderer.send('fontSize', value);
            },
            fontColor: function (value) {
                ipcRenderer.send('fontColor', value);
            },
            fontOpacity: function (value) {
                ipcRenderer.send('fontOpacity', value);
            },
            scrollSpeed: function (value) {
                ipcRenderer.send('scrollSpeed', value);
            },
            pauseOnMouseHover: function (value) {
                ipcRenderer.send('pauseOnMouseHover', value);
            },
            preview: function (value) {
                // determine the user's language
                let language = 'en';
                for (const key in testData) {
                    if (key === appLocal) {
                        language = key;
                        break;
                    }
                }

                if (value) {
                    // start the scheduled task
                    let i = 0;
                    this.intervalId = setInterval(() => {
                        const url = `http://${config.localServerHost}:${config.localServerPort}/push?msg=${testData[language][i]}`;
                        fetch(url)
                            .then(response => response.ok
                                ? Promise.resolve() :
                                Promise.reject(`request failed, response status: ${response.status}`)
                            )
                            .catch(console.error);
                        if (++i === testData[language].length) {
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