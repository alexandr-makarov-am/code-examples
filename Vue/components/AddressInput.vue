<template>
    <div class="wrapper">
        <div class="form-group">
            <input
                type="text"
                v-bind:class="{'form-control': true, 'is-invalid': errors[name] !== undefined }"
                v-on:keyup="keyUp"
                v-model="address"
            />
            <div class="invalid-feedback"
                 v-show="errors[name]">
                {{ errors[name] }}
            </div>
        </div>
        <div class="c-options" v-show="data.length > 0">
            <div class="list-group list-group-flush">
                <span class="list-group-item"
                      v-for="el in data"
                      v-on:click="selectAddress(el)">
                    {{ el.display_name }}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

    export default {
        name: "AddressInput",
        components: {
            VueBootstrapTypeahead
        },
        props: ['name', 'errors', 'value'],
        methods: {
            async keyUp() {
                const res = await fetch(`http://localhost:8080/search?q=${this.address}&format=json`);
                this.data = await res.json();
            },
            selectAddress(elem) {
                this.address = elem.display_name;
                this.data = [];
                this.$emit('input', elem);
            }
        },
        data() {
            return {
                data: [],
                address: this.value.display_name || ""
            }
        }
    }
</script>
<style scoped>
    .wrapper {
        width: 100%;
    }
    .c-options{
        border: 1px solid #f4f4f4;
        box-shadow: 0 0 6px rgba(0,0,0,.1);
        position: absolute;
        border-radius: 6px;
        overflow: hidden;
        margin-top: 1rem;
    }
    .list-group {
        max-height: 225px;
        overflow: auto;
    }
</style>
