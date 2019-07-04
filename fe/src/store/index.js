import Vue from "vue";
import Vuex from "vuex";

import client from "./client.module";
import provider from "./provider.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        client,
        provider
    }
});
