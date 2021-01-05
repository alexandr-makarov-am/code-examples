<template>
    <div class="form-group">
        <label>{{ label }}</label>

        <input type="text"
               v-show="type === 'text'"
               v-bind:value="value"
               v-on:input="$emit('input', $event.target.value)"
               v-bind:class="{'form-control': true, 'is-invalid': errors[name] !== undefined }" />

        <input type="text"
               v-show="type === 'phone'"
               v-bind:value="value"
               v-on:input="$emit('input', $event.target.value)"
               v-bind:class="{'form-control': true, 'is-invalid': errors[name] !== undefined }"
               v-mask-phone
        />
        <div class="invalid-feedback"
             v-show="errors[name]">
            {{ errors[name] }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormInput",
        props: ['value', 'label', 'name', 'errors', 'type'],
    }
</script>

<style scoped>

</style>