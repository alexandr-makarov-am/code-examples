<template>
    <div class="row">
        <div class="col-4"
             v-for="(item, index) in items"
             v-bind:key="index">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>Описание</label>
                        <textarea
                            :class="{'form-control': true, 'is-invalid': getErrors(index, 'details')}"
                            v-model="items[index].details"
                        ></textarea>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label>Длина</label>
                        <input
                            type="text"
                            :class="{'form-control': true, 'is-invalid': getErrors(index, 'length') }"
                            v-model="items[index].length"
                            v-mask-meters
                        />
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label>Ширина</label>
                        <input
                            type="text"
                            :class="{'form-control': true, 'is-invalid': getErrors(index, 'width')}"
                            v-model="items[index].width"
                            v-mask-meters
                        />
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label>Высота</label>
                        <input
                            type="text"
                            :class="{'form-control': true, 'is-invalid': getErrors(index, 'height')}"
                            v-model="items[index].height"
                            v-mask-meters
                        />
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label>Вес</label>
                        <input
                            type="text"
                            :class="{'form-control': true, 'is-invalid': getErrors(index, 'weight')}"
                            v-model="items[index].weight"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="add-button__wrapper d-flex justify-content-center align-items-center h-100">
                <div class="flex_wrapper">
                    <button class="btn btn-outline-light" v-on:click="addShipment">
                        Добавить позицию
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShipmentForm",
        methods: {
            addShipment() {
                this.items.push({});
            },
            getErrors(index, fieldName = null) {
                const key = `${this.name}[${index}][${fieldName}]`;
                if (this.errors !== undefined) {
                    return  this.errors[this.name] !== undefined || this.errors[key] !== undefined;
                }
                return false;
            }
        },
        props: ['name', 'errors', 'value'],
        data() {
            return {
                items: this.value || [{}]
            }
        },
        watch: {
            items: {
                handler: function (data) {
                    this.$emit('input', data);
                }
            }
        }
    }
</script>

<style scoped>
    .add-button__wrapper {
        min-height: 210px;
        border-radius: 10px;
        background: rgba(220,220,220,.1);
    }
</style>