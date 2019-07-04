import {ProvidersService,} from "@/common/api.service";
import {
    FETCH_PROVIDERS,
    PROVIDER_CREATE,
    PROVIDER_DESTROY,
    PROVIDER_EDIT,
    SET_PROVIDER_TO_UPDATE,
} from "./actions.type";
import {
    PROVIDER_ADD,
    PROVIDER_REMOVE,
    SET_PROVIDER,
    SET_PROVIDERS
} from "./mutations.type";

const initialState = {
    provider: {
        id: "",
        name: ""
    },
    providers: []
};

export const state = {...initialState};

export const actions = {
    async [FETCH_PROVIDERS](context) {
        const {data} = await ProvidersService.getAll()
            .catch(error => {
                throw new Error(error);
            });
        context.commit(SET_PROVIDERS, data.providers);
        return data.providers;
    },
    async [PROVIDER_CREATE](context, payload) {
        const {data} = await ProvidersService.create(payload)
            .catch(error => {
                throw new Error(error);
            });
        context.commit(PROVIDER_ADD, data.provider);
    },
    async [PROVIDER_DESTROY](context, payload) {
        await ProvidersService.destroy(payload.id)
            .catch(error => {
                throw new Error(error);
            });
        context.commit(PROVIDER_REMOVE, payload);
    },
    async [PROVIDER_EDIT](context, payload) {
        await ProvidersService.update(payload.id, payload)
            .catch(error => {
                throw new Error(error);
            });
        context.commit(SET_PROVIDER, payload);
    },
    [SET_PROVIDER_TO_UPDATE](context, provider) {
        context.commit(SET_PROVIDER, provider);
    },
};

export const mutations = {
    [SET_PROVIDERS](state, providers) {
        state.providers = providers;
    },
    [PROVIDER_ADD](state, provider) {
        state.providers = state.providers.concat([provider]);
    },
    [PROVIDER_REMOVE](state, provider) {
        state.providers = state.providers.filter(p => p.id !== provider.id);
    },
    [SET_PROVIDER](state, provider) {
        state.provider = provider;
    },
};

const getters = {
    provider(state) {
        return state.provider;
    },
    providers(state) {
        return state.providers;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
