import Vue from "vue";
import {ClientsService,} from "@/common/api.service";
import {
    CLIENT_DELETE, CLIENT_EDIT_ADD_PROVIDER, CLIENT_EDIT_REMOVE_PROVIDER,
    CLIENT_RESET_STATE,
    CLIENT_SAVE,
    FETCH_CLIENTS,
    SET_CLIENT_TO_UPDATE
} from "./actions.type";
import {
    CLIENT_ADD, CLIENT_PROVIDER_ADD, CLIENT_PROVIDER_REMOVE,
    CLIENT_REMOVE,
    FETCH_END,
    FETCH_START,
    RESET_CLIENT_STATE,
    SET_CLIENT,
} from "./mutations.type";

const initialState = {
    client: {
        id: "",
        name: "",
        email: "",
        phone: "",
        providers: []
    },
    clients: [],
    clientsCount: 0,
    isLoading: true
};

export const state = {...initialState};

export const actions = {
    [FETCH_CLIENTS]({commit}, params) {
        commit(FETCH_START);
        return ClientsService.query(params.filters)
            .then(({data}) => {
                commit(FETCH_END, data);
            })
            .catch(error => {
                throw new Error(error);
            });
    },
    [SET_CLIENT_TO_UPDATE](context, client) {
        context.commit(SET_CLIENT, client);
    },
    [CLIENT_SAVE]({state}) {
        if (state.client.id) {
            return ClientsService.update(state.client.id, state.client)
                .catch(error => {
                    throw new Error(error);
                });
        } else {
            return ClientsService.create(state.client)
                .catch(error => {
                    throw new Error(error);
                });
        }
    },
    async [CLIENT_DELETE](context, payload) {
        await ClientsService.destroy(payload.id);
        context.commit(CLIENT_REMOVE, payload);
    },
    [CLIENT_EDIT_ADD_PROVIDER](context, provider) {
        context.commit(CLIENT_PROVIDER_ADD, provider);
    },
    [CLIENT_EDIT_REMOVE_PROVIDER](context, provider) {
        context.commit(CLIENT_PROVIDER_REMOVE, provider);
    },
    [CLIENT_RESET_STATE]({commit}) {
        commit(RESET_CLIENT_STATE);
    }
};

export const mutations = {
    [FETCH_START](state) {
        state.isLoading = true;
    },
    [FETCH_END](state, {clients, clientsCount}) {
        state.clients = clients;
        state.clientsCount = clientsCount;
        state.isLoading = false;
    },
    [CLIENT_ADD](state, client) {
        state.clients = state.clients.concat([client]);
        state.clientsCount++;
    },
    [CLIENT_REMOVE](state, client) {
        state.clients = state.clients.filter(c => c.id !== client.id);
        state.clientsCount--;
    },
    [CLIENT_PROVIDER_ADD](state, provider) {
        state.client.providers = state.client.providers.concat([provider]);
    },
    [CLIENT_PROVIDER_REMOVE](state, provider) {
        state.client.providers = state.client.providers.filter(p => p.id !== provider.id);
    },
    [SET_CLIENT](state, client) {
        state.client = client;
    },
    [RESET_CLIENT_STATE]() {
        Vue.set(state, 'client', initialState['client']);
    },
};

const getters = {
    client(state) {
        return state.client;
    },
    clients(state) {
        return state.clients;
    },
    clientsCount(state) {
        return state.clientsCount;
    },
    isLoading(state) {
        return state.isLoading;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
