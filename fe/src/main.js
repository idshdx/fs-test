import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import 'vue-octicon/icons'
import Octicon from 'vue-octicon/components/Octicon.vue'
import ApiService from "./common/api.service";
import ErrorFilter from "./common/error.filter";

Vue.component('octicon', Octicon);

ApiService.init();

Vue.filter("error", ErrorFilter);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
