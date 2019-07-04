import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {API_URL} from "@/common/config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },
    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(` ApiService ${error}`);
        });
    },
    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(` ApiService ${error}`);
        });
    },
    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },
    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },
    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(` ApiService ${error}`);
        });
    }
};

export default ApiService;

export const ClientsService = {
    query(params) {
        return ApiService.query("client", {
            params: params
        });
    },
    get(slug) {
        return ApiService.get("client", slug);
    },
    create(params) {
        return ApiService.post("client", {client: params});
    },
    update(slug, params) {
        return ApiService.update("client", slug, {client: params});
    },
    destroy(slug) {
        return ApiService.delete(`client/${slug}`);
    }
};


export const ProvidersService = {
    getAll() {
        return ApiService.get("provider");
    },
    get(slug) {
        return ApiService.get("provider", slug);
    },
    create(params) {
        return ApiService.post("provider", {provider: params});
    },
    update(slug, params) {
        return ApiService.update("provider", slug, {provider: params});
    },
    destroy(slug) {
        return ApiService.delete(`provider/${slug}`);
    }
};
