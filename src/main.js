import Vue from 'vue';
import coolvueautosearch from './coolvueautosearch.vue';

new Vue({
    el: 'body',

    components: { coolvueautosearch },

    data: {
        states : [
            { value: 'mh', text: 'Maharashtra'},
            { value: 'ka', text: 'Karnataka'},
            { value: 'ga', text: 'Goa'},
            { value: 'tn', text: 'Tamil Nadu'}
        ],
        selectedstate: '',
        selectedstatevalue: '' // variable which will catch value sent by child component through emitters in setstatecode function
    }

});
