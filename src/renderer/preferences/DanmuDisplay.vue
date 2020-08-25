<template>
    <div class="danmu-display">
        <Form>
            <FormItem :key="1" label="Font Size:">
                <select style="width: 60px">
                    <option v-for="size in fontSizeArray" :value="size">
                        {{ size }}
                    </option>
                </select>
            </FormItem>

            <FormItem :key="2" label="Font Color:">
                <input type="text" style="width: 60px" placeholder="#FFFFFF">
            </FormItem>

            <FormItem :key="3" label="Font Opacity:">

            </FormItem>

            <FormItem :key="4" label="Scroll Speed:">
                <select style="width: 60px">
                    <option v-for="speed in ['Slow', 'Default', 'Fast']" :value="speed">
                        {{ speed }}
                    </option>
                </select>
            </FormItem>

            <FormItem :key="5" label="Pause on Mouse Hover:">
                <input type="checkbox">
            </FormItem>

            <FormItem :key="6" label="Display for Output">
                <select style="min-width: 120px">
                    <option>Built-in Display</option>
                </select>
            </FormItem>

            <FormItem :key="7" label="Preview:">
                <input type="checkbox" checked>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Form from "./components/Form";
    import FormItem from "./components/FormItem";

    export default {
        name: "DanmuDisplay",
        components: {
            Form,
            FormItem
        },
        computed: {
            fontSizeArray: function () {
                const arr = [];
                for (let i = 14; i <= 64; i += 4) {
                    arr.push(i);
                }
                return arr;
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