<template>
    <div class="form-item" :class="{disabled: disabled}">
        <div class="label">
            <span>{{ label }}</span>
        </div>

        <div class="input">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormItem",
        props: {
            label: {
                type: String,
                require: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .form-item {
        /* css grid layout */
        display: grid;
        grid-template-columns: 155px 1fr;
        align-content: center;
    }

    .form-item .label {
        font-size: 13px;
        justify-self: end;
    }

    .form-item .input {
        padding-left: 10px;
    }

    .form-item .input input {
        border-width: 0;
        line-height: 15px;
    }

    .disabled .label {
        text-decoration-line: line-through;
    }

    .disabled .input input {
        background-color: #B3B5BA;
    }
</style>