<template>
    <div class="textarea">
        <label v-if="label" :for="id">{{ label }}</label>

        <textarea
            :id="id"
            :value="value"
            :placeholder="placeholder"
            @keyup="change">
        </textarea>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: [
                Number, String
            ],
            default() {
                return this._uid
            }
        },
        value: String,
        label: String,
        placeholder: String
    },
    methods: {
        change({ target }) {
            this.$emit(`input`, target.value)
        }
    }
}
</script>

<style scoped>
.textarea {
    margin-bottom: 1rem;
}

label {
    font-family: var(--heading-font);
    font-weight: var(--heading-font-weight);
}
</style>
