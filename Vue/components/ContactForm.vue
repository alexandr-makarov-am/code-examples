<template>
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label>Имя</label>
                <input
                    type="text"
                    v-bind:value="value.first_name"
                    v-on:input="handleInput($event, 'first_name')"
                    :class="{'form-control': true, 'is-invalid': getError('first_name') }"
                />
                <div class="invalid-feedback" v-show="getError('first_name')">
                    {{ getError('first_name') }}
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label>Фамилия</label>
                <input
                    type="text"
                    v-bind:value="value.last_name"
                    v-on:input="handleInput($event, 'last_name')"
                    :class="{'form-control': true, 'is-invalid': getError('last_name') }"
                />
                <div class="invalid-feedback" v-show="getError('last_name')">
                    {{ getError('last_name') }}
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <div class="wrapper">
                    <label>Телефон</label>
                    <input
                        type="text"
                        autofill="off"
                        autocomplete="false"
                        v-bind:value="value.phone"
                        v-on:input="onSearchPhone($event, 'phone')"
                        :class="{'form-control': true, 'is-invalid': getError('phone') }"
                        v-mask-phone
                    />
                    <div class="invalid-feedback" v-show="getError('last_name')">
                        {{ getError('last_name') }}
                    </div>
                    <div class="c-options" v-show="search.length > 0">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item"
                                  v-for="el in search"
                                  v-on:click="onSelectContact(el)">
                                <span class="phone">{{ el.phone }}</span>
                                <span class="contact-name">
                                     {{ el.firstName }} {{ el.lastName }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "ContactForm",
        props: {
            value: Object,
            errors: Object,
            name: String
        },
        methods: {
            onSelectContact(contact) {
                this.data = {
                    ... this.data,
                    phone: contact.phone,
                    first_name: contact.firstName,
                    last_name: contact.lastName
                };
                this.search = [];
                this.$emit('input', this.data);
            },
            onSearchPhone(e, prop) {
                this.handleInput(e, prop);
                const phone = e.target.value;
                if (!phone.match(/_/gi)) {
                    axios
                        .post('/account/contact/search', {phone})
                        .then((response) => {
                            this.search = response.data;
                        });
                    ;
                }
            },
            handleInput(e, prop) {
                this.data = {
                    ... this.data,
                    [prop]: e.target.value
                };
                this.$emit('input', this.data);
            },
            getError(prop) {
                return this.errors !== undefined && this.errors[`${this.name}[${prop}]`]
            }
        },
        data() {
            return {
                search: [],
                data: this.value ? this.value : {},
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        width: 100%;
        position: relative;
    }
    .c-options{
        border: 1px solid #f4f4f4;
        box-shadow: 0 0 6px rgba(0,0,0,.1);
        position: absolute;
        border-radius: 6px;
        overflow: hidden;
        margin-top: 1rem;
        width: 100%;
        z-index: 100;
    }
    .phone {
        font-weight: bold;
        display: block;
    }
    .contact-name {
        font-size: .75rem;
    }
    .list-group {
        max-height: 225px;
        overflow: auto;
    }
</style>