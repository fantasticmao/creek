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
                <input type="checkbox">
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
                pauseOnMouseHover: config.pauseOnMouseHover
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
            }
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