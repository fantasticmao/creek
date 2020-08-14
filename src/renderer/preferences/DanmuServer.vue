<template>
    <div class="danmu-server">
        <Form>
            <FormItem :key="1" label="Enable Local Server:">
                <input type="checkbox" checked>
            </FormItem>

            <FormItem :key="2" label="Local Server Port:">
                <input type="number" style="width: 45px" placeholder="9508">
            </FormItem>

            <FormItem :key="3" label="Remote Server URL:" :disabled="true">
                <input type="url" style="width: 155px" placeholder="https://example.com" disabled>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Form from "./components/Form";
    import FormItem from "./components/FormItem";

    export default {
        name: "DanmuServer",
        components: {
            Form,
            FormItem
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