<template>
    <div v-if="showClient">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">{{modalTitle}}</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input class="form-control" v-model="client.name">
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input class="form-control" v-model="client.email">
                                </div>
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input class="form-control" v-model="client.phone">
                                </div>

                                <div class="form-group reset-flex">
                                    <label>Providers</label>
                                    <div class="col-md-8">
                                        <input class="form-control" v-model="newProviderName">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="provider of providers" :provider="provider">
                                                <input type="checkbox" :checked="clientHasProvider(provider)"
                                                       @change="addOrRemoveProvider(provider)">
                                                <span>{{provider.name}}</span>

                                                <span>
                                            <a @click="editProvider(provider)">
                                                <octicon name="pencil" scale="1"></octicon>
                                            </a>
                                            <a @click="deleteProvider(provider)">
                                                <octicon name="trashcan" scale="1"></octicon>
                                            </a>
                                        </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <span class="col-md-4">
                                        <button class="btn btn-light" @click="addProvider()">Add Provider</button>
                                    </span>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-danger" @click="deleteClient()">Delete client</button>
                                <span>
                                    <button class="btn btn-light" @click="hideClient">Cancel</button>
                                    <button class="btn btn-light" @click="saveClient()">Save Client</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <VProvider :show-provider="showProvider" :close-provider="closeProviderRequest"></VProvider>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";
    import VProvider from "./VProvider";
    import {
        CLIENT_DELETE,
        CLIENT_EDIT_ADD_PROVIDER,
        CLIENT_EDIT_REMOVE_PROVIDER,
        CLIENT_SAVE,
        FETCH_PROVIDERS,
        PROVIDER_CREATE,
        PROVIDER_DESTROY,
        SET_PROVIDER_TO_UPDATE
    } from "../store/actions.type";

    export default {
        name: "VModal",
        components: {
            VProvider
        },
        props: {
            showClient: {
                type: Boolean,
                required: true
            },
            modalTitle: {
                type: String,
                required: true
            },
            closeClient: {},
        },
        data() {
            return {
                currentPage: 1,
                selectedClient: {},
                showProvider: false,
                newProviderName: ""
            };
        },
        computed: {
            ...mapGetters(["providers", "client"]),
        },
        mounted() {
            this.fetchProviders();
        },
        methods: {
            // send to parent Table component
            hideClient() {
                this.closeClient(false);
            },
            closeProviderRequest(request) {
                this.showProvider = request;
            },
            addOrRemoveProvider(provider) {
                this.clientHasProvider(provider) ?
                    this.$store.dispatch(CLIENT_EDIT_REMOVE_PROVIDER, provider) :
                    this.$store.dispatch(CLIENT_EDIT_ADD_PROVIDER, provider);
            },
            clientHasProvider(provider) {
                return this.client.providers.some(element => element._id === provider._id);
            },
            fetchProviders() {
                this.$store.dispatch(FETCH_PROVIDERS);
            },
            addProvider() {
                if (!this.newProviderName) return;
                this.$store.dispatch(PROVIDER_CREATE, {"name": this.newProviderName})
            },
            editProvider(provider) {
                this.showProvider = true;
                this.$store.dispatch(SET_PROVIDER_TO_UPDATE, provider);
            },
            deleteProvider(provider) {
                this.$store.dispatch(PROVIDER_DESTROY, provider);
            },
            saveClient() {
                this.$store.dispatch(CLIENT_SAVE);
                this.hideClient();
            },
            deleteClient() {
                this.$store.dispatch(CLIENT_DELETE, this.client);
                this.hideClient();
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-footer {
        display: flex;
        justify-content: space-between;
    }

    .modal-footer > span > button {
        margin: 5px;
    }

    .form-group {
        display: flex;
        align-items: center;
    }
    .form-group.reset-flex {
        align-items: unset;
    }
    .form-group.reset-flex label {
        padding-top: 4px;
    }
    .form-group label {
        padding-right: 5px;
    }
    .form-group .input-provider {
        width: 50%;
        margin-right: 10px;
    }
    ul.list-group {
        border: 1px solid rgba(0, 0, 0, 0.125);
    }
    .list-group-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: none;
    }
    .list-group-item span a {
        padding: 5px;
    }

</style>
