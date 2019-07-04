<template>
    <div class="col content-wrapper">
        <div class="table-header">
            <h4>Clients</h4>
            <button class="btn btn-light" @click="addClient()">New Client</button>
        </div>
        <div v-if="isLoading" class="article-preview">Loading clients...</div>

        <div v-else>

            <div v-if="clients.length === 0" class="article-preview">
                No clients are here... yet.
            </div>

            <div v-else>
                <table class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Providers</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="client in clients" :client="client" :key="client.id">
                        <td>{{client.name}}</td>
                        <td>{{client.email}}</td>
                        <td>{{client.phone}}</td>

                        <template v-if="client.providers.length">
                            <td>{{client.providers.map(p => p.name).join(', ')}}</td>
                        </template>
                        <template v-else>
                            <td>No providers</td>
                        </template>

                        <td><button class="btn btn-link" @click="editClient(client)">Edit</button></td>

                    </tr>
                    </tbody>
                </table>

                <VClient :show-client="showClient" :close-client="closeClientRequest"></VClient>

                <VPagination :pages="pages" :currentPage.sync="currentPage"/>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import VPagination from "./VPagination";
    import VClient from "./VClient";
    import {FETCH_CLIENTS, SET_CLIENT_TO_UPDATE} from "../store/actions.type";
    import {RESET_CLIENT_STATE} from "../store/mutations.type";
    import {PAGINATION_ITEMS} from "../common/config";

    export default {
        name: "VTable",
        components: {
            VPagination, VClient
        },
        props: {
            itemsPerPage: {
                type: Number,
                required: false,
                default: PAGINATION_ITEMS
            },
        },
        data() {
            return {
                currentPage: 1,
                selectedClient: {},
                showClient: false
            };
        },
        computed: {
            tableConfig() {
                const filters = {
                    offset: (this.currentPage - 1) * this.itemsPerPage,
                    limit: this.itemsPerPage
                };
                return {
                    filters
                };
            },
            pages() {
                if (this.isLoading || this.clientsCount <= this.itemsPerPage) {
                    return [];
                }
                return [
                    ...Array(Math.ceil(this.clientsCount / this.itemsPerPage)).keys()
                ].map(e => e + 1);
            },
            ...mapGetters(["clientsCount", "isLoading", "clients"])
        },
        watch: {
            currentPage(newValue) {
                this.tableConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
                this.fetchClients();
            },
        },
        mounted() {
            this.fetchClients();
        },
        methods: {
            // received from the child Client component
            closeClientRequest(request) {
                this.showClient = request;
            },
            addClient() {
                this.$store.commit(RESET_CLIENT_STATE);
                this.showClient = true;
            },
            editClient(client) {
                this.showClient = true;
                this.$store.dispatch(SET_CLIENT_TO_UPDATE, client);
            },
            fetchClients() {
                this.$store.dispatch(FETCH_CLIENTS, this.tableConfig);
            },
        }
    }
</script>
<style scoped>
    .content-wrapper {
        margin-top: 10%;
    }
    .table-header {
        display: flex;
        justify-content: space-between;
        background-color: lightblue;
        padding: 10px 20px;
    }
    .table-header > h4 {
        color: #007bff;
    }

</style>
