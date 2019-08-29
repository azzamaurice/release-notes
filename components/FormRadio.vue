<template>
    <div class="form-radio">
        <label v-for="option in options" :for="option.value">
            <input
                type="radio"
                :id="option.value"
                :value="option.value"
                :checked="option.value === value"
                @change="$emit(`input`, option.value)">
            {{ option.label }}
        </label>
    </div>
</template>

<script>
export default {
    name: 'FormRadio',
    props: {
        value: String,
        options: Array
    }
}
</script>

<style lang="scss" scoped>
.form-radio {
    margin-bottom: 1rem;
}

label {
    line-height: 1.25rem;
    padding: 0.5rem 1rem 0.5rem 0;
}

input {
    vertical-align: 1px;
    margin-right: 0.25rem;
}
</style>
