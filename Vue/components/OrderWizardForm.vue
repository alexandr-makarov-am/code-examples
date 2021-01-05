<script>
   import LeafletMap from "./LeafletMap";
   import AddressInput from "./AddressInput";
   import ShipmentForm from "./ShipmentForm";
   import axios from "axios";
   import $ from 'jquery';
   import FormInput from "./FormInput";
   import ContactForm from "./ContactForm";
   export default {
      components: {
         ContactForm,
         FormInput,
         ShipmentForm,
         AddressInput,
         LeafletMap
      },
      props: {
         entry: String
      },
      methods: {
         addPoint(e) {
            this.data.route.intermediates.push({})
         },
         removePoint(i) {
            this.data.route.intermediates.splice(i, 1);
         },
         getFormData() {
            this.errors = {};
            let req;
            if (this.entry) {
               req = axios.post('/account/order/'+this.data.id+'/edit', this.data);
            }else{
               req = axios.put('/account/order/create', this.data);
            }
            req
               .then((response) => {
                  alert(response.data)
               })
               .catch(({response}) => {
                  $(".c-body").animate({ scrollTop: 0 }, 300);
                  this.errors = response.data;
               });
         }
      },
      data() {
         let data = {};
         if (this.entry) {
            const entryData = JSON.parse(this.entry);
            data = {
               data: {
                  route: {
                     from: {
                        ... entryData.start_point
                     },
                     intermediates: [],
                     to: {
                        ... entryData.finish_point
                     },
                  },
                  addresser: {},
                  recipient: {},
                  ... entryData
               },
               errors: {},
            };
         }else{
            data = {
               data: {
                  route: {
                     from: {},
                     intermediates: [],
                     to: {},
                  },
                  addresser: {},
                  recipient: {},
               },
               errors: {},
            }
         }
         return data;
      }
   }
</script>
<template>
   <div>
      <div class="alert alert-warning" role="alert" v-show="Object.keys(errors).length > 0">
         <i class="fas fa-exclamation-triangle"></i>
         Форма заполнена некорректно. Проверьте правильность введенных данных.
      </div>
      <div class="fieldset">
         <label>Маршрут</label>
         <div class="row">
            <div class="col-6">
               <div class="form-group">
                  <label>Откуда забирать?</label>
                  <address-input
                     v-model="data.route.from"
                     v-bind:errors="errors"
                     name="route[from]"
                  />
               </div>
               <div class="form-group">
                  <label>Куда везти?</label>
                  <address-input
                     v-model="data.route.to"
                     v-bind:errors="errors"
                     name="route[to]"
                  />
               </div>
            </div>
            <div class="col-6">
               <leaflet-map
                  :markers="JSON.stringify([data.route.from, data.route.to])"
                  :geometry="data.geometry"
               />
            </div>
         </div>
      </div>
      <br/>
      <div class="row">
         <div class="col-6">
            <div class="fieldset">
               <label>Отправитель</label>
               <contact-form
                  v-model="data.addresser"
                  v-bind:errors="errors"
                  name="addresser"
               />
            </div>
         </div>
         <div class="col-6">
            <div class="fieldset">
               <label>Получатель</label>
               <contact-form
                  v-model="data.recipient"
                  v-bind:errors="errors"
                  name="recipient"
               />
            </div>
         </div>
      </div>
      <br/>
      <div class="row">
         <div class="col">
            <div class="fieldset">
               <label>Груз</label>
               <shipment-form
                  v-model="data.shipment"
                  v-bind:errors="errors"
                  name="shipment"
               />
            </div>
         </div>
      </div>
      <br/>
      <button class="btn btn-primary" v-on:click="getFormData">Сохранить</button>
   </div>
</template>