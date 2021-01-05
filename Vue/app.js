import '../css/app.scss';
import 'bootstrap';
import 'popper.js'
import '@coreui/coreui';
import Vue from 'vue'
import $ from 'jquery';
import Inputmask from "inputmask";

import OrderFilter from "./components/OrderWizardForm.vue";
import LeafletMap from "./components/LeafletMap";

Vue.directive('mask-phone', {
    bind(el) {
        Inputmask("+375 99 999 99 99").mask($(el));
    }
});

Vue.directive('mask-meters', {
    bind(el) {
        Inputmask("9.99").mask($(el));
    }
});

Vue.directive('selector', {
    bind(el, binding) {
        el.addEventListener('change', (evt) => {
            const value = evt.target.getAttribute('data-key');
            const id = evt.target.getAttribute('data-id');
            const input = document.getElementById(id);
            let arr = input.value.length > 0 ? input.value.split(',') : [];
            if (evt.target.checked) {
                arr.push(value);
            }else{
                const index = arr.indexOf(value);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
            input.value = arr.join(',');
        });
    }
});

new Vue({
    el: '.c-main',
    components: {
        'order-wizard-form': OrderFilter,
        'leaflet-map': LeafletMap
    }
});