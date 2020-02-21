import Vue from 'vue';
import App from './App.vue';
import 'vue-datetime/dist/vue-datetime.css';

import { Datetime } from 'vue-datetime';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
Vue.use(Datetime);

Vue.component('datetime', Datetime);

new Vue({
  render: h => h(App),
}).$mount('#app')
